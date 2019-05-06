---
published: true
title: Bayesian Hyperparameter Optimization
collection: st
layout: single
author_profile: false
read_time: true
categories: [machinelearning]
excerpt : "Parameters and Model Optimization"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

Bayesian Hyperpameter Optimization is a model-based hyperparameter optimization. On the other hand, GridSearch or RandomizedSearch do not depend on any underlying model. 

What are the main advantages and limitations of model-based techniques ? How can we implement it in Python ?

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Bayesian Hyperparameter Optimization

## Sequential model-based optimization (SMBO)

In an optimization problem regarding model's hyperparameters, the aim is to identify :

$$ x^* = argmin_x f(x) $$

where $$ f $$ is an expensive function. 

Depending on the form or the dimension of the initial problem, it might be really expensive to find the optimal value of $$ x $$. Hyperparameter gradients might also not be available. 

Suppose that we know all the parameters distribution. We can represent for every hyperparameter, a distribution of the loss according to its value.

![image](https://maelfabien.github.io/assets/images/ho1.png)

Since the curve is not known, a naive approach would be the pick a few values of `x` and try to observe the corresponding values `f(x)`. We would then pick the value of `x` that gave the smallest value.

![image](https://maelfabien.github.io/assets/images/ho2.png)

## Probabilistic Regression Models 

We try to approximate the underlying function using only the samples we have. This can essentially be done in 3 ways :
- using Gaussian Process (GP)
- using Random Forests
- using Tree Parzen Estimators (TPE)

### Gaussian Process (GP)

We suppose that the function $$ f $$ has a mean $$ \mu $$ and a covariance $$ K $$, and is a realization of a Gaussian Process. The Gaussian Process is a tool used to infer the value of a function. Predictions follow a normal distribution. Therefore :

$$ p(y \mid x, D) = N(y \mid \hat{\mu}, {\hat{\sigma}}^2) $$

We use that set of predictions and pick new points where we should evaluate next. We can plot a Gaussian Process between 4 samples this way :

![image](https://maelfabien.github.io/assets/images/ho3.png)

The green areas represent confidence intervals.

From that new point, we add it to the samples, and re-build the Gaussian Process with that new information... We keep doing this until we reach the maximal number of iterations, or the limit time for example. 

### Random Forests

Another choice for the probabilistic regression model is an ensemble of regression trees. This is used by Sequential Model-based Algorithm Configuration library (SMAC).

We still suppose that $$ N(y \mid \hat{\mu}, {\hat{\sigma}}^2) $$ is Gaussian.

We choose the parameters $$ hat{\mu}, \hat{\sigma} $$ as the empirical mean and variance of the regression values.

$$ \hat{\mu} = \frac {1} { \mid B \mid } \sum_{r \in B} r(x) $$

$$ {\hat{\sigma}}^2 = \frac {1} { \mid B \mid - 1 } \sum_{r \in B} ( r(x) - \hat{\mu} )^2 $$

By their structure, Random Forests allow the use of conditional variables, which is a nice feature.

### Tree Parzen Estimators (TPE)

TPE does not define a predictive distribution. Instead,  it creates two hierarchical processes, $$ l(x) $$ and $$ g(x) $$ acting as generative models for all domain variables. These processes model the domain variables when the objective function is below and above a specified quantile $$ y^* $$.

$$ p(x \mid y, D) = l(x) $$ if $$ y < y^* $$, else $$ g(x) $$

Gaussian processes and random forests, in contrast, model the objective function as dependent on the entire joint variable configuration.

Parzen estimators are organized in a tree structure, preserving any specified conditional dependence and resulting in a fit per variable for each process $$ l(x), g(x) $$. With these two distributions, one can optimize a closed form term proportional to expected improvement

TPE naturally supports domains with specified conditional variables. 

## Acquisition function

How do we pick point to know where we should evaluate next ?
- Pick points that yield, on the approximated curve, a low value. 
- Pick points in areas we have less explored.

There is an exploration / exploitation trade-off to make. This tradeoff is taken into account in an *acquisition function*.

The acquisition function is defined as :

$$ A(x) = \sigma(x) ( \gamma(x) \Phi( \gamma(x)) + N (\gamma(x))) $$

where :

- $$ \gamma(x) = \frac { f(x^c) - \mu(x)} {\sigma(x)} $$
- $$ f(x^c) $$ the current guessed arg min, $$ \mu(x) $$ the guessed value of the function at `x`, and $$ \sigma(x) $$ the standard deviation of output at `x`.
- $$ \Phi(x) $$ and $$ N(x) $$ are the CDF and the PDF of a standard normal

We then compute the acquisiton score of each point, pick the point that has the highest activation, and evaluate $$ f(x) $$ at that point, and so on...

![image](https://maelfabien.github.io/assets/images/ho4.png)

The process can be illustrated the following way :

![image](https://maelfabien.github.io/assets/images/bo.gif)

This is the essence of SMBO !

## Initialization sampling

In practice, we do not systematically pick random values of $$ x $$ as an initialization. We can use :
- random sampling
- quasi-random sampling
- Latin hypercube sampling


# Advantages of Bayesian Hyperparameter Optimization

Bayesian optimization techniques can be effective in practice even if the underlying function $$ f $$ being optimized is stochastic, non-convex, or even non-continuous. 

Bayesian optimization is effective, but it will not solve all our tuning problems. As the search progresses, the algorithm switches from exploration — trying new hyperparameter values — to exploitation — using hyperparameter values that resulted in the lowest objective function loss.

If the algorithm finds a local minimum of the objective function, it might concentrate on hyperparameter values around the local minimum rather than trying different values located far away in the domain space. Random search does not suffer from this issue because it does not concentrate on any values!

# Implementation in Python

Several softwares implement Gaussian Hyperparameter Optimization.

![image](https://maelfabien.github.io/assets/images/ho5.png)

We'll be using HyperOpt in this example.









> **Conclusion** : I hope this article on AutoML was interesting. It's a really hot topic, and I do expect large improvements to be made over the next years in this field. 

Sources :
- [https://www.quora.com/How-does-Bayesian-optimization-work](https://www.quora.com/How-does-Bayesian-optimization-work)
- [https://github.com/fmfn/BayesianOptimization](https://github.com/fmfn/BayesianOptimization)
- [https://static.sigopt.com/773979031a2d61595b9bda23bb81a192341f11a4/pdf/SigOpt_Bayesian_Optimization_Primer.pdf](https://static.sigopt.com/773979031a2d61595b9bda23bb81a192341f11a4/pdf/SigOpt_Bayesian_Optimization_Primer.pdf)


