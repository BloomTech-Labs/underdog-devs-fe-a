import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal } from 'antd';
import '../../../styles/styles.css';

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
          title="Application"
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          className="modalStyle"
          footer={null}
        >
          <h3>{`${currentApplication.first_name} ${currentApplication.last_name}`}</h3>
          {currentApplication.role_name === 'mentee' ? (
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
              Submission Date: {currentApplication.created_at.slice(0, 10)}
              <br></br>
              Application Status: {currentApplication.validateStatus}
            </div>
          ) : (
            <div>
              <b>Email:</b> {currentApplication.email}
              <br></br>
              <b>Location:</b> {currentApplication.city},{' '}
              {currentApplication.state} {currentApplication.country}
              <br></br>
              <b>Current Employer:</b> {currentApplication.current_comp}
              <br></br>
              <b>Tech Stack:</b> {currentApplication.tech_stack}
              <br></br>
              <b>Experience Level:</b> {currentApplication.experience_level}
              <br></br>
              <b>Applicant wants to focus on:</b>{' '}
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
              <b>Role:</b> {currentApplication.role_name}
              <br></br>
              <b>Other information:</b> {currentApplication.other_info}
              <br></br>
              <b>Submission Date:</b>{' '}
              {currentApplication.created_at.slice(0, 10)}
              <br></br>
              <b>Application Status:</b> {currentApplication.validateStatus}
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ApplicationModal;
