const { createFilePath } = require(`gatsby-source-filesystem`)

/* function handles finding the parent `File` node along with creating the slug */
exports.onCreateNode = ({ node, getNode }) => {
    if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        console.log(createFilePath({ node, getNode, basePath: `pages` }))
    }
}
