import React, { useEffect } from 'react';
import { Field } from '@alicloud/console-components';
import Trigger from '@serverless-cd/trigger-ui';

export default function TriggerDemo() {
  const field = new Field();
  const { init, getValue } = field;

  const initValue = {}

  useEffect(() => {
    console.log('trigger:', getValue('trigger'));
  }, [getValue('trigger')]);

  return (

    <Trigger
      {...init('trigger', { initValue })}
    />
  );
}
