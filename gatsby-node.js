const { createFilePath } = require(`gatsby-source-filesystem`)

/* function handles finding the parent `File` node along with creating the slug */
/* Add new slugs directly onto `MarkdownRemark` nodes. To do so, you'll use a function 
 *   passed to our API implementation called `createNodeField`. This function allows 
 *   you to create additional fields on nodes created by other plugins. Only the original 
 *   creator of a node can directly modify a node -- all other plugins (including your gatsby-node.js)
 *   must use this function to create additional fields.
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

/* Adds an implementation of the `createPages` API which Gatsby calls so plugins 
 * can add pages. The steps to programmatically creating pages are: 
 *   1. Query data with GraphQL
 *   2. Map the query results to pages
 * The code below is the first step for creating pages from your markdown as you're 
 * using the supplied `graphql` function to query the markdown slugs you created. 
 * Then you're logging out the result of the query. 
 */
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
            console.log(JSON.stringify(result, null, 4))
            resolve()
        })
    })
}
