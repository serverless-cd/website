import React, { useEffect } from "react";
import { Field } from "@alicloud/console-components";
import VariableUI from "@serverless-cd/variable-ui";

export default function FieldVariable() {
  const field = new Field();
  const { init, getValue } = field;

  const initValue = { aa: "11", bb: "22" };

  useEffect(() => {
    console.log("data:", getValue("data"));
  }, [getValue("data")]);

  return <VariableUI {...init("data", { initValue })} />;
}
