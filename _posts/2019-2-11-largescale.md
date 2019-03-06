---
published: true
title: Large Scale Kernel Methods 
collection: st
layout: single
author_profile: false
read_time: true
categories: [machinelearning]
excerpt : "Supervised Learning Algorithms"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
---

Kernel methods such as Kernel SVM have some major issues regarding scalability. You might have encountered some issues when trying to apply RBF Kernel SVMs on a large amount of data. 

Two major algorithms allow to easily scale Kernel methods :
- Random Kernel features
- Nyström approximation

We'll recall what Kernel methods are, and cover both methods.

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Recall on Kernel Methods

We'll consider a binary classification framework. Suppose we have training observations $$ X_1, ..., X_n \subset R^p $$, and training labels $$ y_1, ..., y_n ∈ {-1,1} $$ .

We can define the SVM framework as follows :

$$ min_{w ∈ R^p, b ∈ R, \epsilon ∈ R^n} \frac {1} {2} {\norm {w}_2}^2 + C \sum_i {\epsilon}_i

subject to :

$$ y_i ( w^T X + b) ≥ 1 - {\epsilon_i} $$

$$ {\epsilon_i} ≥ 0 $$




![image](https://maelfabien.github.io/assets/images/bagging_true.png)




> **Conclusion** : I hope that this article introduced clearly the concept of AdaBoost and that it does now seem clear to you. Don't hesitate to drop a comment if you have any question.

*References* :
- <a href="https://www.courgisera.org/lecture/ml-classification/learning-boosted-decision-stumps-with-adaboost-bx5YA">Coursera 1</a>. 
- <a href="https://ru.coursera.org/lecture/ml-classification/learning-boosted-decision-stumps-with-adaboost-bx5YA">Coursera 2</a>. 
- <a href="https://www.youtube.com/watch?v=UHBmv7qCey4">MIT Course</a>
- <a href="https://juegosrev.com/nl/wolf-howling-at-the-moon-wallpapers.html">Header Image</a>. 
