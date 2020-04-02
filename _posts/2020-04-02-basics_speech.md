---
published: true
title: Basics of Speaker Verification
collection: ml
layout: single
author_profile: false
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

Speaker biometrics is a field of Speech processing which focuses on identifying a unique speaker from several audio recorings. This can be useful for access control or suspect identification for example. Most of my understanding of this field was built from an excellent thesis, "Speaker Verification using I-vector Features" by Ahilan Kanagasundaram from Queensland University of Technology, and from the APSIPA Talk : "Speaker Verification - The present and future of voiceprint based security".

<script type="text/javascript" async
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# What can you extract from speech?

Linguistic features, carrying message and language information:
- What is being said?
- What language is spoken? 

Paralinguistic features, carrying emotional and physiological characteristics:
- **Who is speaking?**
- With what accent?
- Gender of the speaker
- Age of the speaker
- Emotion:
	- Stress level
	- Cognitive load level
	- Depression level
	- Spleepiness detection
	- Is the person inebriated

# Overview of Speaker Recognition

Speaker biometrics/recognition is split into:
- *Speaker identification*: determine an unknown speaker's identify among a group of speakers. We take the audio of the unknown speaker, compare it to the models of all enrolled speakers, and determine the best-matching speaker.
- *Speaker verification*: verify the claimed identity of a person through speech signal. We compare the audio sample provided with the claimed speaker model, and decide to accept or reject.
- *Speaker diarization*: partition an audio input stream into segments according to the speaker identity.

