import React, { useState } from 'react';
import { Icon } from '@alicloud/console-components';
import CopyIcon from '../CopyIcon';
import './index.css';

export default function TriggerDemo(props) {
  const { children, codeSource } = props
  const [isShowCode, setIsShowCode] = useState(false);

  return (
    <div className="code-container">
      <div className="components-container">
        {children}
      </div>
      <div className="components-action">
        <CopyIcon size={"small"} content={codeSource} />
        <Icon type="display-code" style={{marginLeft: 8}} className="cursor-pointer" size={"small"}  onClick={() =>  setIsShowCode(!isShowCode)} />
      </div>
      {
        isShowCode &&
        (
          <div className="components-source-wrapper">
            <pre>
              {codeSource}
            </pre>
          </div>
        )
      }
    </div>
  );
}
