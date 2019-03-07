---
published: true
title: Boolean and categorical variables
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

Up to now, we mostly considered cases in which the variables were continuous (temperature for example). But the variety of data you might deal with might include categorical or boolean variables !

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# I. Binary Variables

Let's get back to our icecream demand forecasting problem :

$$ y_i = \beta_0 + \beta_1 * x_i + u_i $$

where :
- $$ y_i $$ is the icecream demand on a given day
- $$ \beta_0 $$ a constant parameter
- $$ \beta_1 $$ the parameter that assesses the impact of temperature on icecream demand
- $$ x_i  $$ the average temparature for a given day
- $$ u_i  $$ the residuals

A binary variable that might be interesting to predict icecream's consumption is the fact that there is public holiday on the day considered or not :

$$ y_i = \beta_0 + \beta_1 * {X_1}_i + \beta_2 * {X_2}_i + u_i $$

where :
- $$ {X_2}_i = 1 $$ is there is public holiday this day
- $$ {X_2}_i = 0 $$ otherwise

Therefore, we can see $$ \beta_2 $$ as :

$$ \beta_2 = E (y_i \mid holiday, {X_1}_i) - E (y_i \mid no-holiday, {X_1}_i )

Public holiday has an impact on icecream demand if $$ \beta_2 $$ is significantly different from 0. This can be seen as a classical hypothesis testing :
- Null hypothesis $$ H_0 : \beta_2 = 0 $$
- and $$ H_0 : \beta_2 ≠ 0 $$

# II. Categorical Variables

We might also have more than 2 categories. For example, regarding our public holiday variable, we'll now be intersted in which state/region of France is on public holiday (there are 3 overall, to avoid have every body sharing the same week of holiday). 

$$ y_i = \beta_0 + \beta_1 * {X_1}_i + \beta_2 * {X_2}_i + \beta_3 * {X_3}_i + \beta_4 * {X_4}_i + u_i $$

where :
- $$ {X_2}_i = 1 $$ is zone A is on holiday
- $$ {X_3}_i = 1 $$ is zone B is on holiday
- $$ {X_4}_i = 1 $$ is zone C is on holiday

The reference case we implicitely consider here is the case in which there is not public holiday. The three terms are here to evaluate a difference with the reference case.

We can run individual or joint tests on the different coefficients of the regression.

# III. Interaction variable

The intuition behind the interaction variable is quite simple. Suppose we want to test the effect of temperature on consumption if zone A is on holiday. 

The problem can be formulated as follows :

$$ y_i = \beta_0 + \beta_1 * {X_1}_i + \beta_2 * {X_2}_i + \theta_2 * {X_2}_i *  {X_1}_i + \beta_3 * {X_3}_i + \beta_4 * {X_4}_i + u_i $$

Here, $$ \theta_2 $$ measures the effect of temperature on icecream consumption when zone A is on holiday. 

We can run student tests on $$ \theta_2 $$ directly.

We  can now enrich our model and add several interaction terms :

$$ y_i = \beta_0 + \beta_1 * {X_1}_i + \beta_2 * {X_2}_i + \theta_2 * {X_2}_i *  {X_1}_i + \beta_3 * {X_3}_i + \theta_3 * {X_3}_i *  {X_1}_i  + \beta_4 * {X_4}_i + \theta_4 * {X_4}_i *  {X_1}_i + u_i $$

If we want to test the difference between the groups, we should make a Fisher test with a null hypothesis $$ H_0 : \theta_2 = 0, \theta_3 = 0, \theta_4 = 0 $$.

> **Conclusion** : This quick article introduced the methods to handle binary/categorical variables and how to make tests in such cases.
