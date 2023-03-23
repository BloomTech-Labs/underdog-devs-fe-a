import React, { useState } from 'react';
import { Modal } from 'antd';
import MatchingModal from '../MentorMenteeMatching/MatchingModal';

const UserModal = ({ userShow, handleCancel, user }) => {
  const [matchShow, setMatchShow] = useState(false);
  const [newUserShow, setNewUserShow] = useState(userShow);

  return (
    <>
      <Modal
        title={
          <div className="header-api">
            <p style={{ marginBottom: '0px' }}>User Detail</p>{' '}
            <p
              className="cross"
              style={{
                marginBottom: '0px',
                color: '#000',
                cursor: 'pointer',
                fontWeight: 'bolder',
              }}
              onClick={handleCancel}
            >
              X
            </p>
          </div>
        }
        width={'80vw'}
        visible={userShow}
        onCancel={handleCancel}
        okText={'Save Changes'}
        maskClosable={false}
        footer={null}
        className="UserModal"
      >
        <div style={{ padding: '0px 20px' }}>
          <span>
            {`Mentor / ${user.numberOfMatches} ${
              user.numberOfMatches === 1 ? 'Match' : 'Matches'
            } `}
            {''}
          </span>
          <button
            onClick={() => {
              setNewUserShow(false);
              setMatchShow(true);
            }}
          >
            Edit Matches
          </button>{' '}
        </div>
        <div className="UserTable">
          <div span={24} className="customCol">
            <div className="FieldTitle">Name</div>
            <p
              className="FieldValue"
              // onClick={() => userShow(user)}
            >{`${user?.name}`}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Email</div>
            <p className="FieldValue">{`${user?.email}`}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">City/State/Country</div>
            <p className="FieldValue">{`${user?.city} / ${user?.state} / ${user?.country}`}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Current Company/Position</div>
            <p className="FieldValue">{user?.current_company}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Mentorship Topics</div>
            <p className="FieldValue">{<span>{user?.tech_stack}</span>}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Commit?</div>
            <p className="FieldValue">{user?.commitment ? 'Yes' : 'No'}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Hear about UD?</div>
            <p className="FieldValue">{user?.referred_by}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Anything else</div>
            <p className="FieldValue">{user?.other_info}</p>
          </div>
        </div>
      </Modal>

      {matchShow ? (
        <MatchingModal
          matchShow={matchShow}
          handleCancel={() => setMatchShow(false)}
          user={user}
        />
      ) : null}
    </>
  );
};
export default UserModal;
