import React from 'react';
import AppCard, { IApiType } from '@serverless-cd/app-card-ui';
import axios from 'axios';
import qs from 'qs';
import { get } from 'lodash';

export default function Demo() {
  const dataSouce = {
    title: 'Todolist',
    package: 'todolist-app',
    description: '一款基于Node.JS的网页TodoList应用',
    download: 6423,
    logo: 'https://example-static.oss-cn-beijing.aliyuncs.com/serverless-app-store/express.png',
    tags: ['Express', '云应用', 'Todo List'],
    url: 'https://github.com/devsapp/start-web-framework/tree/master/example/todolist-app/src',
    user: 1,
  };

  const fetchReadme = async () => {
    try {
      const result = await axios({
        method: 'post',
        url: 'https://registry.devsapp.cn/package/content',
        data: qs.stringify({
          name: 'png-compress',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return get(result, 'data.Response.readme');
    } catch (e) {}
  };

  return <AppCard dataSouce={dataSouce} apiType={IApiType.fcweb} fetchReadme={fetchReadme} />;
}
