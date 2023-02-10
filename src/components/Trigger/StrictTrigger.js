import React, { useState, useEffect, useRef } from 'react';
import { Field, Button } from '@alicloud/console-components';
import Trigger from '@serverless-cd/trigger-ui';

export default function TriggerDemo() {
  const field = new Field();
  const { init, getValue } = field;
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef();
  const initValue = {};

  const [branchList, setBranchList] = useState([
    { label: 'master', value: 'master' },
    { label: 'main', value: 'main' },
  ]);

  useEffect(() => {
    console.log('trigger:', getValue('trigger'));
  }, [getValue('trigger')]);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setBranchList([...branchList, { label: 'test', value: 'test' }]);
      setLoading(false);
    }, 3000);
  };

  // 校验Trigger
  const verifyTrigger = () => {
    triggerRef.current.validate().then((validate) => {
      console.log(validate, 'validate');
    });
  };

  return (
    <>
      <Trigger
        {...init('trigger', { initValue })}
        mode="strict"
        branchList={branchList}
        loading={loading}
        isRefresh
        onRefresh={onRefresh}
        ref={triggerRef}
      />
      <Button type='primary' style={{marginTop: 20}} onClick={verifyTrigger}>校验</Button>
    </>
  );
}
