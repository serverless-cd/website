import React, { memo } from 'react';
import { Icon, Message } from '@alicloud/console-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const CopyIcon = ({ content, size = 'medium'}) => {
  return (
    <CopyToClipboard
      text={content}
      onCopy={(_, result) => {
        if (result) {
          Message.success('复制成功');
        }
      }}
    >
      <Icon type="copy" className="cursor-pointer" size={size} />
    </CopyToClipboard>
  );
};

export default memo(CopyIcon);
