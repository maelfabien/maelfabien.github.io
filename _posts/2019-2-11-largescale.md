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

# I. Recall on Kernel Methods

## SVM Classifier

We'll consider a binary classification framework. Suppose we have training observations $$ X_1, ..., X_n \subset R^p $$, and training labels $$ y_1, ..., y_n ∈ {-1,1} $$ .

We can define the non-linearly separable SVM framework as follows :

$$ min_{w ∈ R^p, b ∈ R, \epsilon ∈ R^n} \frac {1} {2} { {\mid \mid w \mid \mid }_2 }^2 + C \sum_i {\epsilon}_i $$

subject to :

$$ y_i ( w^T X + b) ≥ 1 - {\epsilon_i}, i = 1 ... n$$

$$ {\epsilon_i} ≥ 0, i = 1 ... n $$

We can rewrite this as a dual problem using a Lagrange formulation :

$$ max_{\alpha ∈ R^n} {\sum}_i {\alpha}_i - \frac {1} {2} {\alpha}_i {\alpha}_j y_i y_j {X_i}^T X_j $$

subject to :

$$ 0 ≤ {\alpha}_i ≤ C, i = 1 ... n $$

$$ {\epsilon}_i , i = 1 ... n $$

The binary classifier is : $$ f(x) = sign( \sum_i {\alpha}_i y_i {X_i}^T X_i ) $$

## The kernel trick

A symmetric function $$ K : χ \times χ → R $$ is a kernel if there exists a mapping function $$ \phi : χ → R $$ from the instance space $$ χ $$ to a Hilbert space $$ H $$ such that $$ K $$ can be written as an inner product in $$ H $$ :

$$ K(X, X') = < \phi(X), \phi(X') > $$

![image](https://maelfabien.github.io/assets/images/kernel_trick.jpg)

The Kernel SVM can be expressed as :

$$ max_{\alpha ∈ R^n} {\sum}_i {\alpha}_i - \frac {1} {2} {\alpha}_i {\alpha}_j y_i y_j K ({X_i}^T X_j) $$

subject to :

$$ 0 ≤ {\alpha}_i ≤ C, i = 1 ... n $$

$$ \sum_i {\alpha}_i  y_i = 0, i = 1 ... n $$

The binary classifier is : $$ f(x) = sign( \sum_i {\alpha}_i y_i K({X_i}^T X_i )) $$

## Types of kernels

What types of kernels can be used ?

- Linear kernel : $$ K(X,X') = X^T X' $$
- Polynomial kernel : $$ K(X,X') = (X^T X' + c)^d $$
- Gaussian RBF kernel : $$ K(X,X') = exp(- \gamma {{\mid \mid X - X' \mid \mid}_2}^2 ) $$
- Laplace RBF kernel : $$ K(X,X') = exp(- \gamma {\mid \mid X - X' \mid \mid}_1}) $$

Kernels allow non-linear variants for many linear machine learning algorithms :
- SVM
- Ridge Regression
- PCA
- K-Means
- ...

# II. Limits of Kernel methods

Kernel methods rely on Gram Matrix : $$ G ∈ R^{n \times n} $$

The Gram martix has the following form :

$$
\begin{pmatrix} 
K(X_1, X_1) & K(X_1, X_2) & .. & K(X_1, X_n) \\
... & ... & ... & ... \\
K(X_n, X_1) & K(X_n, X_2) & .. & K(X_n, X_n)
\end{pmatrix}
$$

The complexity of the kernel evaluation in the training is $$ O(n^2) $$.

The complexity of the prediction is $$ O(n) $$. 

Overall, this becomes infeasible for large $$ n $$.

# III. Random Kernel features

If we don't apply the Kernel SVM, the problem can be expressed the following way :

$$ min_{w,b} \frac {1} {2} { { \mid \mid w \mid \mid }_2 }^2 + C \sum_i [ y_i (W^T] $$





> **Conclusion** : I hope that this article introduced clearly the concept of AdaBoost and that it does now seem clear to you. Don't hesitate to drop a comment if you have any question.

*References* :
- <a href="https://www.courgisera.org/lecture/ml-classification/learning-boosted-decision-stumps-with-adaboost-bx5YA">Coursera 1</a>. 
- <a href="https://ru.coursera.org/lecture/ml-classification/learning-boosted-decision-stumps-with-adaboost-bx5YA">Coursera 2</a>. 
- <a href="https://www.youtube.com/watch?v=UHBmv7qCey4">MIT Course</a>
- <a href="https://juegosrev.com/nl/wolf-howling-at-the-moon-wallpapers.html">Header Image</a>. 
