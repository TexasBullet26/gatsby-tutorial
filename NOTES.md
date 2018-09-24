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

### Use a StaticQuery

StaticQuery is a new API introduced in Gatsby v2 that allows non-page components (like our `layout.js` component), to retrieve data via GraphQL queries.

Go ahead and add a `<StaticQuery/>` to your `src/components/layout.js` file, and a `{data.site.siteMetadata.title}` reference that uses this data. When you are done your file looks like this:

```javascript
import React from 'react';
import { css } from 'react-emotion';
import { StaticQuery, Link, graphql } from 'gatsby';

import { rhythm } from '../utils/typography';

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div
        className={css`
          margin: 0 auto;
          max-width: 700px;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1.5)};
        `}
      >
        <Link to={`/`}>
          <h3
            className={css`
              margin-bottom: ${rhythm(2)};
              display: inline-block;
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <Link
          to={`/about/`}
          className={css`
            float: right;
          `}
        >
          About
        </Link>
        {children}
      </div>
    )}
  />
);
```

But let’s restore the real title.

One of the core principles of Gatsby is that _creators need an immediate connection to what they’re creating_ (hat tip to Bret Victor). In other words, when you make any change to code you should immediately see the effect of that change. You manipulate an input of Gatsby and you see the new output showing up on the screen.

So almost everywhere, changes you make will immediately take effect. Edit the `gatsby-config.js` file again, this time changing the `title` back to “Pandas Eating Lots”. The change should show up very quickly in your site pages.

### What's coming next?

Next, you’ll be learning about how to pull data into your Gatsby site using GraphQL with source plugins in part five of the tutorial.

# Source plugins

> This tutorial is part of a series about Gatsby's data layer. Make sure you've gone through part 4 before continuing here.

### What's in this tutorial?

In this tutorial, you’ll be learning about how to pull data into your Gatsby site using GraphQL and source plugins. Before you learn about these plugins, however, you’ll want to know how to use something called GraphiQL, a tool that helps you structure your queries correctly.

### Introducing GraphiQL

GraphiQL is the GraphQL integrated development environment (IDE). It’s a powerful (and all-around awesome) tool you’ll use often while building Gatsby websites.

You can access it when your site’s development server is running—normally at [http://localhost:8000/\_\_\_graphql.](http://localhost:8000/___graphql)

[](https://www.gatsbyjs.org/graphiql-explore.mp4)

Here you poke around the built-in `Site` “type” and see what fields are available on it—including the `siteMetadata` object you queried earlier. Try opening GraphiQL and play with your data! Press `Ctrl + Space` to bring up the autocomplete window and `Ctrl + Enter` to run the GraphQL query. You’ll be using GraphiQL a lot more through the remainder of the tutorial.

### Source plugins

Data in Gatsby sites can come from anywhere: APIs, databases, CMSs, local files, etc.

Source plugins fetch data from their source. E.g. the filesystem source plugin knows how to fetch data from the file system. The WordPress plugin knows how to fetch data from the WordPress API.

Let’s add `gatsby-source-filesystem` and explore how it works.

First install the plugin at the root of the project:

```sh
npm install --save gatsby-source-filesystem
```

Then add it to your `gatsby-config.js`:

```javascript
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
```

Save that and restart the gatsby development server. Then open up GraphiQL again.

If you bring up the autocomplete window, you’ll see:

[#image](https://www.gatsbyjs.org/static/graphiql-filesystem-58fd47743994afe6ec4c714a53453695-5b1c4.png)

Hit `Enter` on `allFile` then type `Ctrl + Enter` to run a query.

[#image](https://www.gatsbyjs.org/static/filesystem-query-c3247954e5e0325032e945f847611d92-f35d4.png)

Delete the `id` from the query and bring up the autocomplete again (`Ctrl + Space`).

[#image](https://www.gatsbyjs.org/static/filesystem-autocomplete-2962bc394bc6ed177276cde5db5ce6b1-f35d4.png)

Try adding a number of fields to your query, pressing `Ctrl + Enter` each time to re-run the query. You’ll see something like this:

[#image](https://www.gatsbyjs.org/static/allfile-query-b48a3d23278afabbd368b1c2634c73f3-f35d4.png)

The result is an array of File “nodes” (node is a fancy name for an object in a “graph”). Each File object has the fields you queried for.

### Build a page with a GraphQL query

Building new pages with Gatsby often starts in GraphiQL. You first sketch out the data query by playing in GraphiQL then copy this to a React page component to start building the UI.

Let’s try this.

Create a new file at `src/pages/my-files.js` with the `allFile` GraphQL query you just created:

```javascript
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <div>Hello world</div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
```

The `console.log(data)` line is highlighted above. It’s often helpful when creating a new component to console out the data you’re getting from the GraphQL query so you can explore the data in your browser console while building the UI.

If you visit the new page at `/my-files/` and open up your browser console you will see something like:

[](https://www.gatsbyjs.org/static/data-in-console-3fd681a2f33d483a82d067b07704f7e5-90960.png)

The shape of the data matches the shape of the GraphQL query.

Let’s add some code to your component to print out the File data.

```javascript
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>

        <table>
          <thead>
            <tr>
              <th>relativePath</th>

              <th>prettySize</th>

              <th>extension</th>

              <th>birthTime</th>
            </tr>
          </thead>

          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>

                <td>{node.prettySize}</td>

                <td>{node.extension}</td>

                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
