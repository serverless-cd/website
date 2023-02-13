import React, { useState } from "react";
import DingTalk from "@serverless-cd/dingtalk-ui";

export default function DingTalkDemo() {
  const [dingTalkValue, setDingTalkValue] = useState({});
  const onChangeDingTalk = (value) => {
    console.log(value, "value");
    setDingTalkValue(value);
  };

  return <DingTalk value={dingTalkValue} onChange={onChangeDingTalk} />;
}
