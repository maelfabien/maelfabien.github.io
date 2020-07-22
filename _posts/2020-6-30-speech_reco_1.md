---
published: true
title: HMM acoustic modeling
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

Let's now dive into acoustic modeling, with the historical approach: Hidden Markov Models and Gaussian Mixture Models (HMM-GMM). 

# Introduction to HMM-GMM acoustic modeling

Rather than covering into the maths of HMMs and GMMs in this article, I would like to invite you to read these slides that I have made on the topic of Expectation Maximization for HMMs-GMMs, it starts from very basic concepts and covers up to the end. Before going through the slides, let us just remind us what we try to do here.

We want to cover the acoustic modeling, meaning that the HMM-GMM will model $$ P(X \mid W) $$ in the diagram below.

![image](https://maelfabien.github.io/assets/images/asr_21.png)

In the ASR course of the University of Edimburgh, this diagram illustrates where this HMM-GMM architecture takes place:

![image](https://maelfabien.github.io/assets/images/asr_22.png)

From the utterance $$ W $$, we can break it down into words, then into subwords (or phonemes or phones), and we represent each subword as a HMM. Therefore, for each subword, we have a HMM with several hidden states, which generates features based on a GMM at each state, and these features will represent the acoustic features $$ X $$.

Alright, let's jump to the slides:

<iframe width="700" height="500" src="https://www.youtube.com/embed/hxr-UijYbpk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you follow the ASR course of the University of Edimburgh, the slides above will correspond to:
- [ASR 02](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr02-hmmgmm.pdf)
- [ASR 03](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr03-hmm-algorithms.pdf)
- [ASR 06](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr06-cdhmm.pdf)

# Context-dependent phone models

## Overview

As seen in the slides, there are several ways to model words with HMM models. We can either consider that a single phone is represented by several hidden states of a HMM:

![image](https://maelfabien.github.io/assets/images/asr_23.png)

Or that each phone is modeled by a single state of a HMM:

![image](https://maelfabien.github.io/assets/images/asr_24.png)

The **acoustic phonetic context** of a speech unit describes how articulation (acoustic realization) changes depending on the surrounding units. For example, "/n/" is not pronounced the same in "ten" (alveolar) and "tenth" (dental).

And this violates the Markov assumption of the acoustic realization being independent of the previous states. But how can we model context?
- using pronounciations, hence leading to a pronounciation model
- using subwords units with context:
	- use longer units that incorporate context, e.g. biphones or triphones, demisyllables or syllables
	- use multiples models for each

For example, left biphones modeling would look like this:

![image](https://maelfabien.github.io/assets/images/asr_25.png)

And triphones can be represented this way:

![image](https://maelfabien.github.io/assets/images/asr_26.png)

Context dependent models are:
- more specific 
- can define multiple context-dependent models to increase the state-space
- handles incorrectness of Markov assumption
- each model is now responsible for a smaller region of the acoustic-phonetic space

## Triphones models

There are 2 main types of triphones:
- word-internal triphones: we only take triphones within a word
- cross-word triphones: triphones can model the links between words too

If we have a system with 40 phones, then the total number of triphones that can occur is: $$ 40^4 = 64000 $$. In a cross-word system, typicall 50'000 of them can occur.

The number of gaussians of 50'000 3-states HMMs with 10 components per gaussian is 1.5 million. If features are 39-dimensional (12 MFCCs + energy, delta and accelaration), then each Gaussian has 790 parameters, leading to 118 million parameters! We need huge amount of training data, which ensures that all combinations are covered. Otherwise, we can explore alternatives.

## Modeling infrequent triphones

There are several ways to handle infrequent triphones rather than expecting large amount of training data:









# Conclusion

If you want to improve this article or have a question, feel free to leave a comment below :)

References:
- [ASR 02, University of Edimburgh](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr02-hmmgmm.pdf)
- [ASR 03, University of Edimburgh](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr03-hmm-algorithms.pdf)
- [ASR 06, University of Edimburgh](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr06-cdhmm.pdf)

