---
published: true
title: Autograde, a grading tool for teachers
collection: tuto
layout: single
author_profile: true
read_time: true
categories: [project]
header :
    teaser: "https://maelfabien.github.io/assets/images/autograde.png"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

Many teachers are working from home during COVID-19 crisis, receiving and grading works online. My mother is in this situation. To help her, I built AutoGrade, an application that makes grading faster, by highlighting words of interest in the text of a student.

![image](https://maelfabien.github.io/assets/images/autograde.png)

The app can be found [here](https://autograde.onrender.com/).

Users of the app simply type words to look for on the left sidebar. Then, they paste the text to correct. The app will automatically highlight words sharing a similar root (hence, "stats" and "statistically" are recognized as the same word). It also highlights in another color words that are close but don't share the same root. Reading is therefore faster.

It's a simple tool, built with Streamlit #Python, and #NLTK. Nothing hard, but if it can help other teachers in their awesome work during these COVID-times, I'd be really happy. If ever you are interested in the tool, want specific features (e.g detect words with similar meaning), another language support (French is ready), just contact me.

The Github repository can also be found here:

<div class="github-card" data-github="maelfabien/AutoGrade" data-width="100%" data-height="" data-theme="default"></div>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>


