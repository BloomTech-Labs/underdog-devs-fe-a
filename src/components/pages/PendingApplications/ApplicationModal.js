import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import { Modal } from 'antd';

const ApplicationModal = props => {
  const [currentApplication, setCurrentApplication] = useState({});
  const { profileId, displayModal, setDisplayModal } = props;

  const handleOk = () => {
    setDisplayModal(false);
  };

  const handleCancel = () => {
    setDisplayModal(false);
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
      <Modal
        title="Application Modal"
        visible={displayModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <h3>{`${currentApplication.first_name} ${currentApplication.last_name}`}</h3>
        Can commit: {`${currentApplication.can_commit === true ? 'yes' : 'no'}`}
        <br></br>
        Submission Date: {currentApplication.created_at}
        <br></br>
        Current Employer: {currentApplication.current_comp}
        <br></br>
        Email: {currentApplication.email}
        <br></br>
        Availability: {currentApplication.how_commit}
        <br></br>
        Location: {currentApplication.location}
        <br></br>
        Progress Status: {currentApplication.progress_status}
        <br></br>
        Role: {currentApplication.role_name}
        <br></br>
        Tech Stack: {currentApplication.tech_stack}
        <br></br>
        Notes: {currentApplication.other_info}
        <br></br>
      </Modal>
    </>
  );
};

export default ApplicationModal;
