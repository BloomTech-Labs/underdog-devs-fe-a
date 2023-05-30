import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import MatchingModal from './UserManagement';
import { CloseOutlined } from '@ant-design/icons';

const UserModal = ({ userShow, handleCancel, user }) => {
  const [matchShow, setMatchShow] = useState(false);
  const [newUserShow, setNewUserShow] = useState(userShow);

  return (
    <>
      <Modal
        title={
          <div className="header-api">
            <p style={{ marginBottom: '0px' }}>User Detail</p>{' '}
            <Button
              className="cross"
              style={{
                marginBottom: '0px',
                color: '#000',
                cursor: 'pointer',
                fontWeight: 'bolder',
              }}
              onClick={handleCancel}
            >
              <CloseOutlined />
            </Button>
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
            {`${user.role} / ${
              user.numberOfMatches > 0 ? user.numberOfMatches : 0
            } ${user.numberOfMatches === 1 ? 'Match' : 'Matches'} `}
            {''}
          </span>
          <Button
            onClick={() => {
              setNewUserShow(false);
              setMatchShow(true);
            }}
          >
            Edit Matches
          </Button>{' '}
        </div>
        <div className="UserTable">
          <div span={24} className="customCol">
            <div className="FieldTitle">Name</div>
            <p
              className="FieldValue"
              // onClick={() => userShow(user)}
            >{`${user?.first_name} ${user?.last_name}`}</p>
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
            <div
              className="FieldValue"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {user?.tech_stack ? (
                typeof user.tech_stack === typeof '' ? (
                  <p>{user?.tech_stack}</p>
                ) : (
                  user?.tech_stack.map((stack, idx) => {
                    return <p key={idx}>{`${stack}`}</p>;
                  })
                )
              ) : null}
            </div>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Commit?</div>
            <p className="FieldValue">{user?.commitment ? 'Yes' : 'No'}</p>
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
