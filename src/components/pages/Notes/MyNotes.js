import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NotesTable from '../../common/./NotesTable';
import NotesForm from './NotesForm';
const MyNotes = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const showModal = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Notes</h2>
        <Button className="add-note-button">
          <a href="/notes">Notes</a>
        </Button>
        <Button className="add-note-button" onClick={showModal}>
          <PlusCircleOutlined />
          Add Note
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

export default MyNotes;
