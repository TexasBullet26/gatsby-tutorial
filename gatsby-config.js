module.exports = {
    siteMetadata: {
        title: `Pandas Eating Lots`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options:  {
                name: "GatsbyJS",
                short_name: "GatsbyJS",
                start_url: "/",
                background_color: "#6b37bf",
                theme_color: "#6b37bf",
                display: "minimal-ui",
                icon: "src/images/icon.png",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: `UA-XXXXXXXX-X`,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-offline`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-emotion`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
    ],
}
