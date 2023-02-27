import React from "react";
import CreatingUi from "@serverless-cd/creating-ui";

export default function CreatingSuccess() {
  const dataSource = [
    {
      title: "创建组织",
      key: "createOrg",
      runningMsg: "创建组织中...",
      successMsg: "创建组织成功",
      errorMsg: "创建组织失败",
      run: async () => {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("createOrg");
          }, 3000);
        });
      },
    },
    {
      title: "部署环境",
      key: "releaseEnv",
      runningMsg: "部署环境中...",
      successMsg: "部署环境成功",
      errorMsg: "部署环境失败",
      run: async () => {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(22);
          }, 3000);
        });
      },
    },
    {
      title: "创建成功",
      key: "createSuccess",
    },
  ];

  const onComplete = (value) => {
    console.log(value, "Complete 事件");
  };

  return <CreatingUi dataSource={dataSource} onComplete={onComplete} />;
}
