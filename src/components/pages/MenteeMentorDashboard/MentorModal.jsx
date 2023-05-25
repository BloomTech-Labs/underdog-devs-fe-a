import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const MentorModal = ({ userShow, handleCancel, user }) => {
  console.log(`USER`, user);
  return (
    <>
      {user ? (
        <Modal
          title={
            <div className="header-api">
              <p style={{ marginBottom: '0px' }}>Mentor Details</p>{' '}
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
              <div className="FieldTitle">Mentorship Topics</div>
              <div
                className="FieldValue"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                {user?.tech_stack.length > 0 &&
                typeof user?.tech_stack !== String
                  ? user?.tech_stack.map(el => {
                      return <p> {el} &nbsp; &nbsp;</p>;
                    })
                  : user?.tech_stack}
              </div>
            </div>

            <div span={24} className="customCol">
              <div className="FieldTitle">
                What Can Mentor Contribute To Mentee Progress
              </div>
              <p className="FieldValue">
                {user?.job_help ? <span>Job Search Help </span> : null}
                &nbsp; <br></br>&nbsp;
                {user?.industry_knowledge ? (
                  <span>Industry Knowledge </span>
                ) : null}
              </p>
            </div>

            <div span={24} className="customCol">
              <div className="FieldTitle">Anything else</div>
              <p className="FieldValue">{user?.other_info}</p>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
export default MentorModal;
