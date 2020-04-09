---
published: true
title: Introduction to Bash Scripting
collection: bgd
layout: single
author_profile: true
read_time: true
categories: [bigdata]
excerpt : "Tips & Tricks"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

Bash is a scripting language used to interact with your terminal. There are few useful commands to remember in order to be able to navigate, install or remove files. This article brings a summary of the most useful ones:

## Moving directory and files location

These useful commands are useful to navigate through your files, create folders, move a file or delete it.

```
> cd  some/path/you/want/to/go  : change directory
> cd ..  : moving to the parent of the current directory
> ls : list of content in current directory
> pwd : path of the current directory
> mkdir : create a directory
> cp   : copy a file
> mv : move a file
> rm : delete a file
````

## Conditional execution

You don't always want to execute a single command, but you might want to execute two in a row, or execute one if the first failed.

```
> cd  some/path/you/want/to/go && ls : execute first statement then second statement
> rm filename || echo "Delete failed" : delete the file, but if there is an error, display "Delete failed"
````

## Execute a Python file

Often, you will need to execute Python files (.py files). In this case, all you need to do run `python` and the name of the file:

```
> pyton myfile.py
```

## Defining a variable

Defining a variable is useful when you want to define a path that is re-used often. For example, say you placed a program you downloaded in a specific folder, you could define:

```
> path="Users/myname/myprogram"
```

Then, if you want to access this path as a variable, simply execute:

```
> echo $path
```

## Reading a file

Reading a file through the terminal is useful when your file is in a format you can't open natively or relatively large. You can either use `cat`:

```
cat myfile.txt
```

Or do it iteratively:
```
< myfile.txt | while read line; do
  echo $line
done
```

## Conditions

Finally, there are cases where you need to execute a command under certain conditions. This is handled by the if-statement.

```
if mycondition; then
  echo "Statement A"
elif myothercondition; then
  echo "Statement A"
fi
```

This is a summary of the most common use cases of bash scripting for your terminal. If you would like to dig deeper, take a look at the extensive list of the useful bash commands available [here](https://devhints.io/bash).

> Don't hesitate to leave a comment and tell me what commands you use the most and why.