import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './ApplicationModal.less';
import { Modal, Button } from 'antd';
import MenteeModal from './MenteeModal';
import MentorModal from './MentorModal';
import { setCurrentApplication } from '../../../state/actions/applications/setCurrentApplication';

import { handleApplication } from '../../../state/actions/applications/handleApplications';

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
  applicationProfile,
  dispatch,
  currentApplication,
}) => {
  const handleOk = () => {
    setDisplayModal(false);
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId(''); //? Do we need this? I'm thinking no...
  };

  useEffect(() => {
    dispatch(setCurrentApplication(applicationProfile));
  }, [applicationProfile, profileId, currentApplication]);

  const statusHandler = status => {
    applicationProfile.validate_status = status;
    dispatch(
      handleApplication(
        setDisplayModal,
        `${currentApplication.profile_id}`,
        `${currentApplication.role_name}`,
        status
      )
    );
  };

  return (
    <>
      {currentApplication?.profile_id === undefined ? (
        <Modal
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          footer={null}
        >
          Application not found
        </Modal>
      ) : (
        <Modal
          title="Review Application"
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          className={
            currentApplication.role_name === 'mentee'
              ? 'modalStyleMentee'
              : 'modalStyleMentor'
          }
          footer={[
            <Button
              key="submitA"
              type="primary"
              onClick={() => statusHandler('approved')}
            >
              Approve
            </Button>,
            <Button
              key="submitR"
              onClick={() => statusHandler('rejected')}
              danger
            >
              Reject
            </Button>,
          ]}
        >
          {currentApplication.role_name === 'mentee' ? (
            <MenteeModal applicant={currentApplication} />
          ) : (
            <MentorModal applicant={currentApplication} />
          )}
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentApplication: state.appReducer.currentApplication,
  };
};

export default connect(mapStateToProps)(ApplicationModal);
