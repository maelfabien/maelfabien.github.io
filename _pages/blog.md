---
layout: archive
permalink: /blog/
author_profile: true
title: "By Topic"
layouts_gallery:
  - url: https://maelfabien.github.io/ml/
    image_path: /assets/images/ml_short.png
  - url: https://maelfabien.github.io/dl/
    image_path: /assets/images/dl_short.png
  - url: https://maelfabien.github.io/bgd/
    image_path: /assets/images/de_short.png
  - url: https://maelfabien.github.io/nlp/
    image_path: /assets/images/nlp_short.png
  - url: https://maelfabien.github.io/cv/
    image_path: /assets/images/cv_short.png
  - url: https://maelfabien.github.io/signal/
    image_path: /assets/images/signal_short.png
  - url: https://maelfabien.github.io/rl/
    image_path: /assets/images/rl_short.png
  - url: https://maelfabien.github.io/phd/
    image_path: /assets/images/phd_short.png
  - url: https://maelfabien.github.io/ent/
    image_path: /assets/images/ent_short.png
---


<style>

  @import "compass/css3";

  /* Some vars */
  $background-color: hsl(50, 5, 97);
  $black: hsl(200, 40, 10);
  $white: $background-color;
  $base-font-size: 2.4em;
  $base-line-height: 1.5em;

  .ludwig {
  position: relative;
  padding-left: 1em;
  border-left: 0.2em solid lighten($black, 40%);
  font-family: 'Roboto', serif;
  font-size: $base-font-size;
  line-height: $base-line-height;
  font-weight: 100;
  &:before, &:after {
      content: '\201C';
      font-family: 'Sanchez';
      color: lighten($black, 40%);
   }
   &:after {
      content: '\201D';
   }
  }

.column {
  align-content:center;
  float: left;
  width: 50%;
  height: 100%;
}

.column_home {
  align-content:center;
  float: left;
  width: 20%;
  height: 100%;
}


.center_text {
  align-content:center;
  width: 50%;
  vertical-align: middle;
  text-align:justify;
  text-align-last: center;
}

#left-col {
  align-content:center;
  text-align: center;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

* {
  box-sizing: border-box;
}

i {
  font-size: 0.4em;
}


#right-col {
  align-content:center;
  text-align: center;
}
</style>

I wrote close to 200 tech articles throughout my studies, between 2018 and 2020. I cannot guarantee they're still updated.

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



<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"c76a8e2ec2bd989affb9a074f","lid":"4646542adb","uniqueMethods":true}) })</script>
