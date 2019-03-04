---
published: false
title: Subset Selection - Forward Variable Selection
collection: st
layout: single
author_profile: false
classes: wide
read_time: true
header :
    image: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
---

So far, we have covered the most common case of linear regression, and we explored several special cases. An intrinseque hypothesis we did, what that $$ p << n $$, meaning that the dimension of our design matrix is much smaller than the number of observations. 

But this assumption might happen to be wrong in some cases, especially when we work on small data sets. A current practrice in this case is to consider that we should order the importance of the different features, as not all of them have a significant role. 

We re-create a new set of features, by only keeping the most significant according to some criterion : this is called a subset selection.

## Motivation for subset selection 

The subset selection is also called feature selection. It does bring quite a lot to our model, including :
- making it easier to understand, as there are less feature now
- making our fitting faster on the train set
- reducing overfitting 
- improving the accuracy

These benefits come at a cost : we have to be very careful in the way we choose the features, otherwise, we could simply be droping significant features. 

## What is forward variable selection ?

The pseudo-algorithm of forward / step-wise variable selection is :
- start with no explanatory variable 
- compute the T-Stat of each explanatory variable (one by one)
- add to the model the variable that has the highest T-Stat (or other statistical criterion)
- for each feature left :
    - regress the feature on the residuals of the previous model with the included variables
    - add the fearture that has the highest T-Stat
    -  restart until a stopping criterion is met (typicall the marginal improvment of $$ R^2 $$ becomes smaller than $$ {\epsilon} $$)

Antoher approach is to set the stopping criterion to a given fixed number, if for some reason we have an intuition on the number of features to include.

## Theory

How does the forward variable selection work ?




## Implementation

I will propose here two different implementations :
- one that I developped on my own, which can probably be easily improved
- one using the Sk-learn module


