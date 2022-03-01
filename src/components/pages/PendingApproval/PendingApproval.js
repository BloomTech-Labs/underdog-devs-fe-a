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
        <Menu theme="dark" mode="inline">
          <Menu.Item key="10" onClick={handleLogout}>
            Log Out
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="13" icon={<BulbOutlined />}>
            <div id="darkmode">
              Darkmode
              <Toggle size="small" id="darkModeToggle" onClick={toggleTheme} />
            </div>
          </Menu.Item>
        </Menu>
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
