/* 
All of the commented out code on this page is to remove the 'no-unused-vars' warnings in the console
*/
import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import '../styles/Sidebar.css';
import {
  adminLinks,
  bottomSharedLinks,
  menteeLinks,
  mentorLinks,
  sharedLinks,
  devLinks,
} from './SidebarLinks.utils';
const { Content, Sider } = Layout;

const Sidebar = ({ children, userProfile }) => {
  const { role_id } = userProfile;
  // const [modal, setModal] = useState(false);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const [theme, toggleTheme] = useTheme();
  // const openModal = () => setModal(true);

  // const cancelOpen = () => setModal(false);

  const handleMenuClick = menu => {
    if (menu.key === 'darkmode') {
      toggleTheme();
      return;
    }
    push(menu.key);
  };

  // This is determining which role is currently in session, implemented further in ternary statements in the return clause
  // const isUserMentee = useMemo(() => role_id === 4, [role_id]);

  /**
   * Khaleel Musleh
   * Changed role_id to strict equality and removed the ELSE statement of mentee as it was crashing whenever we update the role_id or add a new role_id such as Dev role ID
   *  while creating an IF statement for each role
   */

  const isUserAdmin = useMemo(() => role_id <= 2, [role_id]);
  const isUserMentor = useMemo(() => role_id === 3, [role_id]);
  const isUserMentee = useMemo(() => role_id === 4, [role_id]);
  /**
   * Khaleel Musleh
   * Created a Dev role_id which displays all the sidebar links of Admin, Mentor, Mentee
   */
  const isUserDev = useMemo(() => role_id === 5, [role_id]);

  const linksToDisplay = useMemo(() => {
    // create sidebar link array
    let sidebarLinks = [];
    // check roles
    if (isUserAdmin) {
      sidebarLinks = [...sharedLinks, ...adminLinks];
    } else if (isUserMentor) {
      sidebarLinks = [...sharedLinks, ...mentorLinks];
    } else if (isUserDev) {
      sidebarLinks = [...sharedLinks, ...devLinks];
    } else if (isUserMentee) {
      sidebarLinks = [...sharedLinks, ...menteeLinks];
    }
    return [...sidebarLinks, ...bottomSharedLinks];
  }, [isUserAdmin, isUserMentor, isUserDev, isUserMentee]);

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
