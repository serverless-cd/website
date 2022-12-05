import React, { useState, useEffect } from 'react';
import { Field, Button } from '@alicloud/console-components';
import { Trigger } from '@serverless-cd/ui';

export default function TriggerDemo() {
  const field = new Field();
  const { init, getValue } = field;
  const [disabled, setDisabled] = useState(true)

  const initValue = {}

  useEffect(() => {
    console.log('trigger:', getValue('trigger'));
  }, [getValue('trigger')]);

  return (
    <>
      <Trigger
        {...init('trigger', { initValue })}
        disabled={disabled}
      />
      <Button type='primary' style={{marginTop: 20}} onClick={() => setDisabled(!disabled)}>{disabled ? '开放' : '禁用' }</Button>
    </>
  );
}
