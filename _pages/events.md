---
layout: default
title: Events
subtitle: Here's what I've been attending lately.
description: Here's what I've been attending lately.
featured_image: /images/Sidebar/events.jpg
---


<section class="blog single">

	<div class="wrap">

		{% for post in site.categories.events %}

		<article class="blog-post">

			<div class="blog-post__header">
				<h2 class="blog-post__title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
			</div>

			{% if post.featured_image %}
			<a href="{{ post.url }}" class="blog-post__image" style="background-image: url({{ post.featured_image  }}?{{site.time | date: '%s%N'}});"></a>
			{% endif %}

			<div class="blog-post__content">
				<p>{{ post.excerpt }}</p>
				<p class="blog-post__subtitle">Written on {{ post.date | date_to_long_string }}</p>
				<p><a href="{{ post.url }}" class="button">Dive in</a>
			</div>

		</article>

		{% endfor %}

	</div>

</section>
