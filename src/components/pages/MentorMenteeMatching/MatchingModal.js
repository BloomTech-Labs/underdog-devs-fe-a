import React from 'react';
import { Modal, Tag, Button } from 'antd';
const MatchingModal = ({ matchShow, handleCancel, user }) => {
  return (
    <Modal
      title={
        <div className="header-api">
          <p style={{ marginBottom: '0px' }}>Matching</p>
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
      visible={matchShow}
      onCancel={handleCancel}
      okText={'Save Changes'}
      maskClosable={false}
      footer={null}
      className="UserModal"
    >
      <div className="MatchingModal">
        <div className="UserTable MenteeTable">
          <div>
            <div span={24} className="customCol">
              <div className="FieldTitle">Name</div>
              <p className="FieldValue">{`${user?.first_name} ${user?.last_name}`}</p>
            </div>
            <div span={24} className="customCol">
              <div className="FieldTitle">City/ State/ Country</div>
              <p className="FieldValue">{`${user?.city} / ${user?.state} / ${user?.country}`}</p>
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
              <div className="FieldTitle">Other Topics</div>
              <p className="FieldValue">{user?.other_info}</p>
            </div>
          </div>
          <div className="MatchSuggestMatch">
            <div className="Matches">
              <h4>Matches</h4>
              <p>Match One</p>
              <p>Match Two</p>
              <p>Match Three</p>
            </div>
            <div>
              <h4>Suggested Matches</h4>
              <p>Name One</p>
              <p>Name Two</p>
              <p>Name Three</p>
              <p>Name Four</p>
              <p>Name Five</p>
              <p>Name Six</p>
            </div>
          </div>
        </div>
        <br />
        <div className="UserTable MentorTable">
          <div span={24} className="customCol">
            <div className="FieldTitle">Name</div>
            <p className="FieldValue">{`${user?.first_name} ${user?.last_name}`}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Email</div>
            <p className="FieldValue">{`${user?.email}`}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">City/ State/ Country</div>
            <p className="FieldValue">{`${user?.city} / ${user?.state} / ${user?.country}`}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Current Company/ Position</div>
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
            <div className="FieldTitle">Other Topics</div>
            <p className="FieldValue">{user?.other_info}</p>
          </div>
          <div span={24} className="customCol">
            <div className="FieldTitle">Anything Else?</div>
            <p className="FieldValue">{user?.other_info}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default MatchingModal;
