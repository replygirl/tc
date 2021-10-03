module.exports = {
  title: '@replygirl/tc',
  description: 'Just playing around.',
  mpa: true,
  themeConfig: {
    repo: 'replygirl/tc',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: false,

    nav: [
      {
        text: 'Changelog',
        link: 'https://github.com/replygirl/tc/releases'
      }
    ],

    displayAllHeaders: true,
    sidebar: [
      {
        text: 'Overview',
        link: '/'
      },
      {
        text: 'Getting started',
        link: '/getting-started.html'
      },
      {
        text: 'Features',
        link: '/features.html'
      },
      {
        text: 'Types',
        link: '/types.html'
      },
      {
        text: 'Migrating',
        link: '/migrating.html'
      }
    ].map(x => ({ ...x, collapsable: false }))
  },
}
