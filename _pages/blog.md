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

I have written more than 150 articles so far, so feel free to explore the different topics by clicking on the buttons below.

{% include gallery id="layouts_gallery" class="full" layout="half"%}

<input action="action" class="button" type="button" value="See all" onclick="location.href='https://maelfabien.github.io/year-archive/#';"/>

I recently gave an interview to the excellent data science podcast: DataCast.

<br>

<iframe height="200px" width="100%" frameborder="no" scrolling="no" seamless src="https://player.simplecast.com/283201b5-12cc-4488-a80c-2dffc1e71e4a?dark=false"></iframe>

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

[EM for Gaussian Mixture Models and Hidden Markov Models](https://maelfabien.github.io/machinelearning/GMM/) : 140 detailed and visual slides on GMMs, HMMs and EM. Introducing GMMs as a clustering technique, comparing it with K-Means, details on how to train GMMs with EM, and overview of HMM training. 

["Disrupting Resilient criminal networks through data analysis" paper summary](https://maelfabien.github.io/machinelearning/sicilian/): A summary and data exploration of an interesting paper on criminal networks in the Sicilian MAFIA.

["Structural Analysis of Criminal Network and Predicting Hidden Links using Machine Learning" paper summary](https://maelfabien.github.io/machinelearning/mlnetwork/): Summary and discussion of a paper tackling hidden link prediction as a supervised learning problem.

["Social network analysis as a tool for criminal intelligence:understanding its potential from the perspective of intelligence analysts" paper summary](https://maelfabien.github.io/machinelearning/sn_crime/): A qualitative review on how Law Enforcement Agencies using Criminal Network Analysis tools, and my personal view on that.

[SP - Voice Gender Detection web application](https://maelfabien.github.io/machinelearning/Speech11/#): How to extract relevant features and build a voice gender detection application using MFCC, GMMs and a provided dataset.

[SP - Sound Visualization (3/3)](https://maelfabien.github.io/machinelearning/Speech10/#): Dive into spectrograms, chromagrams, tempograms, spectral power density and more...

[SP - Sound Feature Extraction (2/3)](https://maelfabien.github.io/machinelearning/Speech9/#): An overview with a Python implementation of the different sound features to extract.

[SP - Introduction to Voice Processing in Python (1/3)](https://maelfabien.github.io/machinelearning/Speech8/#): Summary of the book "Voice Computing with Python" with concepts, code and examples.

[SP - Building a Voice Activity Detection web application](https://maelfabien.github.io/machinelearning/Speech4/#) : Voice detection can be used to start a voice assistant or in emergency cases for example. Here's how to implement it using simple methods.

[CV - Implementing YoloV3 for Object Detection](https://maelfabien.github.io/computervision/yolo/) : Learn how to implement YoloV3 and detect objects on your images and videos.

[NLP - Easy Question Answering with AllenNLP](https://maelfabien.github.io/machinelearning/NLP_9/) : Understand the core concepts and create a simple example of Question Answering.

[NLP - Data Augmentation in NLP](https://maelfabien.github.io/machinelearning/NLP_8/) : Details of the implementation of "Easy Data Augmentation" paper.

[NLP - Character-level LSTMs to predict gender of first names](https://maelfabien.github.io/machinelearning/NLP_7/) : 90% accuracy on predictiong the gender of French and US first names.

[NLP - Few Shot Text Classification](https://maelfabien.github.io/machinelearning/NLP_5) : Implementation of a simple paper that leverages pre-trained models for few shot text classification.

[NLP - Improved Few Shot Text Classification](https://maelfabien.github.io/machinelearning/NLP_6) : Improving previous results with Data Augmentation and more complex models.

[RL - Introduction to Reinforcement Learning](https://maelfabien.github.io/rl/RL_1) : An introduction to the basic building blocks of reinforcement learning.

<input action="action" class="button" type="button" value="See all" onclick="location.href='https://maelfabien.github.io/year-archive/#';"/>

<br>

# Medium Articles

<div id="medium-widget"></div>
<script src="https://medium-widget.pixelpoint.io/widget.js"></script>
<script>MediumWidget.Init({renderTo: '#medium-widget', params: {"resource":"https://medium.com/@mael.fabien","postsPerLine":1,"limit":10,"picture":"big","fields":["description","author","claps","publishAt"],"ratio":"landscape"}})</script>

<br>

# Written for other blogs

I also write articles for companies (if you think we could work together, feel free to reach out !) :

[Who's the painter? - For explorium.ai](https://www.explorium.ai/blog/whos-the-painter/) : An illustration of how data enrichment and feature engineering can improve a model.

[Machine Learning Interpretability and Explainability (1/2) - For explorium.ai](https://www.explorium.ai/blog/interpretability-and-explainability-part-1/) : An introduction to interpretable models with code and examples.

[Machine Learning Interpretability and Explainability (2/2) - For explorium.ai](https://www.explorium.ai/blog/interpretability-and-explainability-part-2/) : An introduction to explainability of black-box ML models.

[A guide to Face Detection - For digitalminds.io](https://www.digitalminds.io/blog/a_guide_to_face_detection_in_python) : An overview of the different techniques face Face Detection in Python (with code).

<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"c76a8e2ec2bd989affb9a074f","lid":"4646542adb","uniqueMethods":true}) })</script>