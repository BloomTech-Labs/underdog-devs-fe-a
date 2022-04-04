import React from 'react';

import NotesTable from '../../common/./NotesTable';
const MyNotes = () => {
  console.log(Date.now());
  return (
    <div>
      <NotesTable />
    </div>
  );
};

export default MyNotes;
