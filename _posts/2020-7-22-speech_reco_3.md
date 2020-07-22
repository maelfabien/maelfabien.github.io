---
published: true
title: Large vocabulary ASR and Language model decoding
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

Acoustic modeling allows you to identify phonemes and transitions between them. But we still miss a step to return proper words: a language model that helps identify the correct words.

# Language model integration

Recall the fundamental equation of speech recognition:

$$ W^{\star} = argmax_W P(W \mid X) $$

This is known as the "Fundamental Equation of Statistical Speech Processing". Using Bayes Rule, we can rewrite is as :

$$ W^{\star} = argmax_W \frac{P(X \mid W) P(W)}{P(X)} $$

Where $$ P(X \mid W) $$ is the acoustic model (what we have done so far), and $$ P(W) $$ is the language model.

In brief, we use pronunciation knowledge to construct HMMs for all possible words, and use the most probable state sequence to recove the most probable word sequence.

In continuous speech recogniton, the number of words in the utterance is not known. Word boundaries are not known. We therefore need to add transitions between all word-final and word-initial states.

![image](https://maelfabien.github.io/assets/images/asr_32.png)

If we then apply Viterbi decoding to find the optimal word sequence, we need to consider $$ {\mid V \mid}^2 $$ inter-word transitions at every time step, where $$ V $$ is the number of words in the vocabulary. Needless to say, it can become a problem that is way too long to compute.

So the question becomes: can we speed up the Viterbi search of the best sequence using some kind of information? And the answer is yes, using the Language Model (LM).

Recall that in an N-gram language model, you model the probability of observing $$ w_i $$ after a sequence of words $$ w_{i-n}, w_{i-n+1}, ... w_{i-1} $$

![image](https://maelfabien.github.io/assets/images/asr_33.png)

However, the exact search is not possible for large vocabulary tasks, especially in the case of the use of cross-words. There are several solutions to this:
- beam search : prune low probability hypothesis
- tree structured lexicons
- language model look-ahead
- dynamic search structured
- multipass search
- best-first search
- **Weighted Finite State Transducers** (WFST)



# Conclusion

If you want to improve this article or have a question, feel free to leave a comment below :)

References:
- [ASR 09, University of Edimburgh](http://www.inf.ed.ac.uk/teaching/courses/asr/2019-20/asr09-lvcsr.pdf)