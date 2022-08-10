import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal } from 'antd';

const MatchingModal = props => {
  const { isModalVisible, handleCancel } = props;

  return (
    <Modal
      title="Match Mentee(name)"
      visible={isModalVisible}
      onCancel={handleCancel}
    />
  );
};

export default MatchingModal;
