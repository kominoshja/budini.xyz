---
title:  "The effect of Discourse"
subtitle: "Discourse + Open Labs Hackerspace = Awesomeness"
date: 2018-09-04 00:00:00
featured_image: '/images/Sidebar/Tech/discourse.jpg'
---

On 5th of March 2016, I installed Discourse on [forum.openlabs.cc](forum.openlabs.cc)

I love this software so much, I decided to write a blog post on how awesome it is and how much it helped Open Labs Hackerspace
## History
Open Labs Hackerspace is non for profit, and when we were struggling for sponsorships, we used to use Google Groups as a mailing list. 
We didn't like this, but back then we had no option.

Then, an awesome company named DigitalOcean sponsored Open Labs Hackerspace.
If you know me, you know what that means. 
<iframe src="https://giphy.com/embed/128kpIwiArqvUk" width="480" height="286" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
The most important part of infra we needed, was a mailing list which was open source, and user friendly.

This is where Discourse came into play.
It's a beautiful software allowing users to communicate with each-other asynchronously.

> "Discourse is a from-scratch reboot, an attempt to reimagine what a modern Internet discussion forum should be today, in a world of ubiquitous smartphones, tablets, Facebook, and Twitter."

I can go on for months telling all the good sides that convinced us to use it, but it's better to show you all Discourse [features](https://www.discourse.org/features)

It runs pretty well on 1GB, although Open Labs Hackerspace needs 4GB of RAM

Setting it up was super easy. DigitalOcean has the option to create a droplet/server with Discourse preinstalled, so installing it took 5 minutes.
In order to send emails, we decided to use SparkPost (they're a free SMTP service which allows us to send as many emails as our users request)

The only complaint that I have, is that the software is updated so much, it's hard to keep up with new versions!
## How active is our forum?
Well, from the start, we have had
* **214 users**
* **695 topics**
* **5500 posts**

We consider that insane!

## Cool tricks 
Discourse is both a forum, and a mailing list. And it does a great job of it.

We have a [Telegram bot](https://github.com/davidtaylorhq/discourse-telegram-notifications), which when linked with your account, it sends your Discourse notifications to Telegram
By using this [plugin](https://github.com/fuerst/embed-etherpad-lite) we can embed our etherpad.
We disabled comments on [openlabs.cc](openlabs.cc), and started using [wp-discourse](https://github.com/discourse/wp-discourse) to post our blog posts on the forum, and use replies as comments.
The badges offer a nice way for users to "compete" which eachother on a friendly way
## Closing Thoughts 
Discourse has definitively helped Open Labs Hackerspace better communicate, organize, and share.
It is now part of our core Infra, and it is my favorite software!
I would highly recommend it to any open source community which values beautiful, feature rich & secure mailing lists

