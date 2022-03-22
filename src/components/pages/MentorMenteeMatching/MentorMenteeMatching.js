import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import MentorMenteeInfo from './MentorMenteeInfo';
import { Table, Tag } from 'antd';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = () => {
      axiosWithAuth()
        .get('/assignments')
        .then(res => {
          setAssignments(res.data);
        });
    };
    getAssignments();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: tag => (
        <Tag color={tag === 'Unmatched' ? 'red' : 'green'}>{tag}</Tag>
      ),
    },
    { title: 'Stack', dataIndex: 'stack', key: 'stack' },
  ];

  const data = [];

  assignments.map(p => {
    const profile = {
      key: p.profile_id,
      name: `${p.first_name} ${p.last_name}`,
      contact: p.email,
      stack: 'HTML, JS, CSS',
      description: 'Description goes here',
      tags: p.matched ? 'Matched' : 'Unmatched',
    };
    data.push(profile);
  });

  return (
    <>
      <h2>Matching</h2>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => (
            <div style={{ margin: 0 }}>
              <MentorMenteeInfo />
            </div>
          ),
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </>
  );
};

export default MentorMenteeMatching;
