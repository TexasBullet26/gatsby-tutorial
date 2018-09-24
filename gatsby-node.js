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