```

### What's coming next?

Now you’ve learned how source plugins bring data into Gatsby’s data system. In the next tutorial, you’ll learn how transformer plugins transform the raw content brought by source plugins. The combination of source plugins and transformer plugins can handle all data sourcing and data transformation you might need when building a Gatsby site. Click here for the [next tutorial to learn about transformer plugins.](https://www.gatsbyjs.org/tutorial/part-six/)

# Tutorial part seven (Programmatically create pages from data)

### What's in this tutorial?

In the previous tutorial, you created a nice index page that queries markdown files and produces a list of blog post titles and excerpts. But you don’t want to just see excerpts, you want actual pages for your markdown files.

You could continue to create pages by placing React components in `src/pages`. However, you’ll now learn how to _programmatically_ create pages from _data_. Gatsby is _not_ limited to making pages from files like many static site generators. Gatsby lets you use GraphQL to query your _data_ and _map_ the query results to _pages_—all at build time. This is a really powerful idea. You’ll be exploring its implications and ways to use it for the remainder of this part of the tutorial.

Let’s get started.

### Creating slugs for pages

Creating new pages has two steps:

1. Generate the “path” or “slug” for the page.
2. Create the page.

**Note:** _Often data sources will directly provide a slug or pathname for content — when working with one of those systems (e.g. a CMS), you don’t need to create the slugs yourself like you do with markdown files._

To create your markdown pages, you’ll learn to use two Gatsby APIs `onCreateNode` and `createPages`. These are two workhorse APIs you’ll see used in many sites and plugins.

We do our best to make Gatsby APIs simple to implement. To implement an API, you export a function with the name of the API from `gatsby-node.js`.

So let’s do that. In the root of your site, create a file named `gatsby-node.js`. Then add the following.

```javascript
exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type);
};
```

This `onCreateNode` function will be called by Gatsby whenever a new node is created (or updated).

Stop and restart the development server. As you do, you’ll see quite a few newly created nodes get logged to the terminal console.

Let’s use this API to add the slugs for your markdown pages to `MarkdownRemark` nodes.

Change your function so it now only logs `MarkdownRemark` nodes.

```javascript
exports.onCreateNode = ({ node }) => (
  if (node.internal.type === `MarkdownRemark`) {
    console.log(node.internal.type)
  }
)
```

You want to use each markdown file name to create the page slug. So `pandas-and-bananas.md` will become `/pandas-and-bananas/`. But how do you get the file name from the `MarkdownRemark` node? To get it, you need to traverse the “node graph” to its parent `File` node, as `File` nodes contain data you need about files on disk. To do that, modify your function again:

```javascript
exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    console.log(`\n`, fileNode.relativePath);
  }
};
```

There in your terminal you should see the relative paths for your two markdown files.

Now let’s create slugs. As the logic for creating slugs from file names can get tricky, the `gatsby-source-filesystem` plugin ships with a function for creating slugs. Let’s use that.

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode, basePath: `pages` }));
  }
};
```

