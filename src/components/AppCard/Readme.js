import React from 'react';
import AppCard from '@serverless-cd/app-card-ui';
import { Button } from '@alicloud/console-components';

export default function Demo() {
  return (
    <AppCard.Readme appName="png-compress" onCreate={() => {}}>
      <Button type="primary">查看详情</Button>
    </AppCard.Readme>
  );
}
