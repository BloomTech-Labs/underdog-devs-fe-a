/* 
All of the commented out code on this page is to remove the 'no-unused-vars' warnings in the console
*/
import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import MemosForm from './MemosForm';
import MemosTable from '../../common/MemosTable';

const Memos = props => {
  const [displayModal, setDisplayModal] = useState(false);

  const showModal = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Memos</h2>
        <Button className="add-memo-button">
          <a href="/mymemos">My Memos</a>
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

export default Memos;
