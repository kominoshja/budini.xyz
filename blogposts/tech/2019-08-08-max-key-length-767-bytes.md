---
title:  "ERROR: Specified key was too long; max key length is 767 bytes"
subtitle: "MySQL makes me pull my hairs out of my head"
date: "2019-08-08 00:00:00"
featured_image: "/images/Sidebar/Tech/database.jpg"
layout: post
---

So the @infra team of Open Labs Hackerspace is migrating servers. While migrating I had to deal with one of the weirdest errors I had seen.

We're pretty much stuck with MySQL on our servers due to platform dependencies, and I have forgotten nearly 95% of the reasons why I had migrated to PgSQL (TL;DR UTF8MB4)

Anyway... while migrating when we tried to import an exported database, we'd get `ERROR 1071 (42000) at line 152: Specified key was too long; max key length is 767 bytes`.

 "What the hell is this?" we kept asking ourselves. Well.. It's another of MySQL's weird problems. It's called a [stated prefix limitation](https://dev.mysql.com/doc/refman/5.1/en/create-index.html)

 I found the solution on this [nextcloud post](https://help.nextcloud.com/t/solved-syntax-error-or-access-violation-1071-specified-key-was-too-long-max-key-length-is-767-bytes/34740?u=moonlies)

Just run
 ```sql
use DATABASE_NAME;
set global innodb_large_prefix=on;
set global innodb_file_format=Barracuda;
 ```

 Whatever MySQL.. whatever
