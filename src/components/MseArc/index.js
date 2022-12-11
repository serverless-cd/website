import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const MseArc = () => {
  return (
    <BrowserOnly>
      {() => {
        const MseMap = require("@serverless-cd/mse-arc-ui").default;
        return <MseMap />;
      }}
    </BrowserOnly>
  );
};

export default MseArc;
