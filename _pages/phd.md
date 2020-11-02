---
title: Ph.D. at Idiap/EPFL on Roxanne EU Project
layout: single
permalink: /phd/
author_profile: false
header :
    image: "https://maelfabien.github.io/assets/images/phd_head.jpg"
sidebar:
    nav: sidebar-sample
---

In March 2020, I started my Ph.D. in Speech Processing at Idiap Research Institute, affiliated to EPFL. I tried to document the process, whether by describing technical concepts, or simply by writing about some projects, describing a typical day...

I'm working on [Roxanne European Project](https://roxanne-euproject.org/). ROXANNE (Real time network, text, and speaker analytics for combating organized crime) is an EU funded collaborative research and innovation project, aiming to unmask criminal networks and their members as well as to reveal the true identity of perpetrators by combining the capabilities of speech/language technologies and visual analysis with network analysis.

![image](https://maelfabien.github.io/assets/images/roxanne-framework.png)

You can learn more about the ROXANNE Project in the article I wrote on it [here](https://maelfabie
n.github.io/phd2).


<input action="action" class="button" type="button" value="Learn more about ROXANNE" onclick="window.location.href='https://maelfabien.github.io/phd2/'" />

You'll find below articles that I wrote on topics related to my Ph.D.

![image](https://maelfabien.github.io/assets/images/phd_tech.png)

# Papers

[Fundamental papers in Speaker Verification](https://maelfabien.github.io/signal/papers_speech) : A list of fundamentals papers in Speaker Verification.

# I. Maths and stats

[Linear Discriminant Analysis (LDA) and QDA](https://maelfabien.github.io/machinelearning/LDA/) : In this article, we'll cover the intuition behind LDA, when it should be used, and the maths behind it. We'll also quick cover the Quadratic version of LDA.

[EM for Gaussian Mixture Models and Hidden Markov Models](https://maelfabien.github.io/machinelearning/GMM/) : 140 detailed and visual slides on GMMs, HMMs and EM.

[Joint Factor Analysis (JFA)](https://maelfabien.github.io/machinelearning/JFA/) : Coming soon.

# II. Speech Processing

## Kaldi

[Introduction to Kaldi](https://maelfabien.github.io/signal/kaldi/): An introduction to install, understand the key features, the organization, and get you started with Kaldi.

[Kaldi for speaker verification](https://maelfabien.github.io/signal/kaldi2/): An example on how to run Kaldi for speaker verification.

## Voice Processing Fundamentals

[Introduction to Voice Processing in Python](https://maelfabien.github.io/machinelearning/Speech8/#): Summary of the book "Voice Computing with Python" with concepts, code and examples.

[Sound Feature Extraction](https://maelfabien.github.io/machinelearning/Speech9/#): An overview with a Python implementation of the different sound features to extract.

[Sound Visualization](https://maelfabien.github.io/machinelearning/Speech10/#): Dive into spectrograms, chromagrams, tempograms, spectral power density and more...

## Speaker Verification fundamentals

[The basics of Speaker Verification](https://maelfabien.github.io/machinelearning/basics_speech/): High-level overview of the speaker verification process.

[Speaker Verification using Gaussian Mixture Model (GMM-UBM)](https://maelfabien.github.io/machinelearning/Speech1/): Diving deeper in the training process of a GMM-UBM model.

[Speaker Verification using SVM-based methods](https://maelfabien.github.io/machinelearning/Speech2/#): Another method relying on Support Vector Machines for Speaker Verification.

[Speaker Verification and i-vectors](https://maelfabien.github.io/machinelearning/Speech3/#): Coming soon

[Deep Learning approach to speaker verification with X-vectors](https://maelfabien.github.io/machinelearning/Speech4/#): Coming soon

## Automatic Speech Recognition

[Introduction to Automatic Speech Recognition](https://maelfabien.github.io/machinelearning/speech_reco): What is ASR? What is the pipeline? What is acoustic modeling? 

[HMM Acoustic Modeling](https://maelfabien.github.io/machinelearning/speech_reco_1): Introduction to HMM Acoustic Modeling, context-dependent phone models, triphones...

[Neural Network Acoustic Modeling](https://maelfabien.github.io/machinelearning/speech_reco_2): Deep Neural Networks for Acoustic modeling, and introduction to hybrid HMM-DNN acoustic models

[The decoding graph](https://maelfabien.github.io/machinelearning/speech_reco_3): Problems arise in large vocabularies to decode a sequence with Viterbi. How is the language model used then? And how does it improve the search of the best sequence? Learn about the decoding graph and WFSTs.

[Speaker Adaptation](https://maelfabien.github.io/machinelearning/speech_reco_4): How can we handle the mismatch between training and test data in ASR?

[Sequence discriminative training](https://maelfabien.github.io/machinelearning/speech_reco_5): State-of-the-art methods rely on discriminative training (MMI). What changes?

[Multilingual and Low-Resource Speech Recognition](https://maelfabien.github.io/machinelearning/speech_reco_6): Diving in some methods to handle low-resource languages.

### Wav2Vec series

[Wav2Vec and Wav2Vec 2.0 tutorials](https://maelfabien.github.io/machinelearning/wav2vec): An in-depth tutorial that covers Wav2Vec and Wav2Vec 2.0 research papers and code.



# III. Network analysis

Criminal and social networks are at the core of criminal investigation. More and more data is being collected in investigation cases, and identifying who knows who and what is being said is crucial.

## Graph theory

[Introduction to Graphs](https://maelfabien.github.io/machinelearning/graph_1/) : What is a graph ? Where are graphs being used ? What are the components of a graph ?

[Graph Analysis, Erdos-Rényi, Barabasi-Albert](https://maelfabien.github.io/machinelearning/graph_2/) : In this article, we cover the two main types of graphs, and describe a first approach to graph analysis. 

[Graph Algorithms](https://maelfabien.github.io/machinelearning/graph_3/) : We'll now explore the main graph algorithms and several use cases in a visual way with direct examples in Python. 

[Graph Learning](https://maelfabien.github.io/machinelearning/graph_4/) : How can we handle missing links or missing nodes in graphs ? 

[Graph Embedding](https://maelfabien.github.io/machinelearning/graph_5/) : A practical introduction to Graph Embedding with Node2Vec and Graph2Vec.

## Criminal networks

["Disrupting Resilient criminal networks through data analysis" paper summary](https://maelfabien.github.io/machinelearning/sicilian/): A summary and data exploration of an interesting paper on criminal networks in the Sicilian MAFIA.

["Structural Analysis of Criminal Network and Predicting Hidden Links using Machine Learning" paper summary](https://maelfabien.github.io/machinelearning/mlnetwork/): Summary and discussion of a paper tackling hidden link prediction as a supervised learning problem.

["Social network analysis as a tool for criminal intelligence:understanding its potential from the perspective of intelligence analysts" paper summary](https://maelfabien.github.io/machinelearning/sn_crime/): A qualitative review on how Law Enforcement Agencies using Criminal Network Analysis tools, and my personal view on that.

[A supervised learning approach to predicting nodes betweenness-centrality in time-varying networks](https://maelfabien.github.io/machinelearning/node_pred/#): Can we predict which nodes will be central in the future? An explorative approach applied to Enron dataset with encouraging results.

# IV. When Speaker Identification meets graphs

There are really few papers linking graphs and speaker identification. Phonexia wrote [this web article](https://graphaware.com/analytics/2019/01/28/speaker-identification-meets-graphs.html) on how to leverage community detection for speaker identification. It's a good starting point. Below, I'll summarize papers that I found on this topic and ideas that I have.

["Leveraging side information for speaker identification with the Enron conversational telephone speech collection" paper summary](https://maelfabien.github.io/machinelearning/graphspeak/): A first approach of how to leverage the structure of a network to enhance speaker identification on an e-mail and call database.

["Speaker Identification Enhancement using Network Knowledge in Criminal Investigations"](https://maelfabien.github.io/assets/files/INTERSPEECH_2020_SID_Graph.pdf): Our contribution to mixing graphs and speaker identification. We introduce new metrics to measure the accuracy of a speaker identification system, a new set of criminal data and improve overall results. *Mael Fabien, Seyyed Saeed Sarfjoo, Petr Motlicek, Srikanth Madikeri*

![image](https://maelfabien.github.io/assets/images/phd_process.png)

[Submitting a first paper to ArXiv](https://maelfabien.github.io/phd/arxiv/): 1-2 details about what might not work when doing your first submission, and how to troubleshoot it.

[My Ph.D. timeline](https://maelfabien.github.io/phd/process/): A timeline recap of my Ph.D. process at Idiap.


<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"c76a8e2ec2bd989affb9a074f","lid":"4646542adb","uniqueMethods":true}) })</script>
