---
title:  "The case against my router."
subtitle: "ALBtelecom's HG531 v1"
date: 2018-08-26 00:00:00
featured_image: '/images/Sidebar/Tech/router.jpg'
---

Before you read the story, let's cover some bases on understanding why this matters.

------

 - Router:

```
A router is a networking device that forwards data packets between computer networks. - Wikipedia
```

This means your router is like the traffic police, dictating the flow of the internet in your house.

------

 - DNS - Domain Name System:

```
 The Domain Name System is a hierarchical decentralized naming system for computers connected to the Internet. - Wikipedia
```

DNS serves as the roads, deciding where the cars go. Whenever you visit my website for example, you actually visit  `206.189.248.153`. But you won't remember that, will you? (Even I don't)

------

Now, let's dig into the story.

So recently I installed [Pi-hole](https://pi-hole.net/), and was too lazy to manually edit the DNS record in all of my devices (I have a lot of devices in my network ._.)
That means that I needed to edit the DNS record directly from my router.
Easy peasy...Right? 
My ISP is [ALBtelecom](https://www.albtelecom.al), and while they do have a good service, their routers aren't the best out there. I have the [HG531 V1](https://consumer.huawei.com/eg-en/support/smart-home/hg531-v1-10/). This guy is good enough for my devices, so I like it
Now, it's no secret that every ISP provides their DNS, and I get that.
The problem arose when I wanted to change it.
ALBtelecom told me my router credentials were `admin`, `U5er!us3r!`.
So I log in and I see only these panels.

<div class="gallery" data-columns="2">
	<img src="/images/Tech/router/admin1.png">
	<img src="/images/Tech/router/admin2.png">
</div>

"Where's all the other options?" - I wondered
<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Look&#39;s like ALBtelecom (ISP) blocks a lot of features on their firmware and stops users from replacing that firmware. Let&#39;s see what we can do, eh?</p>&mdash; borisbudini (@kominoshja) <a href="https://twitter.com/kominoshja/status/1028427917792096257?ref_src=twsrc%5Etfw">August 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>
So i got angry and decided to get on the case.

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

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Just got the highest privilege possible on ALBtelecom&#39;s HG531 V1. Blog post coming soon!</p>&mdash; borisbudini (@kominoshja) <a href="https://twitter.com/kominoshja/status/1028949947251609600?ref_src=twsrc%5Etfw">August 13, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

In case you just want to get the account details, here they are: `root`, `@csC0nf1g.`
In case you want to know why I made such a big deal is out of this, keep reading.

By locking our access in our routers, ALBtelecom is taking away a part of our freedom!
Yes, really.

When you can't change the DNS records, ALBtelecom WILL KNOW WHAT SITE YOU VISIT, even if you're using VPN. [Unless you took protection against DNS leak, or changed the DNS settings for your device(Yeah, sure, you can change the DNS records on every device you have, or you can do it the sane way)]
The other problem I have with this  is that, I payed for the router. I bought it! Therefore, you have no right to lock me access.

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">So here&#39;s the actual case on ALBtelecom&#39;s HG531 v1 router. They don&#39;t give you an admin level access router. They give you a simple user named `admin` (misleading) which allows you only to set wifi name &amp; password, and PPPoE login settings (1)</p>&mdash; borisbudini (@kominoshja) <a href="https://twitter.com/kominoshja/status/1029015232801398784?ref_src=twsrc%5Etfw">August 13, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>


The HG531 V1 router is actually very nice, for 15-20 devices connected to it, and it rarely has failed for me. However there's no info regarding it online. 
So, [here](https://github.com/kominoshja/budini.xyz/tree/master/assets/hg531-fimwares), you'll find all the firmware I was able to get for it. Use them wisely! :)

