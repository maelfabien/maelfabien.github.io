---
published: false
title: Practical introduction to Continual Learning (CL)
collection: ml
layout: single
author_profile: true
read_time: true
categories: [machinelearning]
excerpt : "Advanced Machine Learning"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser : "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

This article summarizes the talk given by `cnvrg.io` during their Webinar on Continual Learning.

> **Continual learning** (CL) is the ability of a model to learn continually from a stream of data, updating the model in production to maintain performance and relevancy. It's in some way an autopilot mode for ML algorithms.

The typical CL pipeline is the following :
- Input Data
- Data Validation
- **AutoML & Hyperparameter optimization (HPO)**
- Model Validation
- **Model deployment**
- Predictions 
- **Monitoring**
- Cleaning & Labelling
- Back to input data 
- ...

We will explore a CL algorithm for MNIST data set, and focus on the elements of the pipeline above in bold.

# AutoML & HPO

The first step is to choose the right algorithms to use, and the range of hyper-parameters to explore. There are many options. If it's a computer vision, it is advised to use transfer learning on pre-trained ResNet VGG or Inception models. 

The idea here is to define a set of algorithms and hyperparameters among which we can automatically select the best model. We then train all the algorithms and keep track of each algorithm.

# Deployment

This AutoML part also requires that we have clusters available at all time and that our infrastructure is also automated (GCP, AWS + Kubernetes).

The deployment should be progressive, and we should run tests before, during and after deployment, and define our benchmarks. Usually, for ML models, the deployment is done using the Canary Release technique, a technique to reduce the risk of introducing a new software version in production by slowly rolling out the change to a small subset of users, before making it gradually available to everybody.

[Martin Fowler](https://martinfowler.com/bliki/CanaryRelease.html) provides a good illustration of this concept :

![image](https://maelfabien.github.io/assets/images/canary.png)

Regarding the deployment, it is recommended to use Kubernetes ([this](https://cnvrg.io/deploy-models-with-kubernetes/) tutorial explains it well).

# Monitoring

We should monitor :
- our input data
- our predictions

For the input data, we should look for :
- unexpected values
- correlation between production and training data
- new tests to add in production

For the prediction monitoring, we need to watch the model confidence, the bias...

# Retrain the model

The ML pipeline should be triggered based on :
- periodically (once a day, once a week...)
- new training data coming in
- model decay/alerts in production

Since the retraining typically occurs automatically, it is essential to track and validate the triggers.


> **Conclusion** : That's it ! I hope this introduction to Online Learning was clear. Don't hesitate to drop a comment if you have any question.