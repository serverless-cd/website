import React from 'react';
import Auth from '@serverless-cd/auth-ui';

const Demo = (props) => {
    const title = (
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
          <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
        </div>
    );
    const onRememberMe = async(req) => {
      console.log('onRememberMe 触发密码变更回调函数', req);
    };
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Auth
            title={title}
            githubUrl="https://github.com/login/oauth/authorize?  client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
            giteeUrl="https://github.com/login/oauth/authorize?client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
            type="REMEMBER"
            onRememberMe={onRememberMe}
            >
            <div className="admin-public-width">
              <a href="#用户名登录" className="admin-register-color admin-cursor admin-go-login">
                已经有账户？前往登录
              </a>
            </div>
          </Auth>
        </div>
    );
};

export default Demo;
  