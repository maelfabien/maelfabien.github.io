---
published: true
title: Introduction to Automatic Speech Recognition (ASR)
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

This article provides a summary of the course ["Automatic speech recognition" by Gwénolé Lecorvé from the Research in Computer Science (SIF) master](http://people.irisa.fr/Gwenole.Lecorve/lectures/ASR.pdf) as well as some personal notes.

# Introduction to ASR

## What is ASR?

> Automatic Speech Recognition (ASR), or Speech-to-text (STT) is a field of study that aims to transform raw audio into a sequence of corresponding words.

Some of the speech-related tasks involve:
- speaker diarization: which speaker spoke when?
- speaker recognition: who spoke?
- spoken language understanding: what's the meaning?
- sentiment analysis: how does the speaker feel?

The classical pipeline in an ASR-powered application involves the Speech-to-text, Natural Language Processing and Text-to-speech.

![image](https://maelfabien.github.io/assets/images/asr_0.png)

ASR is not easy since there are lots of variabilities:
- acoustics:
	- variability between speakers (inter-speaker)
	- variability for the same speaker (intra-speaker)
	- noise, reverberation in the room...
- phonetics:
	- articulation
	- elisions (grouping some words, not pronouncing them)
	- words with similar pronounciation
- linguistics:
	- size of vocabulary
	- word variations
	- ...

## How is speech produced?

Let us first focus on how speech is produced. An excitation $ e $ is produced through lungs. It takes the form of an initial waveform, describes as an airflow over time.

Then, vibrations are produced by vocal cords, filters $ f $ are applied through pharynx, tongue...

![image](https://maelfabien.github.io/assets/images/asr_1.png)

The output signal produced can be written as $ s = f * e $, a convolution between the excitation and the filters. Hence, assuming $ f $ is linear and time-independent:

$$ s(t) = \int_{-\infty}^{+\infty} e(t) f(t-\tau)d \tau $$

From the initial waveform, we generate the glotal spectrum, right out of the vocal cords. A bit higher the vocal tract, at the level of the pharynx, pitches are formed and produce the formants of the vocal tract. Finally, the **output spectrum** gives us the intensity over the range of frequencies produced.

![image](https://maelfabien.github.io/assets/images/asr_2.png)

## Breaking down words

In automatic speech recognition, you do not train an Artificial Neural Network to make predictions on a set of 50'000 classes, each of them representing a word. 

In fact, you take an input sequence, and produce an output sequence. And each word is represented as a **phoneme**, a set of elementary sounds in a language based on the International Phonetic Alphabet (IPA). To learn more about linguistics and phonetic, feel free to check [this course](https://scholar.harvard.edu/files/adam/files/phonetics.ppt.pdf) from Harvard.

For example, the word "French" is written under IPA as : / f ɹ ɛ n t ʃ /. The phoneme describes the voiceness / unvoiceness as well as the position of articulators.

Phonemes are language-dependent, since the sounds produced in languages are not the same. We define a **minimal pair** as two words that differ by only one phoneme. For example, "kill" and "kiss".

For the sake of completeness, here are the consonant and vowel phonemes in standard french:

![image](https://maelfabien.github.io/assets/images/asr_3.png)

![image](https://maelfabien.github.io/assets/images/asr_4.png)

There are several ways to see a word:
- as a sequence of phonemes
- as a sequence of graphemes (mostly a written symbol representing phonemes)
- as a sequence of morphemes (meaningful morphological unit of a language that cannot be further divided) (e.g "re" + "cogni" + "tion")
- as a part-of-speech (POS) in morpho-syntax: grammatical class, e.g noun, verb, ... and flexional information, e.g singular, plural, gender...
- as a syntax describing the function of the word (subject, object...)
- as a meaning

The **vocabulary** is defined as the set of words in a specific task, a language or several languages based on the ASR system we want to build. If we have a large vocabulary, we talk about **Large vocabulary continuous speech recognition (LVCSR)**. If some words we encounter in production have never been seen in training, we talk about **Out Of Vocabulary** words (OOV). 

We distinguish 2 types of speech recognition tasks:
- isolated word recognition
- continuous speech recognition, which we will focus on

## Evaluation metrics

We usually evaluate the performance of an ASR system using Word Error Rate (WER). We take as a reference a manual transcript. We then compute the number of mistakes made by the ASR system. Mistakes might include:
- Substitutions, $N_{SUB}$,  a word gets replaced
- Insertions, $N_{INS}$, a word which was not pronounced in added 
- Deletions, $N_{DEL}$, a word is omitted from the transcript

The WER is computed as:

$$ WER = \frac{N_{SUB} + N_{INS} + N_{DEL}}{\mid N_{words-transcript} \mid} $$

The perfect WER should be as close to 0 as possible. The number of substitutions, insertions and deletions is computed using the Wagner-Fischer dynamic programming algorithm for word alignment.

# Statistical historical approach to ASR

Let us denote the optimal word sequence $ W^{\star} $ from the vocabulary. Let the input sequence of acoustic features be $ X $. Stastically, our aim is to identify the optimal sequence such that:

$$ W^{\star} = argmax_W P(W \mid X) $$

Using Bayes Rule, we can rewrite is as :

$$ W^{\star} = argmax_W \frac{P(X w\mid W) P(W)}{P(X)} $$

Finally, we suppose independence and remove the term $ P(X) $. Hence, we can re-formulate our problem as:

$$ W^{\star} = argmax_W P(X w\mid W) P(W) $$

Where:
- $ argmax_W $ is the search space, a function of the vocabulary
- $ P(X w\mid W) $ is called the acoustic model
- $ P(W) $ is called the language model

The steps are presented in the following diagram:

![image](https://maelfabien.github.io/assets/images/asr_5.png)

## Feature extraction $ X $

From the speech analysis, we should extract features $ X $ which are:
- robust across speakers
- robust against noise and channel effects
- low dimension, at equal accuracy
- non-redondant among features

Features we typically extract include:
- Mel-Frequency Cepstral Coefficients (MFCC), as desbribed [here](https://maelfabien.github.io/machinelearning/Speech9/#6-mel-frequency-cepstral-coefficients-mfcc)
- Perceptual Linear Prediction (PLP)
- ...

We should then normalize the features extracted to avoid mismatches across samples with mean and variance normalization.

## Acoustic model $ P(X \mid W) $

The acoustic model is a complex model, usually based on Hidden Markov Models and Artificial Neural Networks, modeling the relationship between the audio signal and the phonetic units in the language.

In isolated word/pattern recognition, the acoustic features (here $Y$) are used as an input to a classifier whose rose is to output the correct word. However, we take input sequence and should output sequences too when it comes to *continuous speech recognition*.

![image](https://maelfabien.github.io/assets/images/asr_6.png)

The acoustic model goes further than a simple classifier. It outputs a sequence of phonemes. 

![image](https://maelfabien.github.io/assets/images/asr_7.png)

Hidden Markov Models are natural candidates for Acoustic Models since they are great at modeling sequences. 







