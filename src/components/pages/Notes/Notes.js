import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NotesForm from './NotesForm';
import NotesTable from '../../common/NotesTable';
const Notes = props => {
  const [displayModal, setDisplayModal] = useState(false);

  const showModal = () => {
    setDisplayModal(true);
  };

  const filterByUser = () => {
    // filter by user
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Memos</h2>
        <Button className="add-note-button" onClick={filterByUser}>
          My Memos
        </Button>
        <Button className="add-note-button" onClick={showModal}>
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

export default Notes;
