import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { getUserMatches } from '../../../state/actions/userMatches/getUserMatches';
import MenteeModal from './MenteeModal';
import MentorModal from './MentorModal';

const MenteeMentorDashboard = ({ currentUser, userMatches }) => {
  const [userShow, setUserShow] = useState(false);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      dispatch(getUserMatches(currentUser.matches, currentUser.role));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h2>My {currentUser.role === 'mentor' ? 'Mentees' : 'Mentors'}</h2>
        <List
          itemLayout="horizontal"
          dataSource={userMatches}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`${item.first_name} ${item.last_name}`}
                description={item.email}
                onClick={() => {
                  setUser(item);
                  setUserShow(true);
                }}
              />
            </List.Item>
          )}
        />
        {currentUser.role === 'mentor' ? (
          <MenteeModal
            userShow={userShow}
            handleCancel={() => setUserShow(false)}
            user={user}
          />
        ) : (
          <MentorModal
            userShow={userShow}
            handleCancel={() => setUserShow(false)}
            user={user}
          />
        )}
      </div>
    </>
  );
};

/*
The current implementation of redux, will need to be updated once global state is introduced. 
Ticket BL-1042 addresses this requirement
*/
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    userMatches: state.user.allUserMatches,
  };
};

export default connect(mapStateToProps)(MenteeMentorDashboard);
