---
published: false
title: Classification - Bayes
collection: ml
layout: single
author_profile: true
---

Do you remember when we defined the Gram matrix as $$ X^TX $$ ? To define the OLS estimator, we defined the Gram matrix as invertible. In other words, $$ Ker(X) = {0} $$ . But what happens when it is not the case ? 

## When does it happen ?

It might happen that the Gram matrix is not invertible. But what would that mean? And how does it happen?
- it arises from a non-unique OLS solution
- it typically is the case when the dimension of our design matrix $$ X $$ is larger than the number of observations itself, e.g collecting a lot of datas per patient in a small medical study
- it implies that the pseudo-inverse should be used instead of the inverse of the Gram matrix


## Singular Value Decomposition

If we cannot invert the Gram matrix, we are stuck in the algeraic derivation of the OLS model at the following expression :

$$ (X^TX){\beta} = X^TY $$

We do not have a unique solution, but a whole set of solutions defined by : $$ \hat{\beta} + Ker(X) $$.

In order to compute the inverse of $$ X^TX $$, we need to use the Singular Value Decomposition (SVD). The SVD is a matrix decomposition theorem that states the following :

> Any matrix $$ X_{(n*n)} $$ can be de decomposed as $$ X = USV^T $$ 
Where : 
- $$ U $$ is a $$ (n*n) $$ matrix, and $$ U^TU = I_n $$, contains left singular vectors
- $$ S $$ is a $$ (n*p) $$ matrix that contains the eigen values of X on the diagonal, and 0s elsewhere.
- $$ V $$ is a $$ (p*p) $$ matrix, and $$ V^TV = I_p $$, contains right singular vectors

We can express $$ X $$ as : $$ X = \sum S_iV_i{U_i}^T $$

The whole point of performing an SVD is to define : $$ X^+ = \sum {S_i}^{-1}V_i{U_i}^T $$. $$ X^+ $$ is called the pseudo-inverse of a matrix. This pseudo-inverse will allow us to compute the pseudo inverse of the Gram matrix :

$$ \hat{\beta} = (X^TX)^+ X^TY = (VSU^TUSV^T)^+(VSU^T)Y $$

$$ = (VS^2V^T)^+(VSU^T)Y = VS^{-2}SU^TY = VS^{-1}U^TY = X^+Y $$

The estimator has now a different form. This means that we can compute again the bias and the variance of this new estimator.

The bias becomes : $$ E(\hat{\beta}) - {\beta} = X^+E(Y) - {\beta} = X^+(X{\beta}) - {\beta} $$
$$ = (X^+X - I_p){\beta} $$ where $$ X^+X $$. The estimator will be biaised, except if $$ X^+X - I_p = 0 $$ which means $$ Ker(X) = {0} $$.

The variance becomes : $$ Var(\hat{\beta}_n) = (X^TX)^+{\sigma}^2 $$
$$ = (VSU^TUSV^T)^+{\sigma}^2 = (VS^{-2}V^T){\sigma}^2 $$
$$ = \sum \frac {({\sigma}_i)^2} {(S_i)^2} V_i {V_i}^T $$

> **Conclusion** : This article concludes our introduction to statistics for machine learning. It was a brief overview that was built to introduce the most importants concepts progressively. I would recommend diving deeper into the statistical theory by reading "Econometrics" by Bruce E. Hansen. If you are interested in going deeper in theory, I do also invite you to check the concepts of Generalized Least Sqaures and Restricted Least Squares.
