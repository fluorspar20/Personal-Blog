---
title: 'What is React Virtual DOM?'
date: '2020-09-02'
---

If you are working with React or have ever used React in your projects, you might have come across the term **React Virtual DOM** quite often. In this blog, I'll talk a bit about what Virtual DOM is and why did developers at Facebook employ such a concept while creating React.  

### What is DOM?

Document Object Model or DOM is a tree structure of various elements. It's an API for HTML and XML documents and defines the way a document is accessed and manipulated. Everytime there is a change in the state of your application UI, the DOM gets updated to represent that change. However, frequently manipulating the DOM affects performance since it has to continuously re-rendered to update the application, making it slow. This slowness is made worse by the fact that most JS frameworks update the DOM much more than they actually should.

<img style='margin: 0 auto;' src='/images/1.jpg' height='400' width='300'>

### Enter React, the virtual DOM

To address the above issue, React popularized something called the Virtual DOM. The virtual DOM is only a virtual representation of the actual DOM. For every DOM object, there is a corresponding Virtual DOM object. Everytime the state of our application changes, the virtual DOM gets updated instead of the real DOM. A virtual DOM object had the same properties as the real DOM object, although it lacks the ability to directly change what's displayed on the screen. Also, manipulating virtual DOM is much faster than manipulating the real DOM.

<img style='margin: 0 auto;' src='/images/2.jpg' >

### How is virtual DOM faster?🤔

When virtual DOM gets updated, React compares it with a virtual DOM snapshot that was taken right before the update. It then compares the new virtual DOM with the previous virtual DOM and figures out which objects have changed. This is called **diffing**. Once React knows which virtual DOM objects have changed, it updates only those objects on the real DOM and other elements don't get updated as opposed to what the real DOM normally does. This is how virtual DOM works behind the scenes, making it much faster!


If you found this insightful, share it with others as well!
