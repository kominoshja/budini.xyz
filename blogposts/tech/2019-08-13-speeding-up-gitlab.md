---
title:  "Speeding up GitLab CI"
subtitle: "Saving time"
date: 2019-08-13 00:00:00
featured_image: '/images/Sidebar/Tech/gitlab-ci.jpg'
layout: post
---

Over the past few months, over at Collective68 and on my own projects, I have used GitLab's CI

It is an amazing tool that can do everything from publishing your Jekyll page, to building Android apps and Linux packages

I noticed that my builds were taking too long (over 2 minutes for my website to be published) and I thought I'd post about how I sped up the build process

It consists of building a custom Docker image that has the tools preinstalled. By using the default image, I'd have to install the same packages over and over, even for the smallest changes

To create a custom docker image, you need to have a [Docker Hub](https://hub.docker.com/) account. After you have created your Docker Hub account, you can now proceed to the creation process.

You start by creating a container where you install everything you need, and then you publish it as an image to the Hub

To create the container and drop into the interactive session you type the following into your machine

```bash
docker run --name [Name of the image you'll create] -it [base image] /bin/sh
```

Now you are inside a container. Go ahead and install everyhing you need.
After you've set everything up drop out of the session by using CTRL+D

Now let's get the container ID

```bash
docker ps -a -f name=[Name of the image you'll create]
```

It will look something like this `3165617f74a2`

Time to publish it!!

```bash
docker commit -m "[Commit message]" -a "[Your Name]" [3165617f74a2] [Docker Hub username]/[Name of the image you'll create]:v[Version Number]
```

And now the final command is

```bash
docker push [Docker Hub username]/[Name of the image you'll create]:v[Version Number]
```

Congrats! You just published a Docker image! Now it's time to update your GitLab CI config.

Head over to `.gitlab-ci.yml` and add/change

```yaml
image:
```
 to

 ```yaml
 image: [Docker Hub username]/[Name of the image you'll create]:v[Version Number]
 ```

In my case, many of my projects went from 2 minutes to 30 seconds or less.
