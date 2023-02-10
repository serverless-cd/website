import React, { useEffect, useState } from "react";
import Trigger from "@serverless-cd/trigger-ui";

export default function TriggerDemo() {
  const [value, onChange] = useState({});

  useEffect(() => {
    console.log("value:", value);
  }, [value]);

  return <Trigger value={value} onChange={onChange} />;
}
