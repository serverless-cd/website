import React from 'react';
import AppCard from '@serverless-cd/app-card-ui';

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
  const arr = [1, 2, 3];
  const len = arr.length;

  const styleObj = {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: -8,
    marginRight: -8,
  };

  return (
    <div style={styleObj}>
      {arr.map((item) => (
        <AppCard dataSouce={dataSouce} column={3} />
      ))}
    </div>
  );
}
