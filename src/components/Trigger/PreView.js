import React, { useState } from "react";
import { Button } from "@alicloud/console-components";
import Trigger from "@serverless-cd/trigger-ui";

export default function PreView() {
  const [dataSource, setDataSource] = useState([]);

  const forma1 = () => {
    const data = [
      {
        eventType: "push",
        matchType: "branches",
        matchRule: "precise",
        targetBranch: "main",
        sourceBranch: "",
        triggerType: [],
      },
    ];
    setDataSource(data);
  };

  const forma2 = () => {
    const data = {
      push: {
        branches: {
          precise: ["master"],
        },
      },
    };
    setDataSource(data);
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Button style={{ marginRight: "20px" }} onClick={forma1} type="primary">
          格式一
        </Button>
        <Button type="primary" onClick={forma2}>
          格式二
        </Button>
      </div>
      <Trigger.Preview dataSource={dataSource} />
    </>
  );
}
