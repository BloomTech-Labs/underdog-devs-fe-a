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

  // adds commas in-between the programming languages
  const splitTechStack = obj => {
    let string = '';
    for (let i = 0; i < obj.tech_stack.length; i++) {
      if (i === obj.tech_stack.length - 1) {
        string += `${obj.tech_stack[i]}`;
      } else string += `${obj.tech_stack[i]}, `;
    }
    return string;
  };

  // eslint-disable-next-line array-callback-return
  assignments.map(p => {
    const profile = {
      key: p.profile_id,
      name: `${p.first_name} ${p.last_name}`,
      contact: p.email,
      stack: splitTechStack(p),
      description: 'Description goes here',
      tags: p.matched ? 'Matched' : 'Unmatched',
      email: p.email,
      location: p.location,
      company: p.company,
    };
    data.push(profile);
  });

  return (
    <>
      <h2>Matching</h2>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default MentorMenteeMatching;
