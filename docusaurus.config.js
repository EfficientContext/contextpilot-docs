// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ContextPilot',
  tagline: 'KV-Cache Aware Context Scheduling for RAG',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://contextpilot.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'contextpilot',
  projectName: 'contextpilot.github.io',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          // Remove "edit this page" links
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'ContextPilot',
        items: [
          {
            href: 'https://github.com/EfficientContext/ContextPilot',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://pypi.org/project/contextpilot/',
            label: 'PyPI',
            position: 'right',
          },
          {
            href: 'https://arxiv.org/abs/2511.03475',
            label: 'Paper',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/getting_started/installation',
              },
              {
                label: 'API Reference',
                to: '/reference/api',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/EfficientContext/ContextPilot',
              },
              {
                label: 'Issues',
                href: 'https://github.com/EfficientContext/ContextPilot/issues',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'PyPI',
                href: 'https://pypi.org/project/contextpilot/',
              },
              {
                label: 'arXiv Paper',
                href: 'https://arxiv.org/abs/2511.03475',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ContextPilot Contributors. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'json'],
      },
    }),
};

export default config;
