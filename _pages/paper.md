---
layout: paper
permalink: /paper/
title: Papers, Explained
author_profile: false
classes: wide
header :
    image: "https://maelfabien.github.io/assets/images/pap_head.png"
---

<head>
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
  width: 50%;
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

</head>


<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

I read a lot of papers to stay up to date on the latest trends in ML and DL. I've noticed that quite often, the papers might be too long or too complex for the needs of the industry and other practical applications. 

<br>

<blockquote class="ludwig">
“We have enough papers. Stop publishing, and start transforming people’s lives with technology!” — Andrew Ng from his speech “AI is the new electricity”
</blockquote>

In this section, I'm picking some papers, and trying to explain them by also providing some code, explanations (to the extent of my understanding), and eventually some implementations.

I'll try to cover papers linked to Statistics, Machine Learning, Deep Learning which have some potential practical implementations.

<br>
<br>
<img src="https://maelfabien.github.io/assets/images/expl.png" width="100%"/>

<br>
<br>

<h2 align="center"> Multimodal Emotion Recognition <p><i> De Bradké, Reynal, Lederman, Fabien </i></p> </h2>

<div class="row">

  <div class="column_home" id="left-col" align="center">
    <div style="width:100%; text-align:justify; align-content:left; display:inline-block;">
    <embed src="https://maelfabien.github.io/assets/images/PE.pdf" type="application/pdf" width="100%" height="138px" />
    </div>
  </div>

  <div class="column_home" id="left-col" align="center">
    <div style="text-align:justify; align-content:left; display:inline-block;">
      <p> Hello </p>
      <code>print("Hello")</code>
      <iframe src="https://trinket.io/embed/python/a537edfe04" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
    </div>
  </div>

</div>


</body>