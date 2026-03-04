// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting_started/installation',
        'getting_started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/offline_usage',
        'guides/online_usage',
        'guides/multi_turn',
        'guides/pageindex',
        'guides/mem0',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api',
        'reference/benchmarks',
      ],
    },
  ],
};

export default sidebars;
