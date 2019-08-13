---
title:  "Automation between your server and GitHub"
subtitle: "When you're to busy to git pull"
date: "2018-08-27 00:00:00"
featured_image: "/images/Sidebar/Tech/server.jpg"
layout: post
categories: [tech]
---

A few months ago, I was asked to find a way of automating one of Ura's production servers, to automatically get the code from GitHub, compile it, and then serve it. We were using Jekyll, so it was pretty easy to be solved.. except for the automatic pull. I ended up using a php script + webhooks.

So, first things firsts

### What is a webhook?
A webhook is a pretty cool method of communication between servers.
Think of it this way.
We have server A and server B. Whenever server A finishes a task, server B needs to be informed. This is where webhooks come in.
After the task in server A is completed, it sends a webhook to server B.
Webhook is kind of like a message!

### What programming language did you use?

I ended up using PHP.

## So, how did I do it?

I installed Apache2 & PHP7.2
```bash
apt install -y apache2 php7.0
```

First, i ran `git clone [URL]` on `/var/www` which created `/var/www/repo`

Then i created `/var/www/repo/script` and under that directory, a file named `[name].php`. There, i pasted the content of [this script](https://gist.githubusercontent.com/oodavid/1809044/raw/ba8d01c411c40c2d204aa0eda93f72bea757b5d3/deploy.php) written by [oodavid](https://github.com/oodavid)

I set the permission to Apache user (-R means recursive)
```bash
chown -R www-data:www-data /var/www/repo
```

I then executed this command from inside `/var/www/repo`
```bash
bundle exec jekyll serve --watch
```
on a `tmux` window. This allows the website to be updated everytime there's a file change
My apache site config file looks like this
```
<VirtualHost *:80>
        ServerName ..................

        ProxyPass /script !
        Alias "/script" "/var/www/..../script/deploy.php"

        ProxyPass / http://0.0.0.0:4000/
        ProxyPassReverse / http://0.0.0.0:4000/

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        <Directory "/var/www/....">
        AllowOverride All
        </Directory>
</VirtualHost>
```
So on the appropriate repo on GitHub, i set a `JSON` webhook `On push events`, with the url `[URL]/script`
## Okay, but why?
This kind of automation allows us to do many fun stuff.
Back in March, it was impossible to have custom domains on GitHub pages WITH SSL. Our develpers didn't have access to servers, so this helped us to have https://ura.design, https://identihub.co, and allowed me to have https://budini.xyz.

But this isn't it's only use case.
On Identihub, we have 4 main facing Identihub instances.
There's [Demo](https://demo.identihub.co), which is our showcase, [Master](https://master.identihub.co), [Dev](https://dev.identihub.co), and [Test](https://test.identihub.co). The last three are automatically synced with this very same method! So, you can achieve realtime deployment with little to no hassle.
