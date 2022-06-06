import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../../common/styles/Sidebar.css';
import { Layout, Menu, Switch as Toggle } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import useTheme from '../../../hooks/useTheme';

const { Content, Sider } = Layout;

const PendingApproval = props => {
  const { authService, userInfo } = props;
  const [collapsed, setCollapsed] = useState(false);
  const toggleTheme = useTheme();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = checked => {
    authService.logout();
    localStorage.removeItem('role_id');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleLogout}
          items={[
            {
              key: '10',
              label: 'Log Out',
            },
            {
              key: '13',
              label: 'Darkmode',
              icon: <BulbOutlined />,
            },
          ]}
        />
        {/* might need to rearrange the div, Toggle and Menu once the page is being used */}
        <div id="darkmode">
          <Toggle size="small" id="darkModeToggle" onClick={toggleTheme} />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '2vh 1vw' }}>
          <Content>
            <div>
              Hey {userInfo.name}, currently your application is still pending.
              Please check back again soon!
            </div>
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PendingApproval;