![image](https://maelfabien.github.io/assets/images/bs_0.png)

Speaker verification is used in access security, transaction authentification and in suspect identification mainly, and is therefore the most commonly studied problem. This field has been an active field of research since the 1950s. 

# Overview of Speaker Verification Pipeline

![image](https://maelfabien.github.io/assets/images/bs_1.png)

Speaker verification aims at determining whether the identity of the speaker matches the claimed identify, and requires typically 1 comparison. On the other hand, speaker identification among a group of size N requires N comparisons.

The main steps when running a Speaker Verification pipeline are the following:
- extract features from the audio in what is called the Front End
- compare those features to a speaker model in the Back End
- make decision based on the output

The main known issues in this field of research are:
- the amount of data needed
- the mismatch between the training data (enrolment) and the testing data (verification), since the channel might change (silent room vs noisy phone environment)

There are 2 types of speaker verification techniques:
- *Text-dependent*: the speaker must pronounce a known word or phrase. In such case, short training data are enough.
- *Text-independent*: users are not restricted to say anything specific. In such cas, the training data must be sufficiently long, but the solution is more flexible.

A common example of text-dependant speaker verification would be the "Hey Siri" of most iPhones now. The phrase to pronounce is known in advance, and we must verify the identity of the person. Once the identity has been verified, a Speech-to-Text pipeline translates what the user pronounced into a query.

The main steps of speaker verification are:
- *Development*: learn speaker-idenpendent models using large amount of data. This is a pre-training part, called a Universal Background Model (UBM). It can be gender-specific, in the sense that we have 1 for Males, and 1 for Females.
- *Enrollment*: learn distinct characteristics of a speaker's voice. This step typically creates one model per unique speaker considered. This is the training part. 
- *Verification*: distinct characteristics of a claimant's voice are compared with previously enrolled claimed speaker models. This is the prediction part.

The difference between the training and testing data might come from:
- the microphones
- the environment
- the transmission channel (landdline, VoIP...)
- the speaker himself

The decision process in classic Speaker Verification systems simply compares the likelihood that a speaker comes from the specific model and the likelihood that the speaker comes from the Universal Background model:

![image](https://maelfabien.github.io/assets/images/bs_2.png)

We call this ratio, the *likelihood ratio*. If the ratio is above the decision threshold, it is more likely that the sample comes from the specific speaker and we therefore accept the identity. Otherwise, we reject it. Note that the UBM might be gender-specific.

# Steps

## Speech acquisition

Speech acquisition is done through Voice Activity Detection (VAD). Two common approaches are Gaussian-based and Energy-based VAD. The aim of a VAD is to aquire speech only when it occurs.

The main steps behin building a VAD are:
- Break audio signal into frames
- Extract features from each frame
- Train a classifier on a known set of speech and silence frames
- Classify unseen frames as speech or silence

But this will be the topic of another article. VAD performs well on audio with relatively low signal-to-noice ratio (SNR), a ratio which compares the level of a desired signal to the level of background noise.

## Feature extraction

Once we can efficiently acquire a speech signal, we should extract features from the signal to convert the raw signal into a sequence of acoustic feature vectures which we will use to identify the speaker. 

A common choice for the features to extract from the signal is the Mel Frequency Cepstral Coefficients (MFCC). These features are derived from Fast Fourier Transform. There are several steps and options for extracting MFCC features, both in time and frequency domains, but again, I'll dive deeper into this topic in another article.

## A note on Gaussian Mixture Models

For the next sections, we will need to introduce Gaussian Mixture Models (GMMs). A GMM is a weighted sum of M components Gaussian densities.

A density of a Gaussian can be defined as:

$$ P(x \mid \lambda) = \sum_{k=1}^M w_k \times g(x \mid \mu_k, \Sigma_k) $$

Where:
- $ x $ is a D-dimensional feature vector
- $ w_k, k = 1, 2, ..., M $ is the mixture weights
- $ \mu_k, k = 1, 2, ..., M $ is mean of each Gaussian
- $ \Sigma_k, k = 1, 2, ..., M $ is the covariance of each Gaussian
- $ g(x \mid \mu_k, \Sigma_k) $ are the Gaussian densities such that:

$$ g(x \mid \mu_k, \Sigma_k) = \frac{1}{(2 \pi)^{\frac{D}{2}} {\mid \Sigma_k \mid}^{\frac{1}{2}}} exp^{ - \frac{1}{2}(x - \mu_k)^T \Sigma_k^{-1} (x-\mu_k)} $$

The parameters of the GMM are therefore : $$ \lambda = (w_k, \mu_k, \Sigma_k), k = 1, 2, 3, ..., M $$.

How do we solve GMM? Using Expectation-Maximization (EM) algorithm. EM algorithm is an interative algorithm which, at each steap, tries to update the parameters in order to maximize the likelihood, and eventually finds the maximum likelihood.

Formally, EM algorithm iterative update of the parameters should lead to :

$$ \prod_{n=1}^N P(x_n \mid \lambda) ≥ \prod_{n=1}^N P(x_n \mid \lambda^{old}) $$. The maximization problem of the EM algorithm is in fact:

$$ Q(\lambda, \lambda^{old}) = \sum_{n=1}^N \sum_{k = 1}^M P(k \mid x_n) \log w_k g(x_n \mid \mu_k, \sigma_k)$$

Where :

$$ P(k \mid x) = \frac{w_k g(x \mid \mu_k, \Sigma_k)}{P(x \mid \lambda^{old})} $$.

The starting parameters are usually identified by k-means approach. That being said, let's get back to the steps of our speaker verification model.

### Universal Background Model : Development

The next step, once we extracted the features, is to train a universal background model (UBM). We train such algorithm because there is typically not enough data available to train the speaker models.

A UBM is a high-order Gaussian Mixture Model trained on a large quantity of speech, from a wide population. This step is used to learn speaker-independent distribution of features.

### Speaker Enrolment

The last step before the verification is to perform the speaker enrolement. The aim is still to train a Gaussian Mixture Model on the extracted features. GMMs are typically solved iteratively by an Expectation Maximization (EM) algorithm, an algorithm which tries to maximize the likelihood of the training data by adjusting the parameters of the GMM.

The issue is always to initialize the parameters of the GMM the right way. Since we pre-trained a GMM in the development step, we simply start the EM algorithm with the parameters learned by the UBM.

Through this step, we only adapt the mean, and not the covariance, since updating the covariance does not improve the performance.

For the mean to update, we perform a *maximum a posteriori adaptation* :

$$ \mu_k^{MAP} = \alpha_k \mu_k + (1 - \alpha_k) \mu_k^{UBM} $$

Where :
- $ \alpha_k = \frac{n_k}{n_k + \tau_k} $ is the mean adaptation coefficient
- $ n_k $ is the count for the adaptation data
- $ \tau_k $ is the relevance factor, between 8 and 32

### Speaker Verification

The Speaker Verification is finally computed using the likelihood ratio, since GMM is a generative model.

We test the following underlying hypothesis:
- $ H_0 $ : Sample X belongs to claimed speaker s
- $ H_1 $ : Sample X does not belong to claimedd speaker s

The likelihood ratio is then defined as :

$$ S(X) = \frac{P(X \mid H_0)} {P(X \mid H_1)} $$

We compare this ratio to a threshold, and if it is greater than the defined threshold, we accept that the sample X belongs to the claimed speaker s.

# Limits of GMM-UBM

Nowadays, GMM-UBM are not state-of-the-art approaches anymore. Indeed, it requires too much training data in general. Better performing approaches have been developed such as :
- SVM-based methods
- I-vector methods
- Deep-learning based methods


