import React from 'react';
import { Modal, Row, Col } from 'antd';
import MentorTable from './MentorTable';

const MatchingModal = props => {
  const { modal, handleCancel, handleSave, selectedMentors } = props;
  const [selectedMentorKeys, setSelectedMentorKeys] = selectedMentors;

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
