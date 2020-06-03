---
published: true
title: AutoHome, a tool to find your dream house
collection: tuto
layout: single
author_profile: true
read_time: true
categories: [project]
header :
    teaser: "https://maelfabien.github.io/assets/images/autohome.png"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

My girlfriend and I were recently looking for a house to buy. Rather than spending time on each of the real-estate websites individually, I decided to build a web application that scraps 5 of the most common real-estate agencies in the specific region of France we were looking at:

![image](https://maelfabien.github.io/assets/images/autohome.png)

It basically:
- scraps 5 real-estate agencies in the North-West part of France
- gathers the results in a single dataframe
- displays and sorts the results on a Streamlit web application

It mainly relies on:
- BeautifulSoup
- Streamlit

## Features

The application:
- shows you details and pictures on houses from OuestFrance Immo and other real-estate agencies
- has a filter on sea view
- allows you to select a minimum and maximum budget
- allows you to sort by date, price, self-determined score...
- allows you to specify the amount of money you need to borrow, the interest rate, and computes your monthly payments
- re-directs you to the source link with a simple click

Cool things:
- you can click on the "Actualiser" button, and it will re-scrap the whole set of websites (± 1mn)
- otherwise, results are stored in a dataframe, which makes the navigation way faster

## GitHub

The Github repository can also be found here:

<div class="github-card" data-github="maelfabien/AutoHome" data-width="100%" data-height="" data-theme="default"></div>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>

To run it, simply use:

```
pip install -r requirements.txt
```

And launch the app via:

```
streamlit run app.py
```

