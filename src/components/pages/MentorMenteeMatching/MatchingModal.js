import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal, Row, Col } from 'antd';
import MentorTable from './MentorTable';

const MatchingModal = props => {
  const { modal, handleCancel } = props;

  return (
    <Modal
      title={`Match Mentee ${modal.data?.name}`}
      width={'80vw'}
      visible={modal.show}
      onCancel={handleCancel}
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
      <MentorTable />
    </Modal>
  );
};

export default MatchingModal;
