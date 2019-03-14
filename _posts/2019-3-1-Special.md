---
published: true
title: Transformed Linear Regression
collection: st
layout: single
author_profile: false
read_time: true
categories: [statistics]
excerpt : "Linear Model"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
---

We have so far covered only the most basic framework of linear regressions. In this quick article, we'll introduce some extensions od the linear regression model.

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Transformations

Let's get back to the simple problem in which we wanted to assess the demand for icecream depending on outside temperature. The model we built looked like this :

$$ y_i = \beta_0 + \beta_1 * x_i + u_i $$

where :
- $$ y_i $$ is the icecream demand on a given day
- $$ \beta_0 $$ a constant parameter
- $$ \beta_1 $$ the parameter that assesses the impact of temperature on icecream demand
- $$ x_i  $$ the average temparature for a given day
- $$ u_i  $$ the residuals

However, the assumption that the model is purely linear is a strong assumption, that is pretty much never met in practice. We can apply some transformations to the model to make it more flexible.

## 1. Log

$$ log(y_i) = \beta_0 + \beta_1 * x_i + u_i $$

This also means that 1% change of $$ y_i $$ : $$  \delta_{y_i} $$ is equal to $$ 100 * \beta_1 * \delta_{x_i} $$ .

## 2. Log-Log

$$ log(y_i) = \beta_0 + \beta_1 * log(x_i) + u_i $$

## 3. Square Root

$$ y_i = \beta_0 + \beta_1 * \sqrt {x_i} + u_i $$

## 4. Quadratic

$$ y_i = \beta_0 + \beta_1 * {X_1}_i + \beta_2 * {X_{2i}}^2 + u_i $$

This implies that :

$$ \frac { \delta_{ {X_1}_i } } { \delta_{ {X_2}_i } } = \beta_1 + 2 * \beta_2 * {X_2}_i  $$

## 5. Non-linear

$$ y_i = \frac {1} {\beta_0 + \beta_1 * {x}_i } + u_i $$

This is a simple example of a non-linear transform.

> **Conclusion** : We have covered the most common tests to apply in the linear regression framework. Don't hesitate to drop a comment if you have a question.
