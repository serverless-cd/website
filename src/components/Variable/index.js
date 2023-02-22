import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

function VariableDemo() {
  return (
    <BrowserOnly>
      {() => {
        const VariableUI = require("./VariableDemo").default;
        return <VariableUI />;
      }}
    </BrowserOnly>
  );
}

function FieldVariable() {
  return (
    <BrowserOnly>
      {() => {
        const VariableUI = require("./FieldVariable").default;
        return <VariableUI />;
      }}
    </BrowserOnly>
  );
}

function TextVariable() {
  return (
    <BrowserOnly>
      {() => {
        const VariableUI = require("./TextVariable").default;
        return <VariableUI />;
      }}
    </BrowserOnly>
  );
}

export default {
  VariableDemo,
  FieldVariable,
  TextVariable,
};
