import React, { useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Table } from 'antd';

const columns = [
  {
    title: 'Mentor',
    dataIndex: 'name',
  },
  {
    title: 'Stack',
    dataIndex: 'stack',
  },
  {
    title: 'Location',
    dataIndex: 'location',
  },
  {
    title: 'Additonal Notes',
    dataIndex: 'additonalNotes',
  },
  {
    title: '#Mentees',
    dataIndex: 'numMentees',
  },
];
const data = [
  {
    key: '1',
    name: 'john doe',
    stack: 'React',
    location: 'New York',
    numMentees: '3',
    additonalNotes: 'hello',
  },
  {
    key: '2',
    name: 'john william',
    stack: 'Express',
    location: 'Washington',
    numMentees: '5',
    additonalNotes: 'hello',
  },
  {
    key: '3',
    name: 'john doe',
    stack: 'SQL',
    location: 'Florida',
    numMentees: '0',
    additonalNotes: 'hello',
  },
];

const MentorTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: newSelectedKeys => setSelectedRowKeys(newSelectedKeys),
    hideSelectAll: true,
  };

  return (
    <div>
      {/* checkbox has a bug to where the bottome of the box looks odd */}
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default MentorTable;
