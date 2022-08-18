import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../../common/styles/Sidebar.css';
import { Layout, Menu, Switch as Toggle } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import useTheme from '../../../hooks/useTheme';

const { Content, Sider } = Layout;

const menuItems = [
  {
    key: 'darkmode',
    label: 'Darkmode',
    icon: <BulbOutlined />,
  },
  {
    key: 'logout',
    label: 'Log Out',
  },
];

const PendingApproval = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggleTheme] = useTheme();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  //TODO: implement Auth0 for signout if needed. It may be unnecessary if Navbar serves it already.
  const handleLogout = checked => {
    localStorage.removeItem('role_id');
  };

  const handleMenuClick = menu => {
    if (menu.key === 'darkmode') {
      toggleTheme();
      return;
    }
    handleLogout();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '2vh 1vw' }}>
          <Content>
            <div>
              Hey John Doe, currently your application is still pending. Please
              check back again soon!
            </div>
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PendingApproval;
