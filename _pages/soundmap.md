---
layout: archive
permalink: /soundmap/
title: Wanago
author_profile: false
classes: wide
header :
    image: "https://maelfabien.github.io/assets/images/soundmap_head.png"
    teaser : "https://maelfabien.github.io/assets/images/proj_25.jpg"
---

My team recently won the [International Create Challenge](https://www.createchallenge.org/) (ICC) in Martigny. We won both the AI 1st prize and the AI healthcare award for a total of 7'000 CHF, with a project called SoundMap. We made a small website that explains the solution: http://soundmap.io/

# What is SoundMap

SoundMap is a smart wearable belt, equipped with a camera, able to provide real-time information on the surrounding environment of a person through Audio Augmented Reality (Audio AR).

Similarly to the way we easily identify the position of whistling birds, we aim to scan in real-time the surrounding environment and produce directional sounds (through audio AR) in the earphones connected to the device. Blind and visually impaired people are, therefore, able to map and understand their environment.

We aim to improve this prototype over the course of the next months, and we are looking for interested partners (universities, associations, blind or visually impaired).

![](https://maelfabien.github.io/assets/images/soundmap1.jpg)

![](https://maelfabien.github.io/assets/images/soundmap2.jpg)

# Demonstration

Here's a small demonstration of the device when trying to locate people in a room. The person had no prior information on the number of persons to find and their position. 

<iframe width="700" height="500" src="https://www.youtube.com/embed/854VI5L5lfE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

# How does it work?

## 1. Object Recognition

Our object recognition technologies relies on deep-learning to identify more than 20 classes of objects like chairs, tables, benches, bikes, cars... We process the images in real-time, up to 25 frames per second, using optimized hardware, a Raspberry Pi, and a simple camera. We estimate distance of objects, and their direction.

![](https://maelfabien.github.io/assets/images/soundmap3.jpg)

## 2. Sound Map creation

Based on the detected objects, their angle and their distance, we generate a specific type of sound for each object. Each object is then given a sound, and the sound is played in the corresponding direction, with a volume that corresponds to the distance of the object.

![](https://maelfabien.github.io/assets/images/soundmap4.jpg)

## 3. Change of scene detection

As soon as the scene observed by the camera has changed, a new scanning of the environment is triggered and the user can locate the surrounding objects again.

# Why we built this?

285 million of people in the world are blind or visually impaired, among which 39 million people are blind. In Switzerland, 20% of the elder suffer from visual impairment.

The world is full of environment understanding softwares, but this softwares are mostly made for autonomous vehicles and robotics. We want to bring these technologies to blind and visually impaired people.

# Working with us

We are interested in working with associations for blind and visually impaired people, but also with hospitals and research centers, to collaborate on research projects, and improve the product. Also, if you or someone from you family is visually impaired, and would like to test the product, just send us an [email](mailto:mael.fabien@gmail.com?subject=[SoundMap]%20Question%20From%20Blog)