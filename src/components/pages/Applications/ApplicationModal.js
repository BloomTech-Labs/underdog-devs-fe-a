import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import './ApplicationModal.less';
import { Modal, Button } from 'antd';
import MenteeModal from './MenteeModal';
import MentorModal from './MentorModal';

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

  const handleOk = () => {
    setDisplayModal(false);
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId('');
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

  // const handleApplication = (role, status) => {
  //   const payload = {
  //     role: role,
  //     status: status,
  //   };
  //   axiosWithAuth()
  //     .put(`${API_URL}application/update-validate_status/${profileId}`, payload)
  //     .then(res => {
  //       console.log(currentApplication);
  //       // Update state based on previous state
  //       setCurrentApplication(prevState => {
  //         return { ...prevState, children: payload.status };
  //       });

  //       // Update state based on payload.status
  //       if (payload.status === 'approved') {
  //         setCurrentApplication(prevState => {
  //           return { ...prevState, color: 'green' };
  //         });
  //       } else {
  //         setCurrentApplication(prevState => {
  //           return { ...prevState, color: 'red' };
  //         });
  //       }
  //       setDisplayModal(false);
  //       getApps();
  //       console.log(currentApplication.status);
  //       openNotificationWithIcon('success', status);
  //     })
  //     .catch(err => {
  //       openNotificationWithIcon('error', status, err.message);
  //     });
  // };

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
              // onClick={() =>
              //   handleApplication(`${currentApplication.role_name}`, 'approved')
              // }
            >
              Approve
            </Button>,
            <Button
              key="submitR"
              // onClick={() =>
              //   handleApplication(`${currentApplication.role_name}`, 'reject')
              // }
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
