import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal, Row, Col } from 'antd';
import MentorTable from './MentorTable';
import LoadingComponent from '../../common/LoadingComponent';
import { Spin } from 'antd';

const MatchingModal = props => {
  const { modal, handleCancel, handleSave, selectedMentors } = props;
  const [selectedMentorKeys, setSelectedMentorKeys] = selectedMentors;

  const saveChanges = (menteeId, selectedMentorKeys) => {
    console.log('saving: ', menteeId, selectedMentorKeys);
    handleSave(menteeId, selectedMentorKeys);
  };

  console.log('modal: ', modal);

  return (
    <Modal
      title={`Match Mentee ${modal.data?.name}`}
      width={'80vw'}
      visible={modal.show}
      onCancel={handleCancel}
      onOk={() => handleSave(modal.data.key, selectedMentorKeys)}
      okText={'Save Changes'}
      maskClosable={false}
    >
      <Row>
        <Col span={8}>
          <p>{modal.data?.contact}</p>
        </Col>
        <Col span={8}>
          <p>{modal.data?.location}</p>
        </Col>
        <Col span={8}>
          <p>{modal.data?.stack}</p>
        </Col>
      </Row>
      <MentorTable
        selectedMentors={selectedMentors}
        selectedMentee={modal.data}
      />
    </Modal>
  );
};

export default MatchingModal;
