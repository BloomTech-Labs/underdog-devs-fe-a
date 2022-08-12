import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Table, Tag, Button } from 'antd';
import MatchingModal from './MatchingModal';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);
  const [modal, setModal] = useState({ show: false, data: null });

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

  const showModal = mentee => {
    setModal({ show: true, data: mentee });
  };

  const handleCancel = () => {
    setModal({ show: false, data: null });
  };

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
    {
      title: '',
      dataIndex: 'name',
      key: 'assignButton',
      render: (text, record) => (
        <Button size="large" type="primary" onClick={() => showModal(record)}>
          Assign Mentor
        </Button>
      ),
    },
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
      <MatchingModal handleCancel={handleCancel} modal={modal} />
    </>
  );
};

export default MentorMenteeMatching;
