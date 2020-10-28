---
published: true
title: Fundamental Speech Processing Papers
layout: single
author_profile: true
read_time: true
categories: [signal]
excerpt : "Speech Processing"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

I am gathering in this article fundamental Speech Processing papers, and specifically Speaker Verification, and will provide summary of most of them over time.

# Databases

[LibriSpeech](https://maelfabien.github.io/assets/litterature/databases/librispeech.pdf): A fundamental english database based on audio-book recordings for text-independent speaker recognition.

[Speaker In The Wild](https://maelfabien.github.io/assets/litterature/databases/SITW.pdf): A large hand-annotated real-condition database for text-independent speaker recognition.

[VoxCeleb 1](https://maelfabien.github.io/assets/litterature/databases/voxceleb_1.pdf): Large amount of open-source data extracted from Youtube using Computer Vision techniques for speaker recongition and speaker diarization.

[VoxCeleb 2](https://maelfabien.github.io/assets/litterature/databases/voxceleb_2.pdf): An even larger corpus extracted with an improved pipeline.

[RSR](https://maelfabien.github.io/assets/litterature/databases/RSR.pdf): A text-dependent speaker recognition database using multiple pass phrase, in English, from Singapore.

Other famous databases include NIST Speaker Recognition Evaluation Challenge or the "Ok Google" proprietary speaker verification database.

# Speaker Verification Fundamentals

[SVM GMM-Supervector Speaker Verification](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.87.604&rep=rep1&type=pdf): A method relying on GMM-supervectors and SVM to classify speakers in Speaker Verification tasks.

[Probabilistic Linear Discriminant Analysis](https://maelfabien.github.io/assets/litterature/maths/PLDA.pdf): A key element used for dimension reduction and speaker classification.

[Front-End Factor Analysis For Speaker Verification](https://maelfabien.github.io/assets/litterature/representation/i-vector.pdf): The paper describing the i-vector feature extraction.

[X-vectors: Robust DNN Embeddings for speaker recognition](https://maelfabien.github.io/assets/litterature/representation/x_vector.pdf): Applying time-delay NN and data augmentation to create robust embeddings called x-vectors.

# Text-dependent Speaker Recognition

[DNN for small footprint text-dependent speaker verification](https://maelfabien.github.io/assets/litterature/representation/d-vector.pdf): A NN approach to feature extraction called the d-vector.

# Text-independent Speaker Recognition

[Deep Neural Network Embeddings for Text-Independent Speaker Verification](https://maelfabien.github.io/assets/litterature/representation/xvector.pdf): Learning speaker embeddings with DNN with a PDLA background. Building block of the x-vector.

# Evaluation Metrics

[Application-Independent Evaluation of Speaker Recognition Systems](https://maelfabien.github.io/assets/litterature/databases/metrics.pdf): A summary of the different speaker recognition systems used including false alarms, misses, DET-plot, EER and Detection Cost Function.

