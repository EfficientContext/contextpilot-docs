// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting_started/installation',
        'getting_started/quickstart',
        'getting_started/docker',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/offline_usage',
        'guides/online_usage',
        'guides/mac_llama_cpp',
        'guides/multi_turn',
        'guides/pageindex',
        'guides/mem0',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/primitives',
        'reference/api',
        'reference/benchmarks',
      ],
    },
  ],
};

export default sidebars;
