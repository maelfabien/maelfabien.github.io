---
layout: archive
permalink: /blog/
author_profile: false
title: "Join the newsletter"
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

I recently started a newsletter in which I gather some cool articles I wrote on a topic, interesting Github repositories, projects, papers and more ! If you want to stay in the loop, I'll try to send 1 to 2 emails per month :)

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

# By topic 

{% include gallery id="layouts_gallery" class="full" layout="half"%}

<!--End mc_embed_signup-->

# All articles

{% assign categories_max = 0 %}
{% for category in site.categories %}
  {% if category[1].size > categories_max %}
    {% assign categories_max = category[1].size %}
  {% endif %}
{% endfor %}

<ul class="taxonomy__index">
  {% for i in (1..categories_max) reversed %}
    {% for category in site.categories %}
      {% if category[1].size == i %}
        <li>
          <a href="#{{ category[0] | slugify }}">
            <strong>{{ category[0] }}</strong> <span class="taxonomy__count">{{ i }}</span>
          </a>
        </li>
      {% endif %}
    {% endfor %}
  {% endfor %}
</ul>

{% for i in (1..categories_max) reversed %}
  {% for category in site.categories %}
    {% if category[1].size == i %}
      {{ category[0] }}
        {% for post in category.last %}
          {% include archive-single.html type=page.entries_layout %}
        {% endfor %}
    {% endif %}
  {% endfor %}
{% endfor %}

<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"c76a8e2ec2bd989affb9a074f","lid":"4646542adb","uniqueMethods":true}) })</script>