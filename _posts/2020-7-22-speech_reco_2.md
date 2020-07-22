---
published: true
title: Neural Network acoustic modeling
collection: ml
layout: single
author_profile: true
read_time: true
categories: [machinelearning]
excerpt : "Speech Processing"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/lgen_head.png"
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

So far, we have covered HMM-GMM acoustic modeling and some practical issues related to context and less frequent phonemes.

# Introduction to Neural Network acoustic modeling

There is an alternative way to build an acoustic model, and it consists in using neural networks to:
- take an input acoustic frame
- and output a score for each phone

Let's consider a single-layer neural network, that takes as an input an acoustic frame $$ X_t $$ and outputs phonetic scores $$ f(t) $$ (one score for each phone).

![image](https://maelfabien.github.io/assets/images/asr_30.png)

It can be expressed as:

$$ f = Wx + b $$

Where $$ W $$ is the weight matrix made of weights $$ w_{ij} $$ that reflect the weifht between input $$ i $$ and output $$ j $$, and $$ b $$ is the bias term. 

How do we learn the parameters $$ W $$ and $$ b $$? We target the minimization of the error function $$ E $$, the Mean Square Error (MSE) between the output and the target:

$$ E = 0.5 \times \frac{1}{T} \sum_{t=1}^T {\mid \mid f(x_t) - r(t) \mid \mid}^2 $$

Where $$ r(t) $$ are the target outputs.

The error minimization is typically done using gradient descent, and we must compute the terms:

$$ \frac{d E}{d W} $$ and $$ \frac{d E}{d b} $$

*Reminder*: Stochastic gradient descent (SGD)

In SGD, we:
- intialize weights and biases with small random numbers
- randomise the order of training data example
- then for each epoch:
	- take a minibact
	- compute network outputs
	- backpropagate and update the weights

The network that predicts phonetic scores is a classifier, so we need to take a softmax to force output values to act as probabilities:

$$ y_j = \frac{exp(f(x_j))}{\sum_{k=1}^K exp(f(x_k))} $$

Where $$ f(x_j) = \sum_{d=1}^D w_{jd} x_d + b_j $$

However, the MSE is not the wisest choice when working with probabilities. We can directly maximize the log probability of observing the correct label using the Cross-Entropy (CE) error function:

$$ E_t = - \sum{j=1}^J r_j^t \ln y_j^t $$

Using CE, the gradients of the outputs weights simplify to:

$$ \frac{dE^t}{dW_{jd}} = (y_j^t - r_j^t) x_d $$


# Conclusion

If you want to improve this article or have a question, feel free to leave a comment below :)

References:
- [ASR 07, University of Edimburgh](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr07-nnintro.pdf)

