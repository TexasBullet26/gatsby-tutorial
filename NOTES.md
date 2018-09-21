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

### Create a new example site

Let's create another new site for this part of the tutorial. You're going to build a Markdown blog called "Pandas Eating Lots". It's dedicated to showing off the best pictures and videos of pandas eating lots of food. Along the way you'll by dipping your toes into GraphQL and Gatsby's Markdown support.

Create a new Gatsby site:

`gatsby new tutorial-part-four https://github.com/gatsbyjs/gatsby-starter-hello-world`

Then install some other needed dependencies at the root of the project. You'll use the Typography theme "Kirkham", and you'll try out a CSS-in-JS library [**Emotion**](https://emotion.sh/):

`npm install --save gatsby-plugin-typography typography react-typography typography-theme-kirkham gatsby-plugin-emotion emotion react-emotion emotion-server`

Let's set up a site similar to what you ended with in Part Three. This site will have a layout component and two page components:

`src/components/layout.js`

`src/pages/index.js`

`src/pages/about.js`

`src/utils/typography.js`

`gatsby-config.js`

Add the above files and then run `gatsby develop`.

Now let's start querying.

### Your first GraphQL query

When building sites, you'll probably want to reuse common bits of data -- like the _site title_ for example. Look at the `/about/` page. You'll notice that you have the site title (`Pandas Eating Lots`) in both the layout component (the site header) as well as in the `<h1/>` of the `about.js` page (the page header).

But what if you want to change the site title in the future? You'd have to search for the title across all your components and edit each instance. This is both cumbersome and error-prone, especially for larger, more complex sites. Instead, you can store the title in one location and reference that location from other files; Change the title in a single place, and Gatsby will _pull_ your updated title into files that reference it.

The place for these common bits of data is the `siteMetadata` object in the `gatsby-config.js` file. Let's add your site title to the `gatsby-config.js` file:

```javascript
module.exports = {
  siteMetadata: {
    title: `Title from siteMetadata`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography,
      },
    },
  ],
}
```

Restart the development server.

### Use a page query

Now the site title is available to be queried; Let's add it to the `about.js` file using a [**page query:**](https://www.gatsbyjs.org/docs/page-query)

```javascript
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
```

The basic GraphQL query that retrieves the `title` in our `layout.js` changes above is:

```javascript
{
  site {
    siteMetadata {
      title
    }
  }
}
```

> In [**part five**](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql) we'll meet a tool that lets us interactively explore the data available through GraphQL, and help formulate queries like the one above.

Page queries live outside of the component definition -- by convention at the end of a page component file -- and are only available on page components.
