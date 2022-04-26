import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NotesTable from '../../common/NotesTable';
import NotesForm from './NotesForm';
const MyMemos = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const showModal = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Memos</h2>
        <Button className="add-note-button">
          <a href="/mynotes">Memos</a>
        </Button>
        <Button className="add-note-button" onClick={showModal} type="primary">
          <PlusCircleOutlined />
          Send Memo
        </Button>
        <NotesForm
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
        />
      </div>
      <NotesTable />
    </>
  );
};

export default MyMemos;
