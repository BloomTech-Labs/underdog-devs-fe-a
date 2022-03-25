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
    console.log('wow', props);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Notes</h2>
        <Button
          className="add-note-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1em 0.5em',
          }}
          onClick={filterByUser}
        >
          My Notes
        </Button>
        <Button
          className="add-note-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1em 0.5em',
          }}
          onClick={showModal}
        >
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

export default Notes;
