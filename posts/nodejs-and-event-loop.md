---
title: 'Node.js and Event Loop'
date: '2020-09-08'
---

We often come across articles saying that Node.js is an event-driven platform, but what do they actually mean by this? What is event-driven programming? What makes Node.js different from the conventional servers? How does Node.js work under the hood? These were a few questions I tried to delve into when I started learning Node.js for the very first time and as I read more about it, I started getting a better background about Node.js. In this article, I'll attempt to answer all these questions in some detail based on whatever knowledge I've gained.  

## Event-Driven Programming

If you'll search this term on Google, you'll see a line saying, "Event-driven programming is a programming paradigm in which the flow of the program is determined by events such as user actions (mouse clicks, key presses), sensor outputs, or messages from other programs or threads." So basically, the flow of execution is determined by the sequence of events which occur either because of some user-interaction with the GUI like click of a button, or when you query for some result from a database. Today, this concept is largely used in GUI Applications where a mechanism is in place that listens for events and executes an action once the event occurs. Somewhat similar happens in Node.js too. So how is it any different?

## Blocking I/O and its disadvantages

In typical software systems, every system call for eg. reading/writing a file, fetching data from an API endpoint or querying a database, are all forms of blocking I/O, ie the program execution is paused and it waits for the call to finish and return a response(or result). Once the response is obtained, the program execution resumes. This is known as Blocking I/O requests and is said to be synchronous in its execution, because the thread calling the method cannot proceed forward until the method returns a response.


> Note:  Synchronous calls can be blocking or non-blocking. In this case, it's blocking.

So you might have figured out that this might lead to an issue. The more your program waits for the response before proceeding, the more costly it can be in terms of the time of execution. 

## Is there a better way to do this?

One way the developers at Apache adopted was to make the Apache servers multi-threaded, so that it would spawn a new thread per request so that the main-thread continues its execution. By using multiple threads to serve requests, it is able to serve a large number of requests with fewer system resources. Once the program execution is stopped, the thread will be put to sleep by the system but it will still consume resources. 

This is not a concern for a low number of user systems. But if you have a multi user system with a large number of users you are bound to hit the bottleneck, causing a lot of traffic! Each request will have a thread to handle them and these might be waiting for an I/O operation to be complete. So, till the task is complete the processes consume CPU and memory making it expensive. Let's see how Node.js tackled this issue!


![PicsArt_09-07-06.45.41.jpg](/images/3.jpg)

## Node.js - Single-Threaded?

Node.js takes a totally different approach to solve this problem. Node.js was created explicitly as an experiment in async processing. The theory was that doing async processing on a single thread could provide more performance and scalability under typical web loads than the typical thread-based implementation. Hence they implemented Node.js such that it serves all requests from a single thread. The program running in this thread continues being executed synchronously, however every time a system call takes place, it gets passed on to the **event loop** along with a callback function. This way, the main thread is not put to sleep and continues serving other requests. As soon as the previous call is completed, the event loop executes the callback passed earlier. This callback usually deals with the response returned from that call. Hence, the main program doesn't get blocked by the I/O operations and is said to have non-blocking I/O operations and asynchronous in its execution.


**Important Note**: *Node.js does this optimization using C++ (which has access to multiple threads internally for these tasks), which helps in reducing the execution time when used correctly. However, if you force it to be sync(ie using only the synchronous version of the API), you are binding it not to do this optimization.* 

## The Event Loop

The event loop gives Node the capability to handle highly concurrent requests simultaneously while still running “single-threaded”. Just like in any event-driven application, there's a main loop which listens for events, and then triggers a callback fucntion when one of those events is detected, similarly, Node has something called as the Event Loop. The event loop delegates I/O operations and simultaneously handles the other incoming requests and callbacks. Below diagram shows a schematic representation of how things work: 


![nodejs-event-loop.jpg](/images/4.jpg) 
`Image Source: Stack Overflow`
 
So what happens is that the event loop iterates over the event queue which is a list of completed events and callbacks. All I/O is performed asynchronously by the threads in the thread pool. **Libuv**, a component of Node.js plays a vital role in this. If an item requires an I/O the event loop passes the operation to the **thread pool**. 
A **Thread Pool** is a group of pre-instantiated, idle threads which stand ready to be given work. By maintaining a pool of threads, the model increases performance and avoids latency in execution. 

Event loop continues execution of items in the event queue. Once the I/O operation is complete and a response is returned, the callback is queued for processing. Event loop then executes the callback and then provides the desired result. This entire process keeps repeating!   

Please do not confuse this with the event loop running on a different thread than the "main thread". The event loop is your main thread, the thread that executes your javascript code! A Node.js application runs on single thread and the event loop runs on the same thread. Hence, we *usually* say Node.js is single-threaded. I used the word "usually" because there are certain predefined libraries in Node.js that are not single-threaded.

I do realize that a lot more detailed article is actually required to understand this concept, something which I too am relatively new to (^_^;), but this is an honest attempt to explain it, based on whatever I've learnt and understood, for beginners like me who have just started with Node. I hope this article gave you some insight on how Node.js works behind the scenes.

If you want a very detailed explanation, you can find one [here](https://dev.to/khaosdoctor/node-js-under-the-hood-1-getting-to-know-our-tools-1465). It's a 10-article series which will definitely help you understand Node inside out as it's equally important to know what's happening on the inside and not just the outside! 

***

Dear reader, thank you for reading this article. Do share the article if you enjoyed reading it :)