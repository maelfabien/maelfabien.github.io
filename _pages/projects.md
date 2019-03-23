---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
classes: wide
header :
    image: "https://maelfabien.github.io/assets/images/wolf.jpg"
---


## GitHub Projects

### Big Data : A Cassandra DB for geo-political data (GDELT)

The GDELT Project monitors the world's broadcast, print, and web news from nearly every corner of every country in over 100 languages and identifies the people, locations, organizations, themes, sources, emotions, counts, quotes ...in the entire world. With new files uploaded every 15 minutes, GDELT data bases contain more than 500 Gb of zipped data for the single year 2018.

In a group project, we worked on a resilient No-SQL (Cassandra) database architecture on EC2 instances. The pipeline for the data processing was developped in Spark-Scala. The visualization implied Zeppelin Notebooks.

See GitHub page : <span style="color:blue">[https://github.com/maelfabien/gdelt](https://github.com/maelfabien/gdelt)</span>

![image](https://maelfabien.github.io/assets/images/archi.png)

### Deep Learning : Multimodal Sentiment Analysis (Text, Sound, Video)

In this project, I am exploring state of the art models in multimodal sentiment analysis. We have chosen to explore textual, sound and video inputs and develop an ensemble model that gathers the information from all these sources and displays it in a clear and interpretable way.

I am currently working on a Tensorflow.js implementation of this project. Don't hesite to Star the project if you like it.

See GitHub page : <span style="color:blue">[https://github.com/maelfabien/Mutlimodal-Sentiment-Analysis](https://github.com/maelfabien/Mutlimodal-Sentiment-Analysis)</span>

<embed src="https://maelfabien.github.io/assets/images/PE.pdf" type="application/pdf" width="600px" height="500px" />

### Multi-Regression : Estimating a position from a received signal strength for IoT sensors

Smart devices such as IoT sensors use low energy consuming networks such as the ones provided by Sigfox or Lora. But without using GPS networks, it becomes harder to estimate the position of the sensor. The aim of this study is to provide a geolocation estimation using Received Signal Strength Indicator in the context of IoT. The aim is to allow a geolocation of lowconsumption connected devices using the Sigfox network. State of the art modelsare able to be precise to the nearest kilometer in urban areas, and around tenkilometers in less populated areas.

See GitHub page: <span style="color:blue">[https://github.com/maelfabien/Received-Signal-Strength-Geo-Location](https://github.com/maelfabien/Received-Signal-Strength-Geo-Location)</span>

<embed src="https://maelfabien.github.io/assets/images/RSSI.pdf" type="application/pdf" width="600px" height="500px" />

### NLP : Analyzing GitHub Pull Requests

In this project, I have been looking at comments of developers on GitHub pull requests in order to :
- determine the main topics (LSA Topic Modelling)
- identify clusters of words (KMeans)
- predict if a merge will occur after the comment (Bag Of Words, TF-IDF)
- predict the time before the merge

See GitHub page: <span style="color:blue">[https://github.com/maelfabien/Analyze-Github-Pull-Requests](https://github.com/maelfabien/Analyze-Github-Pull-Requests)</span>

<embed src="https://maelfabien.github.io/assets/images/NLP.pdf" type="application/pdf" width="600px" height="500px" />

### Classification : Predicting the predominant kind of tree (Kaggle)

In this [challenge](https://github.com/maelfabien/Forest-Cover-Type-Challenge) , I am trying to predict the forest cover type (the predominant kind of tree cover) from strictly cartographic variables (as opposed to remotely sensed data) . 

See GitHub page : <span style="color:blue">[https://github.com/maelfabien/Forest-Cover-Type-Challenge](https://github.com/maelfabien/Forest-Cover-Type-Challenge)</span>

### Cyber Security (Splunk)

I used Splunk in a Cyber Security Project. The aim of the project was to identify the source of a data leakage within the company. We went through the logs, identified suspect IP addresses, found the source of the attack (a corrupted PDF), estimated the volume of data stolen, and proposed immediate actions. We detailed the Diamond Model, the Cyber Kill Chain, and developped general perspectives for the Cyber Threat Intelligence of the company.

<embed src="https://maelfabien.github.io/assets/images/Cyber.pdf" type="application/pdf" width="600px" height="500px" />


## Hackathons

[Predicting the Song of the year (1/3)](https://maelfabien.github.io/Hack-1/)

[Predicting the Song of the year (2/3)](https://maelfabien.github.io/Hack-2/)

[Predicting the Song of the year (3/3)](https://maelfabien.github.io/Hack-3/)
