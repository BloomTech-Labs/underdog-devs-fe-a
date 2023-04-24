/* 
All of the commented out code on this page is to remove the 'no-unused-vars' warnings in the console
*/
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import '../styles/Sidebar.css';
import {
  // superAdminLinks,
  adminLinks,
  // bottomSharedLinks,
  menteeLinks,
  mentorLinks,
  // sharedLinks,
  devLinks,
} from './SidebarLinks.utils';
const { Content, Sider } = Layout;

const Sidebar = ({ children, currentUser }) => {
  const { role } = currentUser;
  const { push } = useHistory();
  const { pathname } = useLocation();

  const [links, setLinks] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [theme, toggleTheme] = useTheme();

  const handleMenuClick = menu => {
    if (menu.key === 'darkmode') {
      toggleTheme();
      return;
    }
    push(menu.key);
  };

  useEffect(() => {
    let approved = false;
    if (currentUser.validate_status === 'approved') {
      approved = true;
    }
    if (role) {
      switch (role) {
        case 'admin':
          setLinks([/*...sharedLinks,*/ ...adminLinks]);
          break;

        case 'mentor':
          approved
            ? setLinks([/*...sharedLinks,*/ ...mentorLinks])
            : setLinks(null);
          break;

        case 'mentee':
          approved
            ? setLinks([/*...sharedLinks,*/ ...menteeLinks])
            : setLinks(null);
          break;

        case 'dev':
          setLinks([/*...sharedLinks,*/ ...devLinks]);
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider id="sidebar" trigger={null} breakpoint="lg" collapsible={true}>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          mode="inline"
          items={links}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '2vh 1vw' }}>
          <Content>{children}</Content>
        </Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = state => {
  return { currentUser: state.user.currentUser };
};
export default connect(mapStateToProps)(Sidebar);
