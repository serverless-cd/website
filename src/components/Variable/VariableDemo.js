import React, { useEffect, useState } from "react";
import VariableUI from "@serverless-cd/variable-ui";

export default function VariableUiDemo() {
  const [value, onChange] = useState({});
  useEffect(() => {
    console.log("value:", value);
  }, [value]);

  return <VariableUI value={{ aa: "", bb: "" }} onChange={onChange} />;
}
