import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import './ApplicationModal.less';
import { Modal, Button, notification } from 'antd';
import MenteeModal from './MenteeModal';
import MentorModal from './MentorModal';
import { API_URL } from '../../../config';

// import { useDispatch } from 'react-redux';

/**
 * @param {applicationProfile}
 * @returns pending applications
 * Passed applicationProfile state from pendingApplication.js and rendered the applications in applicationModal.
 */

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
  applicationProfile,
  getApps,
}) => {
  const [currentApplication, setCurrentApplication] = useState();

  const { axiosWithAuth } = useAxiosWithAuth0();

  // const dispatch = useDispatch();

  const handleOk = () => {
    setDisplayModal(false);
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId('');
  };

  const openNotificationWithIcon = (type, status, err) => {
    if (type === 'success') {
      if (status === 'approve') {
        notification[type]({
          message: 'User has been approved successfully',
        });
      } else {
        notification[type]({
          message: 'User has been rejected successfully',
        });
      }
    }

    if (type === 'error') {
      if (status === 'approve') {
        notification[type]({
          message: 'User could not be approved at this time',
          description: `Error: ${err}`,
        });
      } else {
        notification[type]({
          message: 'User could not be rejected at this time',
          description: `Error: ${err}`,
        });
      }
    }
  };

  /**
   * @param {pendingAppHelper} Function
   * @returns Mentor or Mentee parameter for approveApplication or rejectApplication
   * If current.application.accepting_new_mentees exists then the account is a Mentor which means we have to pass in an Object in the request body with current_company
   * and validate_status yet if it doesnt exist then its a Mentee and we only pass in validate_status.
   */

  // const pendingAppHelper = status => {
  //   const mentor =
  //     currentApplication.accepting_new_mentees === undefined
  //       ? {
  //           validate_status: status,
  //         }
  //       : {
  //           validate_status: status,
  //           current_company: currentApplication.current_company,
  //         };
  //   return mentor;
  // };

  /**
   * Author: Khaleel Musleh
   * @param {approveApplication}
   * Approve application dispatches a request to setApplicationApprove in state/actions/applications which then returns a response of either a success or error status
   */

  const handleApplication = status => {
    axiosWithAuth()
      .post(`${API_URL}application/update-validate_status/${profileId}`, status)
      .then(res => {
        setDisplayModal(false);
        openNotificationWithIcon('success', status);
        getApps();
      })
      .catch(err => {
        openNotificationWithIcon('error', status, err.message);
      });
  };

  useEffect(() => {
    const getCurrentApp = () => {
      // eslint-disable-next-line array-callback-return
      Object.values(applicationProfile).map(current_id => {
        if (current_id?.key === profileId) {
          setCurrentApplication(current_id);
        }
      });
    };
    getCurrentApp();
  }, [applicationProfile, profileId]);

  return (
    <>
      {currentApplication?.key === undefined ? (
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
              onClick={() => handleApplication('approve')}
            >
              Approve
            </Button>,
            <Button
              key="submitR"
              onClick={() => handleApplication('reject')}
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

export default ApplicationModal;
