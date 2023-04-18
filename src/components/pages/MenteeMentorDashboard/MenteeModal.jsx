import { Modal } from 'antd';

const MenteeUserModal = ({ userShow, handleCancel, user }) => {
  return (
    <>
      <Modal
        title={
          <div className="header-api">
            <p style={{ marginBottom: '0px' }}>Mentee Details</p>{' '}
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
            <div className="FieldTitle">Representation</div>
            <p className="FieldValue">
              {user?.formerly_incarcerated ? (
                <span>Formerly Incarcerated</span>
              ) : null}
              &nbsp; <br></br>&nbsp;
              {user?.underrepresented_group ? (
                <span>Underrepresented Group</span>
              ) : null}
            </p>
          </div>

          <div span={24} className="customCol">
            <div className="FieldTitle">Mentorship Topics</div>
            <p className="FieldValue">{<span>{user?.tech_stack}</span>}</p>
          </div>

          <div span={24} className="customCol">
            <div className="FieldTitle">Hoping To Gain</div>
            <p className="FieldValue">
              {user?.job_help ? <span>Job Search Help </span> : null}
              &nbsp; <br></br>&nbsp;
              {user?.pair_programming ? (
                <span>Pair Programming / Coding Practice </span>
              ) : null}
            </p>
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
    </>
  );
};
export default MenteeUserModal;
