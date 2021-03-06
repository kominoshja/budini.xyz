---
title:  "The case against my router"
subtitle: "ALBtelecom's HG531 v1"
date: 2018-08-26 00:00:00
featured_image: '/images/Sidebar/Tech/router.jpg'
layout: post
categories: [tech]
---

So recently I installed Pi-hole, and was too lazy to manually edit the DNS record in all of my devices (I have a lot of devices in my network)

That means that I needed to edit the DNS record directly from my router. Easy peasy...Right?

My ISP is [ALBtelecom](https://www.albtelecom.al), and while they do have a good service, their routers aren't the best out there. I have the [HG531 V1](https://consumer.huawei.com/eg-en/support/smart-home/hg531-v1-10/). This guy is good enough for my devices, so I like it.
Now, it's no secret that every ISP provides their DNS, and I get that.
The problem arose when I wanted to change it.

ALBtelecom told me my router credentials were
<br />`admin`<br />`U5er!us3r!`<br />
So I log in and I see only these panels.

<div class="gallery" data-columns="2">
	<img src="/images/Tech/router/admin1.png">
	<img src="/images/Tech/router/admin2.png">
</div>

"Where's all the other options?" - I wondered

So I got angry and decided to get on the case.


I tried many things, from trying to get access from any port, to all the possible hardware button press combos, opening the router itself, but nothing worked. So I decided to get the firmware file online, unpack it, and work backwards from there to see if they changed the firmware upgrade URL (I initially thought they wrote a custom firmware). That didn't work either.

My only option was to get access to the router through the serial connector.

But then, I saw this one search result, mentioning ALBtelecom and HG531 in the same sentence.
It was a third party website, selling the firmware for around 3$. I am extremely against paywalls, but between buying this or waiting a month for the serial connectors to arrive, i had no choice.

And so I payed.

Reading the files in there, I saw something mentioning a `root` account.  Apparently, ALBtelecom didn't flash their own firmware, they just created a basic-access user named `admin`. Geez.

So I logged in, and there it was. **Full access to the router that I payed for, and was limited to use 1/5th of it.**

<div class="gallery" data-columns="2">
	<img src="/images/Tech/router/root1.png">
	<img src="/images/Tech/router/root2.png">
</div>

In case you just want to get the account details, here they are:
<br />`root`<br />`@csC0nf1g.`<br />
In case you want to know why I made such a big deal is out of this, keep reading.

By locking our access in our routers, ALBtelecom is taking away a part of our freedom!
Yes, really.

When you can't change the DNS records, ALBtelecom will know what site you're visiting, even if you're using VPN. [Unless you took protection against DNS leak, or changed the DNS settings for your device (Yeah, sure, you can change the DNS records on every device you have, or you can do it the sane way)]

The HG531 V1 router is actually very nice, for 15-20 devices connected to it, and it rarely has failed for me. However there's no info regarding it online.

So, I would recommend you use something else, but you know what's best for you
