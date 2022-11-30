import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '9e0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '7df'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '027'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '881'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '2a5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '982'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '2d8'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '847'),
    exact: true
  },
  {
    path: '/blog/deep-devs-proxy',
    component: ComponentCreator('/blog/deep-devs-proxy', 'da6'),
    exact: true
  },
  {
    path: '/blog/fe2serverless-nodejs-framework',
    component: ComponentCreator('/blog/fe2serverless-nodejs-framework', 'ccb'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '42b'),
    exact: true
  },
  {
    path: '/blog/tags/ci-cd',
    component: ComponentCreator('/blog/tags/ci-cd', '975'),
    exact: true
  },
  {
    path: '/blog/tags/serverless-devs',
    component: ComponentCreator('/blog/tags/serverless-devs', '6af'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'c42'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'f28'),
    routes: [
      {
        path: '/docs/category/插件',
        component: ComponentCreator('/docs/category/插件', '20c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/核心工具包',
        component: ComponentCreator('/docs/category/核心工具包', '2f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/集成开发',
        component: ComponentCreator('/docs/category/集成开发', '92d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/开发者指南',
        component: ComponentCreator('/docs/category/开发者指南', '1e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/使用serverless-cd',
        component: ComponentCreator('/docs/category/使用serverless-cd', '580'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/用户手册',
        component: ComponentCreator('/docs/category/用户手册', '1b7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/运维',
        component: ComponentCreator('/docs/category/运维', '4d5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/Admin数据表',
        component: ComponentCreator('/docs/dev-guide/Admin数据表', '885'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/develop/open-api',
        component: ComponentCreator('/docs/dev-guide/develop/open-api', 'f49'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/develop/plugin',
        component: ComponentCreator('/docs/dev-guide/develop/plugin', '4b6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/toolkit/core',
        component: ComponentCreator('/docs/dev-guide/toolkit/core', 'a70'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/toolkit/engine',
        component: ComponentCreator('/docs/dev-guide/toolkit/engine', 'b44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/toolkit/git',
        component: ComponentCreator('/docs/dev-guide/toolkit/git', 'cb5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/toolkit/git-provider',
        component: ComponentCreator('/docs/dev-guide/toolkit/git-provider', 'c77'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-guide/toolkit/trigger',
        component: ComponentCreator('/docs/dev-guide/toolkit/trigger', 'c96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/ops/ding-talk',
        component: ComponentCreator('/docs/user-guide/ops/ding-talk', '373'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/plugins/ding-talk',
        component: ComponentCreator('/docs/user-guide/plugins/ding-talk', '950'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/plugins/npm-publish',
        component: ComponentCreator('/docs/user-guide/plugins/npm-publish', 'b2c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/plugins/send-email',
        component: ComponentCreator('/docs/user-guide/plugins/send-email', '3ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/quick_start',
        component: ComponentCreator('/docs/user-guide/quick_start', '637'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/usage/context',
        component: ComponentCreator('/docs/user-guide/usage/context', '259'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/usage/custom-steps',
        component: ComponentCreator('/docs/user-guide/usage/custom-steps', '0a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/user-guide/usage/expressions',
        component: ComponentCreator('/docs/user-guide/usage/expressions', 'b99'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'a00'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
