// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OneStream Solution Exchange Documentation',
  tagline: "Maximize Business Impact With OneStream's Intelligent Finance Platform",
  favicon: 'img/favicon.ico',
  url: 'https://your-docusaurus-site.example.com',  // Set the production url of your site here
  baseUrl: '/',   // Set the /<baseUrl>/ pathname under which your site is served

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          // sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Solution Exchange Documentation',
        logo: {
          alt: 'OneStream Logo',
          src: 'img/logo.svg',
        },
        items: [
          // Uncomment this to enable the docs version dropdown
          // {
          //   type: 'docsVersionDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://onestream.com/',
            label: 'onestream.com',
            position: 'right',
          },
          {
            href: 'https://solutionexchange.onestream.com/',
            label: 'Solution Exchange',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Check us out on social media',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/OneStreamSoftware/about/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/OneStream_Soft',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/onestream-software/',
              },
            ],
          },
          {
            title: 'Learn More',
            items: [
              {
                label: 'Navigator',
                href: 'https://onestream.thoughtindustries.com/learn/dashboard',
              },
              {
                label: 'OneStream Community',
                href: 'https://www.onestream.com/onestream-community/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OneStream Software LLC. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
