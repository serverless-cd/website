import React, { useEffect } from "react";
import { Field } from "@alicloud/console-components";
import VariableUI from "@serverless-cd/variable-ui";

export default function TextVariable() {
  const field = new Field();
  const { init, getValue } = field;

  const initValue = {};

  useEffect(() => {
    console.log("data:", getValue("data"));
  }, [getValue("data")]);

  return (
    <VariableUI
      {...init("data", { initValue })}
      hintText={"当前环境变量为通过函数计算FC应用发布时可引用的环境变量"}
    />
  );
}