The function handles finding the parent `File` node along with creating the slug. Run the development server again and you should see logged to the terminal two slugs, one for each markdown file.

Now let’s add your new slugs directly onto the `MarkdownRemark` nodes. This is powerful, as any data you add to nodes is available to query later with GraphQL. So it’ll be easy to get the slug when it comes time to create the pages.

To do so, you’ll use a function passed to our API implementation called `createNodeField`. This function allows you to create additional fields on nodes created by other plugins. Only the original creator of a node can directly modify the node—all other plugins (including your `gatsby-node.js`) must use this function to create additional fields.

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
```

Restart the development server and open or refresh GraphiQL. Then run this GraphQL query to see your new slugs.

```javascript
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

Now that the slugs are created, you can create the pages.

### Creating pages

In the same `gatsby-node.js` file, addd the following:

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      console.log(JSON.stringify(result, null, 4));
      resolve();
    });
  });
};
```

You’ve added an implementation of the `createPages` API which Gatsby calls so plugins can add pages.

As mentioned in the intro to this part of the tutorial, the steps to programmatically creating pages are:

1. Query data with GraphQL
2. Map the query results to pages

The above code is the first step for creating pages from your markdown as you’re using the supplied `graphql` function to query the markdown slugs you created. Then you’re logging out the result of the query.

You need one additional thing beyond a slug to create pages: a page template component. Like everything in Gatsby, programmatic pages are powered by React components. When creating a page, you need to specify which component to use.

Create a directory at `src/templates` and then add the following in a file named `src/templates/blog-post.js`.

```javascript
import React from 'react';
import Layout from '../components/layout';

export default () => {
  return (
    <Layout>
      <div>Hello blog post</div>
    </Layout>
  );
};
```

Then update `gatsby-node.js`

```javascript
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};
```

Restart the development server and your pages will be created! An easy way to find new pages you create while developing is to go to a random path where Gatsby will helpfully show you a list of pages on the site.

Which is a bit boring and not what you want. Let’s pull in data from your markdown post. Change `src/templates/blog-post.js` to:

```javascript
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
```

The last step is to link to your new pages from the index page.

Return to `src/pages/index.js` and let’s query for your markdown slugs and create links.

```javascript
import React from 'react';
import { css } from 'react-emotion';
import { Link, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1
          className={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              className={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                className={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{' '}
                <span
                  className={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
```

And there you go! A working, albeit small, blog!

### Challenge

Try playing more with the site. Try adding some more markdown files. Explore querying other data from the `MarkdownRemark` nodes and adding them to the frontpage or blog posts pages.

In this part of the tutorial, we've learned the foundations of building with Gatsby's data layer. You've learned how to _source_ and _transform_ data using plugins. How to use GraphQL to _map_ data to pages. Then how to build _page template components_ where you query for data for each page.

### What's coming next?

Now that we've built a Gatsby site, where do we go next?

- Share your Gatsby site on Twitter and see what other people have created by searching for #gatsbytutorial! Make sure to mention @gatsbyjs in your Tweet, and include the hashtag #gatsbytutorial :)

- You could take a look at some [example sites](https://github.com/gatsbyjs/gatsby/tree/master/examples#gatsby-example-websites)

- Explore more [plugins](https://www.gatsbyjs.org/docs/plugins/)

- See what [other people are building with Gatsby](https://github.com/gatsbyjs/gatsby/#showcase)

- Check out the documentation on [Gatsby's APIs](https://www.gatsbyjs.org/docs/api-specification/), [nodes](https://www.gatsbyjs.org/docs/node-interface/) or [GraphQL](https://www.gatsbyjs.org/docs/graphql-reference/)