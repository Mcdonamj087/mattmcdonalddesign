import type {GatsbyConfig} from 'gatsby';
import postcssCustomMedia from 'postcss-custom-media';

const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  siteMetadata: {
    title: `Matt McDonald Design`,
    siteUrl: `https://www.mattmcdonalddesign.com`,
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: 'vlmy7p93',
        dataset: `production`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/assets/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('postcss-hexrgba'),
          require('postcss-nested'),
          postcssCustomMedia({
            importFrom: './src/styles/global/custom-media.css', // => @custom-selector --small-viewport (max-width: 30em);
          }),
        ],
      },
    },
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: 'IBM Plex Sans',
            file: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap',
          },
        ],
        custom: [
          {
            name: ['Gilroy'],
            file: '/fonts/gilroy.css',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/assets/svg/favicon.svg`,
        name: `the DONUT`,
        short_name: `the DONUT`,
        start_url: `/`,
        background_color: `#1A1418`,
        theme_color: `#1A1418`,
        display: `standalone`,
      },
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;
