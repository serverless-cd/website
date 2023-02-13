import React from 'react';
import Auth from '@serverless-cd/auth-ui';

const Demo = (props) => {
    const title = (
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
          <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
        </div>
    );

    const onSingIn = async(req) => {
      console.log('onSingIn 触发登录回调函数', req);
    };
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Auth
            title={title}
            titleStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            type="LOGINEMAIL"
            onSingIn={onSingIn}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#忘记密码">Remember Me</a>
            <a href="#注册">Create an account</a>
            </div>
          </Auth>
        </div>
    );
};

export default Demo;
  