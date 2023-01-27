import React from 'react';
import { Modal } from 'antd';

const UserModal = ({ show, handleCancel, user }) => {
  return (
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
      visible={show}
      onCancel={handleCancel}
      okText={'Save Changes'}
      maskClosable={false}
      footer={null}
      className="UserModal"
    >
      <div style={{ padding: '0px 20px' }}>
        <span>Mentor / 3 Matches</span> <a>Edit Matches</a>{' '}
      </div>
      <div className="UserTable">
        <div span={24} className="customCol">
          <div className="FieldTitle">Name</div>
          <p className="FieldValue">{`${user?.first_name} ${user?.last_name}`}</p>
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
          <p className="FieldValue">
            {user?.tech_stack?.map(stack => (
              <>
                <span>{stack}</span> <br />
              </>
            ))}
          </p>
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
      {/* <Row>
        <div span={3}>
          <p>{user?.first_name}</p>
        </div>
        <div span={3}>
          <p>{user?.last_name}</p>
        </div>
        <div span={3}>
          <p>{user?.email}</p>
        </div>
        <div span={3}>
          <p>{user?.country}</p>
        </div>
        <div span={3}>
          <p>{user?.state}</p>
        </div>
        <div span={3}>
          <p>{user?.city}</p>
        </div>
        <div span={3}>
          <p>{user?.current_company}</p>
        </div>
        <div span={3}>
          <p>{user?.current_position}</p>
        </div>
        
      </Row> */}
    </Modal>
  );
};

export default UserModal;
