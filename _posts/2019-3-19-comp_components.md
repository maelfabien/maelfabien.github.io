---
published: true
title: Key Computer Components
collection: bgd
layout: single
author_profile: true
read_time: true
categories: [bigdata]
excerpt : "Parallel and Distributed Computing"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

It is essential to understand what the computer we use daily is made of, at a very high level, to understand the essence of Distributed Computing, Cloud Computing, GPUs, TPUs, and other technologies.

# I. Computer components

## Motherboard

The motherboard is the main circuit board of your computer and is also known as the mainboard or logic board. If you ever open your computer, the biggest piece of silicon you see is the motherboard. Attached to the motherboard, you'll find the CPU, ROM, memory RAM expansion slots, PCI slots, and USB ports. It also includes controllers for devices like the hard drive, DVD drive, keyboard, and mouse. The motherboard is what makes everything on your computer work together.

Each motherboard has a collection of chips and controllers known as the chipset. When new motherboards are developed, they often use new chipsets. The good news is that these boards are typically more efficient and faster than their predecessors. The bad news is that older components often do not work with new chipsets.

![image](https://maelfabien.github.io/assets/images/comp_1.jpg)

## Central Processing Unit

The CPU is the primary component of a computer that processes instructions. It runs the operating system and applications, constantly receiving input from the user or active software programs. It processes the data and produces output, which may be stored by an application or displayed on the screen.

The CPU contains at least one processor, which is the actual chip inside the CPU that performs calculations. For many years, most CPUs only had one processor, but now it is common for a single CPU to have at least two processors or "processing cores." A CPU with two processing cores is called a dual-core CPU and models with four cores are called quad-core CPUs. High-end CPUs may have six (Hexa-core) or even eight (octo-core) processors. A computer may also have more than one CPU, which each have multiple cores. For example, a server with two Hexa-core CPUs has a total of 12 processors.

![image](https://maelfabien.github.io/assets/images/comp_2.jpg)

## Graphical Processing Unit

A GPU is a processor designed to handle graphics operations. This includes both 2D and 3D calculations, though GPUs primarily excel at rendering 3D graphics.

![image](https://maelfabien.github.io/assets/images/comp_3.jpg)

***History***
Early PCs did not include GPUs, which meant the CPU had to handle all standard calculations and graphics operations. As software demands increased and graphics became more important (especially in video games), a need arose for a separate processor to render graphics. On August 31, 1999, NVIDIA introduced the first commercially available GPU for a desktop computer, called the GeForce 256. It could process 10 million polygons per second, allowing it to offload a significant amount of graphics processing from the CPU.

The success of the first graphics processing unit caused both hardware and software developers alike to quickly adopt GPU support. Motherboards were manufactured with faster PCI slots and AGP slots, designed exclusively for graphics cards, became a common option as well. Software APIs like OpenGL and Direct3D were created to help developers make use of GPUs in their programs. Today, dedicated graphics processing is standard – not just in desktop PCs – but also in laptops, smartphones, and video game consoles.

***Function***
The primary purpose of a GPU is to render 3D graphics, which are comprised of polygons. Since most polygonal transformations involve decimal numbers, GPUs are designed to perform floating-point operations (as opposed to integer calculations). This specialized design enables GPUs to render graphics more efficiently than even the fastest CPUs. Offloading graphics processing to high-powered GPUs is what makes modern gaming possible.

While GPUs excel at rendering graphics, the raw power of a GPU can also be used for other purposes. Many operating systems and software programs now support GPU or general-purpose computation on graphics processing units. Technologies like OpenCL and CUDA allow developers to utilize the GPU to assist the CPU in non-graphics computations. This can improve the overall performance of a computer or other electronic device.

## Cache Memory

Cache memory, or CPU cache, is a type of memory that services the CPU. It is faster than main memory, physically located closer to the processor, and allows the CPU to execute instructions and read and write data at a higher speed. Instructions and data are transferred from the main memory to the cache in blocks to enhance performance. Cache memory is typically static RAM (SRAM) and is identiﬁed by level. Level 1 (L1) cache is built directly into the CPU chip. Level 2 cache (L2) feeds the L1 cache. L2 can be built into the CPU chip, reside on a separate chip, or be a separate bank of chips on the system board. If L2 is built into the CPU, then a level 3 cache (L3) may also be present on the system board.

![image](https://maelfabien.github.io/assets/images/comp_4.jpg)

## RAM

Stands for "Random Access Memory». RAM is made up of small memory chips that form a memory module. These modules are installed in the RAM slots on the motherboard of your computer.

Every time you open a program, it gets loaded from the hard drive into the RAM. This is because reading data from the RAM is much faster than reading data from the hard drive. Running programs from the RAM of the computer allows them to function without any lag time. The more RAM your computer has, the more data can be loaded from the hard drive into the RAM, which can effectively speed up your computer. Adding RAM can be more beneficial to your computer's performance than upgrading the CPU.

![image](https://maelfabien.github.io/assets/images/comp_5.jpg)

## Hard Disk Drive (HDD)

The data is stored on a stack of disks that are mounted inside a solid encasement. These disks spin extremely fast (typically at either 5400 or 7200 RPM) so that data can be accessed immediately from anywhere on the drive. The data is stored on the hard drive magnetically, so it stays on the drive even after the power supply is turned off.

The term "hard drive" is short for "hard disk drive." The term "hard disk" refers to the actual disks inside the drive. However, all three of these terms are usually seen as referring to the same thing -- the place where your data is stored.

![image](https://maelfabien.github.io/assets/images/comp_6.jpg)

## Solid State Drive (SSD)

Stands for "Solid State Drive." An SSD is a type of mass storage device similar to a hard disk drive (HDD). It supports reading and writing data and maintains stored data in a permanent state even without power. Internal SSDs connect to a computer like a hard drive, using standard IDE or SATA connections.

While SSDs serve the same function as hard drives, their internal components are much different. Unlike hard drives, SSDs do not have any moving parts (which is why they are called solid-state drives). Instead of storing data on magnetic platters, SSDs store data using flash memory. Since SSDs have no moving parts, they don't have to "spin up" while in a sleep state and they don't need to move a drive head to different parts of the drive to access data. Therefore, SSDs can access data faster than HDDs.

SSDs have several other advantages over hard drives as well. For example, the read performance of a hard drive declines when data gets fragmented or split up into multiple locations on the disk. The read performance of an SSD does not diminish based on where data is stored on the drive. Therefore defragmenting an SSD is not necessary. Since SSDs do not store data magnetically, they are not susceptible to data loss due to strong magnetic fields close to the drive. Additionally, since SSDs have no moving parts, there is far less chance of a mechanical breakdown. SSDs are also lighter, quieter, and use less power than hard drives. This is why SSDs have become a popular choice for laptop computers.

![image](https://maelfabien.github.io/assets/images/comp_7.jpg)

> Conclusion: I hope this high-level overview was clear and helpful. I'd be happy to answer any question you might have in the comments section.