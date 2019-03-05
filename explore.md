---
title: "About me"
excerpt: ""
author_profile: true
layout : single
header :
    image: "https://maelfabien.github.io/images/wolf.jpg"
redirect_from: 
    - /about/
    - /about.html
intro: 
    - excerpt: 'Some of my latest articles in statistics, machine learning, deep learning or big data analytics. `type="center"`'
feature_row:
    - image_path: "https://maelfabien.github.io/assets/images/stats_head.jpg"
    alt: "Linear Regression"
    title: "Linear Regression"
    url: "https://maelfabien.github.io/statistics/linreg/"
    btn_label: "Read More"
    btn_class: "btn--primary"
    - image_path: "https://maelfabien.github.io/assets/images/ml_head.png"
    alt: "AdaBoost"
    title: "AdaBoost"
    url: "https://maelfabien.github.io/machinelearning/adaboost/"
    btn_label: "Read More"
    btn_class: "btn--primary"
    - image_path: /assets/images/bgd_head.png
    alt: "TPU in Collab"
    title: "TPU in Collab"
    url: "https://maelfabien.github.io/bigdata/CollabTPU/"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row2:
    - image_path: "https://maelfabien.github.io/assets/images/bgd_head.png"
    alt: "placeholder image 2"
    title: "Placeholder Image Left Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Left aligned with `type="left"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row3:
    - image_path: /assets/images/bgd_head.png
    alt: "placeholder image 2"
    title: "Placeholder Image Right Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Right aligned with `type="right"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row4:
    - image_path: /assets/images/bgd_head.png
    alt: "placeholder image 2"
    title: "Placeholder Image Center Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Centered with `type="center"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}

{% include feature_row id="feature_row3" type="right" %}

{% include feature_row id="feature_row4" type="center" %}
