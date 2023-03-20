import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import '../styles/Sidebar.css';
import {
  superAdminLinks,
  adminLinks,
  bottomSharedLinks,
  menteeLinks,
  mentorLinks,
  devLinks,
} from './SidebarLinks.utils';
const { Content, Sider } = Layout;

const Sidebar = ({ children, userProfile }) => {
  const { role_id } = userProfile;
  const { push } = useHistory();
  const { pathname } = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [theme, toggleTheme] = useTheme();

  const handleMenuClick = menu => {
    if (menu.key === 'darkmode') {
      toggleTheme();
      return;
    }
    push(menu.key);
  };

  const isUserSuperAdmin = useMemo(() => role_id === 1, [role_id]);
  const isUserAdmin = useMemo(() => role_id === 2, [role_id]);
  const isUserMentor = useMemo(() => role_id === 3, [role_id]);
  const isUserMentee = useMemo(() => role_id === 4, [role_id]);
  const isUserDev = useMemo(() => role_id === 5, [role_id]);

  const linksToDisplay = useMemo(() => {
    let sidebarLinks = [];
    if (isUserSuperAdmin) {
      sidebarLinks = [...superAdminLinks];
    } else if (isUserAdmin) {
      sidebarLinks = [...adminLinks];
    } else if (isUserMentor) {
      sidebarLinks = [...mentorLinks];
    } else if (isUserMentee) {
      sidebarLinks = [...menteeLinks];
    } else if (isUserDev) {
      // eslint-disable-next-line no-unused-vars
      sidebarLinks = [...devLinks];
    }
    return [...adminLinks, ...bottomSharedLinks];
  }, [isUserSuperAdmin, isUserAdmin, isUserMentor, isUserMentee, isUserDev]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider id="sidebar" trigger={null} breakpoint="lg" collapsible={true}>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          mode="inline"
          items={linksToDisplay}
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
  return { userProfile: state.user.userProfile };
};
export default connect(mapStateToProps)(Sidebar);
