import React from "react";
import DingTalk from "@serverless-cd/dingtalk-ui";
import { Field } from "@alicloud/console-components";

export default function TriggerDemo() {
  const field = new Field({
    onChange: () => {
      console.log(field.getValues());
    },
  });

  const { init } = field;

  const initValue = {
    webhook: "https://xxx.com",
    enable: true,
    secret: "xxxxxxx",
    skipOnSuccess: false,
    messageContent: "default content.",
    remindType: "appoint",
    atMobiles: "134xxxxxxxxx",
    atUserIds: "mydingding",
  };

  return (
    <>
      <DingTalk {...init("dingding", { initValue })} />
    </>
  );
}
