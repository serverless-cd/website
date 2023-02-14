import React from 'react';
import AppCard, { IApiType } from '@serverless-cd/app-card-ui';

export default function Demo() {
  const dataSouce = {
    title: 'Todolist',
    package: 'todolist-app',
    description: '一款基于Node.JS的网页TodoList应用',
    download: 6423,
    logo: 'https://example-static.oss-cn-beijing.aliyuncs.com/serverless-app-store/express.png',
    demo: 'http://todolist.web-framework.1767215449378635.cn-hangzhou.fc.devsapp.net/',
    tags: ['Express', '云应用', 'Todo List'],
    url: 'https://github.com/devsapp/start-web-framework/tree/master/example/todolist-app/src',
    user: 1,
  };
  return <AppCard dataSouce={dataSouce} apiType={IApiType.fcweb} />;
}
