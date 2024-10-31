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

  // colorMode: {
  //   defaultMode: 'light',
  //   disableSwitch: true,
  //   respectPrefersColorScheme: false,
  // }
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
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          // sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // Will be passed to @docusaurus/plugin-content-blog (false to disable)
        blog: false,
        // Will be passed to @docusaurus/plugin-content-pages (false to disable)
        pages: {},
        // Will be passed to @docusaurus/plugin-sitemap (false to disable)
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
        // Will be passed to @docusaurus/plugin-google-gtag (only enabled when explicitly specified)
        gtag: false,
        // Will be passed to @docusaurus/plugin-google-tag-manager (only enabled when explicitly specified)
        googleTagManager: false,
        // DEPRECATED: Will be passed to @docusaurus/plugin-google-analytics (only enabled when explicitly specified)
        googleAnalytics: false,
      }),
    ],
  ],

  plugins: [
    [
    // '@docusaurus/plugin-content-docs'
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1032, // max resized image's size.
        min: 640, // min resized image's size.
        steps: 2, // the max number of images generated between min and
        disableInDev: false, // disable the plugin in development mode
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light', // "light" | "dark"
        disableSwitch: true,  // disable ability to swtich between modes
        respectPrefersColorScheme: false,
      },
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
