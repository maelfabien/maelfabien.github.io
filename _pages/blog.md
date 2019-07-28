---
layout: archive
permalink: /blog/
author_profile: false
title: "By Topic"
sidebar:
    nav: sidebar-blog
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

{% include gallery id="layouts_gallery" class="full" layout="half"%}

<!--End mc_embed_signup-->

Want to stay in the loop ? Sign in to my newsletter and receive updates every month on my latest articles, interesting GitHub repositories, cool papers and more !

<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">

<div id="mc_embed_signup" style="background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;">
<form action="https://gmail.us3.list-manage.com/subscribe/post?u=c76a8e2ec2bd989affb9a074f&amp;id=4646542adb" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
<div id="mc_embed_signup_scroll">
<label for="mce-EMAIL">Join the newsletter </label>
<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email address" required>
<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_c76a8e2ec2bd989affb9a074f_4646542adb" tabindex="-1" value=""></div>
<div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
</div>
</form>
</div>

<br>

# Latest Articles

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

# Medium Articles

<div id="medium-widget"></div>
<script src="https://medium-widget.pixelpoint.io/widget.js"></script>
<script>MediumWidget.Init({renderTo: '#medium-widget', params: {"resource":"https://medium.com/@mael.fabien","postsPerLine":1,"limit":10,"picture":"big","fields":["description","author","claps","publishAt"],"ratio":"landscape"}})</script>

<br>

# Written for other blogs

I also write articles for companies (if you think we could work together, feel free to reach out !) :

[Who's the painter? - For explorium.ai](https://www.explorium.ai/blog/whos-the-painter/) : An illustration of how data enrichment and feature engineering can improve a model.

[Machine Learning Interpretability and Explainability (1/2) - For explorium.ai](https://www.explorium.ai/blog/interpretability-and-explainability-part-1/) : An introduction to interpretable models with code and examples.

[A guide to Face Detection - For digitalminds.io](https://www.digitalminds.io/blog/a_guide_to_face_detection_in_python) : An overview of the different techniques face Face Detection in Python (with code).

<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"c76a8e2ec2bd989affb9a074f","lid":"4646542adb","uniqueMethods":true}) })</script>