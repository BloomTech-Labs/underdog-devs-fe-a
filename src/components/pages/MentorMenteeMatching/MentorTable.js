import React from 'react';
import { Table } from 'antd';
import './MentorTable.css';

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

// This data will be imported by the BE in the future
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

const MentorTable = props => {
  const [selectedMentorKeys, setSelectedMentorKeys] = props.selectedMentors;

  const rowSelection = {
    selectedRowKeys: selectedMentorKeys,
    onChange: newSelectedKeys => setSelectedMentorKeys(newSelectedKeys),
    hideSelectAll: true,
  };

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        className="assignMentorTable"
      />
    </div>
  );
};

export default MentorTable;
