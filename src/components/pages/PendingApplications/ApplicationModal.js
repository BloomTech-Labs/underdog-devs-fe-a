import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal } from 'antd';

const ApplicationModal = props => {
  const [currentApplication, setCurrentApplication] = useState([]);
  const { profileId, setProfileId, displayModal, setDisplayModal } = props;

  const handleOk = () => {
    setDisplayModal(false);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId('');
  };

  useEffect(() => {
    const getCurrentApp = () => {
      axiosWithAuth()
        .get(`/application/profileId/${profileId}`)
        .then(res => {
          setCurrentApplication(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getCurrentApp();
  }, [profileId]);

  return (
    <>
      {currentApplication.role_name === undefined ? (
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
          title={
            <header className="applicationHeader">Review Application</header>
          }
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          footer={null}
        >
          <h3>{`${currentApplication.first_name} ${currentApplication.last_name}`}</h3>
          {currentApplication.role_name === 'mentee' ? (
            //Mentee Application Information
            <div>
              email: {currentApplication.email}
              <br></br>
              Location: {currentApplication.city}, {currentApplication.state}{' '}
              {currentApplication.country}
              <br></br>
              Convictions:{' '}
              {`${
                currentApplication.formerly_incarcerated === true
                  ? currentApplication.list_convictions
                  : 'none'
              }`}
              <br></br>
              Experience Level: {currentApplication.experience_level}
              {`${currentApplication.low_income === true ? 'Low Income' : ''}`}
              {`${
                currentApplication.underrepresented_group === true
                  ? 'Belongs to Underrepresented group'
                  : ''
              }`}
              <br></br>
              Applicant needs help with:{' '}
              {`${
                currentApplication.industry_knowledge === true
                  ? 'Industry Knowledge,'
                  : ''
              } ${currentApplication.job_help === true ? 'Job Help,' : ''} ${
                currentApplication.pair_programming === true
                  ? ' Pair Programming'
                  : ''
              }`}
              <br></br>
              Subject most interested in: {currentApplication.subject}
              <br></br>
              Role: {currentApplication.role_name}
              <br></br>
              Other information: {currentApplication.other_info}
              <br></br>
              Submission Date: {currentApplication.created_at}
              <br></br>
              Application Status: {currentApplication.validateStatus}
            </div>
          ) : (
            //Mentor Application Information
            <div>
              Email: {currentApplication.email}
              <br></br>
              Location: {currentApplication.city}, {currentApplication.state}{' '}
              {currentApplication.country}
              <br></br>
              Current Employer: {currentApplication.current_comp}
              <br></br>
              Tech Stack: {currentApplication.tech_stack}
              <br></br>
              Experience Level {currentApplication.experience_level}
              <br></br>
              Applicant wants to focus on:{' '}
              {`${
                currentApplication.industry_knowledge === true
                  ? 'Industry Knowledge,'
                  : ''
              } ${currentApplication.job_help === true ? 'Job Help,' : ''} ${
                currentApplication.pair_programming === true
                  ? ' Pair Programming'
                  : ''
              }`}
              <br></br>
              Role: {currentApplication.role_name}
              <br></br>
              Other information: {currentApplication.other_info}
              <br></br>
              Submission Date: {currentApplication.created_at}
              <br></br>
              Application Status: {currentApplication.validateStatus}
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ApplicationModal;
