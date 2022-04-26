import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import MemosTable from '../../common/MemosTable';
import MemosForm from './MemosForm';
const MyMemos = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const showModal = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Memos</h2>
        <Button className="add-memo-button">
          <a href="/mynotes">Memos</a>
        </Button>
        <Button className="add-memo-button" onClick={showModal} type="primary">
          <PlusCircleOutlined />
          Send Memo
        </Button>
        <MemosForm
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
        />
      </div>
      <MemosTable />
    </>
  );
};

export default MyMemos;
