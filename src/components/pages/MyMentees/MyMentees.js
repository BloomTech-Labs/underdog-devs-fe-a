import React, { useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
  },
  {
    title: 'Info',
  },
  {
    title: 'Profile',
  },
];

const MyMentees = props => {
  return (
    <>
      <div>
        <h2>My Mentees</h2>
        <Table columns={columns} />
      </div>
    </>
  );
};

export default MyMentees;
