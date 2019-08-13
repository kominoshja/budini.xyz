---
title:  "Setting up GitLab Pages"
subtitle: "Because GitLab rocks"
date: "2019-08-13 01:00:00"
featured_image: "/images/Sidebar/Tech/gitlab-pages.jpg"
layout: post
---

Now it's no secret that I love GitLab. One of the reasons I love it so much is the level of control that you have over how GitLab pages are built. You can pretty much do everything you can thing of

GitLab Pages is a daemon that serves your compiled code (according to the instructions of .gitlab-ci.yml) over the url that you have configured through http/https

Setting up GitLab Pages is not really that hard, but the documentation is a bit outdated.

My preferred approach to this is to have GitLab Runner (The CI & CD compiling tool) and GitLab Pages daemon in one seperate VPS. Since I already have GitLab Runner in a seperate server (to better manage the resources), why not put the Pages daemon there aswell?

For the sake of the reader, I'll refer with server1 to the server that is running GitLab and server2 to the server that is running GitLab Pages. I'm also assuming that you have installed everything through the omnibus method. And one more thing, you need to have 2 IPs on server2 (There might be a better approach than my method, but I haven't played that much with it)

Make sure you configure **server1**'s gitlab.rb(/etc/gitlab/gitlab.rb) like this:

```ruby
pages_nginx['enable'] = false
pages_external_url "[URL where gitlab pages will be served from]"
gitlab_rails['pages_path'] = "[ Directory where the compiled code will be stored ]"
pages_nginx['ssl_certificate'] = "[ Location to Wildcard SSL certificate ]"
pages_nginx['ssl_certificate_key'] = "[ Location to Wildcard SSL private key ]"
gitlab_pages['external_http'] = ['[second ipv4 of server2]:80', '[second ipv6 of server2]:80']
gitlab_pages['external_https'] = ['[second ipv4 of server2]:443', '[second ipv6 of server2]:443']
```

Let's take this one by one, shall we?
```ruby
pages_nginx['enable'] = false
```
This command dictates that the Nginx daemon of GitLab Pages (which is different from GitLab's Nginx daemon)

```ruby
pages_external_url "[URL where gitlab pages will be served from]"
```
Each GitLab Pages enabled project runs from this url. If the url is aaa.dev, the url of the project would be [gitlab username].aaa.dev/[repo name]
Please make sure you set either http:// or https:// on this setting aswell (If you want your pages to have ssl, please add https://)

```ruby
pages_nginx['ssl_certificate'] = "[ Location to Wildcard SSL certificate ]"
pages_nginx['ssl_certificate_key'] = "[ Location to Wildcard SSL private key ]"
gitlab_pages['external_http'] = ['[second ipv4 of server2]:80', '[second ipv6 of server2]:80']
gitlab_pages['external_https'] = ['[second ipv4 of server2]:443', '[second ipv6 of server2]:443']
```
These settings simply tell GitLab where to find the SSL wildcard certificate. Yes, you need a wildcard certificate for the url you specified before.
They also tell GitLab from what IP they should serve the pages

<hr />
Let's pause for a second.
We tell GitLab to disable the daemon, and then we tell it where the SSL cert is, AND from what ip to serve from aswell?! How does that make sense?


Well, it's not what really is happening. You see, we have disabled the pages daemon from running from this server, but if we don't specify the SSL certificate settings and the secodary ip on **server1**, GitLab will think that it doesn't have the ability to serve on those circumstances. Yes it is hacky; yes it is ugly; yes, it works

After doing all of this simply run
```bash
gitlab-ctl reconfigure
```

Hold on, you're nearly up and running.

First ssh into **server2**

Once you're there, generate a passwordless ssh key
```bash
ssh-keygen
```

Now copy the public key content from **server2** to the `authorized-keys` on **server1**

To do that run this on **server2**
```bash
cat [location of your ssh key]/id_rsa.pub
```
copy the output and paste it in **server1**'s authorized_keys

Now you're all done on the setup of **server1**

Switch over to **server2**

First, we'll configure the server to copy the contents from **server1**'s pages_path specified earlier in gitlab.rb

There are better ways to do this, such as setting up NFS, but I chose rsync

Create a script wherever you want, I chose /opt for this

In there, paste the following content:

```bash
while true;
do
rsync -Pav -e "ssh -i /root/.ssh/id_rsa" root@[server1]:/mnt/gitlab_pages/ /var/opt/gitlab/gitlab-rails/shared/pages/ --delete
chown -R git:git /var/opt/gitlab/gitlab-rails/shared/pages/*;
sleep 5;
done
```
And don't forget to run this everytime you reboot your server. I use cron for most of these stuff. Since I also wanted to monitor the status, I set up cron to send the script executement in a tmux session

Run this to edit crontab:

```bash
crontab -e
```
Then paste this in the bottom section

```
@reboot /usr/bin/tmux new-session -d -s rsync 'bash /opt/rsync.sh'
```

Okay, we're nearly there, I promise
You need to install GitLab on **server2**. After installing it, edit the contents of gitlab.rb so it looks like this:

```ruby
external_url 'http://[first ipv4 of server2]' #Can't delete

#PAGES SETUP
gitlab_pages['enable'] = true #Enables the daemon
pages_external_url "[Same URL as you configured on **server1**]" #Sets the base url

nginx['listen_addresses'] = ['[first ipv4 of server2]'] #This is the primary IP

pages_nginx['enable'] = false #Disables nginx, which allows secondary ip to not be grabbed by nginx while daemon is using it

pages_nginx['ssl_certificate'] = "[ Location to Wildcard SSL certificate ]"
pages_nginx['ssl_certificate_key'] = "[ Location to Wildcard SSL private key ]" #Wildcard cert

gitlab_pages['external_http'] = ['[second ipv4 of server2]:80', '[second ipv6 of server2]:80']
gitlab_pages['external_https'] = ['[second ipv4 of server2]:443', '[second ipv6 of server2]:443'] #2nd ip for custom domains

#ADDITIONAL PAGES CONFIGS
gitlab_pages['log_verbose'] = true
gitlab_pages['listen_proxy'] = nil

#DISABLE EVERYTHING ELSE
postgresql['enable'] = false
redis['enable'] = false
prometheus['enable'] = false
unicorn['enable'] = false
sidekiq['enable'] = false
gitlab_workhorse['enable'] = false
gitaly['enable'] = false
alertmanager['enable'] = false
node_exporter['enable'] = false
gitlab_rails['auto_migrate'] = false
nginx['enable'] = false
```

Time to set this love. Run this command on **server2**

```bash
gitlab-ctl reconfigure
```

After this, you must be live. If you're not and need my help, feel free to contact me!
