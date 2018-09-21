# Tutorial Part Four (Querying for data in a blog)

### Recap of first half of tutorial

So far, we've been learning how to use React.js--how powerful it is to be able to create your own components to act as custom building blocks for websites.

We've also explored styling components using CSS Modules.

### What's in this tutorial?

In the next four parts of the tutorial, we'll be diving into the Gatsby data layer.

**Gatsby data layer**: a powerful feature of Gatsby that lets you eaily build sites from Markdown, WordPress, headless CMSs, and other data sources of all flavors.

**NOTE:** Gatsby's data layer is powered by GraphQL. For an in-depth tutorial on GraphQL, we recommend [**How to GraphQL**](https://www.howtographql.com/).

### Data in Gatsby

A website has four parts: HTML, CSS, JS, and data. The first half of the tutorial focused on the first three. Let's learn now how to use data in Gatsby sites.

What is data?

Data is things like `"strings"`, integers (`42`), objects (`{ pizza: true }`), etc.

For the purpose of working in Gatsby, however, a more useful answer is "data is everything that lives outside a React component".

So far, we've been writing text and adding images _directly_ in components. Which is an _excellent_ way to build many websites. But, often you want to store data _outside_ components and then bring the data _into_ the component as needed.

For example, if you're building a site with WordPress (so other contributors have a nice interface for adding & maintaining content) and Gatsby, the _data_ for the site (pages and posts) are in WordPress and you _pull_ that data, as needed, into your components.

Data can also live in file types like Markdown, CSV, etc. as well as databases and APIs of all sorts.

**Gatsby's data layer lets you pull data from these (and any other source) directly into your components**--in the shape and form you want.

### How Gatsby's data layer used GraphQL to pull data into components

There are many options for loading data into React components. One of the most popular and powerful of these is a technology called [**GraphQL**](http://graphql.org/).

GraphQL was invented at Facebook to help product engineers _pull_ needed data into components.

GraphQL is a **q**uery **l**anguage (the _QL_ part of its name). If you're familier with SQL, it works in a very similar way. Using a special syntax, you describe the data you want in your component and then that data is given to you.

Gatsby uses GraphQL to enable components to declare the data they need.
