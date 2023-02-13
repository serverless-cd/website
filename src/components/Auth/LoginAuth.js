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
            githubUrl="https://github.com/login/oauth/authorize?  client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
            giteeUrl="https://github.com/login/oauth/authorize?client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
            type="LOGIN"
            onSingIn={onSingIn}
          >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#忘记密码">忘记密码</a>
            <a href="#注册">免费注册</a>
          </div>
          </Auth>
        </div>
    );
};

export default Demo;
  