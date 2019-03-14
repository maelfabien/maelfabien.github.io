---
published: true
title: Random Design Matrix
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

In the previous article, a hidden hypothesis was actually set without being explictly defined : $$ X $$ should be deterministic. Indeed, we should be able to have a full control on how $$ X $$ is measured. This is what we call a fixed design matrix. Let me quickly introduce an extension of what has been covered so far.

{% highlight python %}
{% endhighlight %}

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Random Design

In real life situations, $$ X $$ is rarely fixed. Indeed, many external components might influence the measures you are currently making. For example, some goelogical datas collected over time could depend on the temperature, the atmospheric pressure or other external factors... And it might not be taken into account.

For this reason, we introduce the random design matrices where : $$ X_i = X_i(w) $$ is a random variable. The hypothesis on $$ \epsilon $$ slightly change :
- $$ E({\epsilon}_i|X_i) = 0 $$ 
- $$ Var({\epsilon}_i|X_i) = {\sigma}^2 $$


## Consequences

The minimization problem remains the same as previously :
$$ argmin \sum(Y_i - X \hat{\beta})^2 $$ .

The difference relies in the associated theoretical results. Recall the Gram matrix that we previously defined :
$$ G = X^TX $$. 
It should now be written as follows :
$$ G = E(X^TX) $$.

The limit results become :
$$ \frac {1} {\sqrt{n}} * ({\hat{\sigma}_n - {\sigma}}) $$ tends as n goes to infinity to $$ N(0, E(X^TX)^{-1}{\sigma}^2) $$

Notice that it is now a limit result. 

## What changes ?

What should be remembered from this small article ? Well the direct consequence we face in this case is a change in the condifence interval as the limit distribution is not the same as previously.

Previously, we had : 

$$ {\beta}_{n,k} ± {t}_{1-{\alpha}/2} * \hat{\sigma}_n $$, 
$$ t $$ being the quantile of the student distribution

This result is constrained to the gaussian hypothesis, which is quite restrictive. 

Now that we introduced the random design matrix, the confidence interval becomes :

$$ {\beta}_{n,k} ± ({\Phi}^{-1})_{1-{\alpha}/2} * \hat{\sigma}_n $$ , $$ {\Phi}^{-1} $$ being the quantile of the Normal distribution. 

> **Conclusion** : This is all for this quick article on Random Design matrices. I simply wanted to raise the awareness of the reader on the random inputs one might face when measures are being made and not captured. This is still a restrictive models as it only holds at the limit, when n gets pretty big. 
