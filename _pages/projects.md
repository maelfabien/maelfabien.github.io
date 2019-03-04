---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
classes: wide
header :
    image: "https://maelfabien.github.io/myblog/images/wolf.jpg"
---


## GitHub Projects

### Big Data : A Cassandra DB for geo-political data (GDELT)

The GDELT Project monitors the world's broadcast, print, and web news from nearly every corner of every country in over 100 languages and identifies the people, locations, organizations, themes, sources, emotions, counts, quotes ...in the entire world. With new files uploaded every 15 minutes, GDELT data bases contain more than 500 Gb of zipped data for the single year 2018.

In a group project, we worked on a resilient No-SQL (Cassandra) database architecture on EC2 instances. The pipeline for the data processing was developped in Spark-Scala. The visualization implied Zeppelin Notebooks.

See GitHub page : <span style="color:blue">[https://github.com/maelfabien/gdelt](https://github.com/maelfabien/gdelt)</span>

### Deep Learning : Multimodal Sentiment Analysis (Text, Sound, Video)

In this project, I am exploring state of the art models in multimodal sentiment analysis. We have chosen to explore textual, sound and video inputs and develop an ensemble model that gathers the information from all these sources and displays it in a clear and interpretable way.

I am currently working on a Tensorflow.js implementation of this project. Don't hesite to Star the project if you like it.

See GitHub page : <span style="color:blue">[https://github.com/maelfabien/Mutlimodal-Sentiment-Analysis](https://github.com/maelfabien/Mutlimodal-Sentiment-Analysis)</span>

### Multi-Regression : Estimating a position from a received signal strength for IoT sensors

Smart devices such as IoT sensors use low energy consuming networks such as the ones provided by Sigfox or Lora. But without using GPS networks, it becomes harder to estimate the position of the sensor. The aim of this study is to provide a geolocation estimation using Received Signal Strength Indicator in the context of IoT. The aim is to allow a geolocation of lowconsumption connected devices using the Sigfox network. State of the art modelsare able to be precise to the nearest kilometer in urban areas, and around tenkilometers in less populated areas.

See GitHub page: <span style="color:blue">[https://github.com/maelfabien/Received-Signal-Strength-Geo-Location](https://github.com/maelfabien/Received-Signal-Strength-Geo-Location)</span>

### NLP : Analyzing GitHub Pull Requests

In this project, I have been looking at comments of developers on GitHub pull requests in order to :
- determine the main topics (LSA Topic Modelling)
- identify clusters of words (KMeans)
- predict if a merge will occur after the comment (Bag Of Words, TF-IDF)
- predict the time before the merge

See GitHub page: <span style="color:blue">[https://github.com/maelfabien/Analyze-Github-Pull-Requests](https://github.com/maelfabien/Analyze-Github-Pull-Requests)</span>

### Classification : Predicting the predominant kind of tree (Kaggle)

In this [challenge](https://github.com/maelfabien/Forest-Cover-Type-Challenge) , I am trying to predict the forest cover type (the predominant kind of tree cover) from strictly cartographic variables (as opposed to remotely sensed data) . 

See GitHub page : <span style="color:blue">[https://github.com/maelfabien/Forest-Cover-Type-Challenge](https://github.com/maelfabien/Forest-Cover-Type-Challenge)</span>

## Hackathons

[Predicting the Song of the year (1/3) ](https://maelfabien.github.io/Hack-1/)

[Install Zeppelin Locally](https://maelfabien.github.io/Hack-2/)

[Install Zeppelin Locally](https://maelfabien.github.io/Hack-3/)
