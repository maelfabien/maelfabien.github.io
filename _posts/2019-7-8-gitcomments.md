---
published: true
title: NLP on GitHub comments
collection: dl
layout: single
author_profile: true
read_time: true
categories: [project]
header :
    teaser: "https://maelfabien.github.io/assets/images/project_14.png"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

The dataset I am using in this project (`github_comments.tsv`) that carries 4000 comments that were published on pull requests on Github by developer teams.

Here is an explanation of the table columns:
- Comment: the comment made by a developer on the pull request.
- Comment_date: date at which the comment was published
- Is_merged: shows whether the pull request on which the comment was made has been accepted (therefore merged) or rejected.
- Merged_at: date at which the pull request was merged (if accepted).
- Request_changes: each comment is labelled either 1 or 0: if it’s labelled as 1 if the comment is a request for change in the code. If not, it’s labelled as 0.

The GitHub of the project can be found here :

<div class="github-card" data-github="maelfabien/Analyze-Github-Pull-Requests" data-width="100%" data-height="" data-theme="default"></div>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>

The goal is to dig deeper into the nature of blockers and analyze the requests for change. If possible, try to answer the following questions:
- What are the most common problems that appear in these comments?
- Can we cluster the problems by topic/problem type?
- How long is the resolution time after a change was requested?

## Content
- Report.pdf is a PDF report that details my approach.
- images is a collection of the images that I included in my report
- TopicModelling.ipynb is a Jupyter Notebook in which I have do my analysis in Python
- corpus.pkl, dictionary.gensim, and all files starting with model… are files generated in the notebook that I use to avoid re-running some steps.

## Theory covered
This project covers the concepts of :
- Topic Modelling using LDA
- Clustering through tf-idf and BoW 
- Dimension reduction through t-SNE and truncated SVD
- Classification and Regression algorithms

<embed src="https://maelfabien.github.io/assets/images/Report.pdf" type="application/pdf" width="600px" height="500px" />
