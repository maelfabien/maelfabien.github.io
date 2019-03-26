---
published: true
title: Key Concepts of Time Series
collection: st
layout: single
author_profile: false
read_time: true
categories: [statistics]
excerpt : "Time Series"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser : "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
---

In this article, we'll introduce the key concepts related to time series.

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

{% highlight matlab %}
{% endhighlight %}

# I. Key concepts

## 1. Auto-correlation

The auto-correlation is defined as the correlation of the series over time, i.e how much the value at time $$ t $$ depends on the value at time $$ t-j $$ for all $$ j $$.

- The auto-correlation of order 1 is : $$ Corr(y_t, y_{t-1}) $$
- The auto-correlation of order j is : $$ Corr(y_t, y_{t-j}) $$
- The auto-covariance of order 1 is : $$ Cov(y_t, y_{t-1}) $$
- The auto-covariance of order j is : $$ Cov(y_t, y_{t-j}) $$

Empirically, the auto-correlation can be estimated by the sample auto-correlation :

$$ r_j = \frac {Cov^e (y_t, y_{t-j})} {Var^e(y_t)} $$ 

Where : $$ Cov^e = \frac {1} {T} \sum_{t-j+1} (y_t - \bar{y_{j+1,T})  (y_{t-j} - \bar{y_{1,T-j}) $$

To plot the auto-correlation and the partial auto-correlation, we can use `statsmodel` package :

```python
fig, axes = plt.subplots(1, 2, figsize=(15,8))

fig = sm.graphics.tsa.plot_acf(df_full['quantity'], lags=400, ax=axes[0])
fig = sm.graphics.tsa.plot_pacf(df_full['quantity'], lags=400, ax=axes[1])
```

...


> **Conclusion** : I hope you found this article useful. Don't hesitate to drop a comment if you have a question.
