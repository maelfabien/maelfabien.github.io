---
layout: archive
permalink: /blog/
author_profile: false
title: "Topics"
sidebar:
    nav: sidebar-sample
header :
    image: "https://maelfabien.github.io/assets/images/wolf.jpg"
layouts_gallery:
  - url: https://maelfabien.github.io/ml/
    image_path: /assets/images/ml_short.png
  - url: https://maelfabien.github.io/dl/
    image_path: /assets/images/dl_short.png
  - url: https://maelfabien.github.io/bgd/
    image_path: /assets/images/de_short.png
  - url: https://maelfabien.github.io/ent/
    image_path: /assets/images/ent_short.png
---

In the following section, you have a direct access to the articles I'm writing by category :

{% include gallery id="layouts_gallery" class="full" layout="half"%}

# Join the Newsletter

I recently started a newsletter in which I gather the best articles I wrote on a topic, Github repositories, projects, papers and more ! If you want to stay in the loop, I'll try to send 1 to 2 emails per month :)

<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">

<div id="mc_embed_signup" style="background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;">
<form action="https://gmail.us3.list-manage.com/subscribe/post?u=c76a8e2ec2bd989affb9a074f&amp;id=4646542adb" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
  <label for="mce-EMAIL">Join the newsletter </label>
  <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_c76a8e2ec2bd989affb9a074f_4646542adb" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<br>
<br>
<!--End mc_embed_signup-->

# All articles

<ul class="taxonomy__index">
  {% assign postsInYear = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
  {% for year in postsInYear %}
    <li>
      <a href="#{{ year.name }}">
        <strong>{{ year.name }}</strong> <span class="taxonomy__count">{{ year.items | size }}</span>
      </a>
    </li>
  {% endfor %}
</ul>

{% assign postsByYear = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
{% for year in postsByYear %}
  <section id="{{ year.name }}" class="taxonomy__section">
    <h2 class="archive__subtitle">{{ year.name }}</h2>
    <div class="entries-{{ page.entries_layout | default: 'list' }}">
      {% for post in year.items %}
        {% include archive-single.html type=page.entries_layout %}
      {% endfor %}
    </div>
    <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  </section>
{% endfor %}
