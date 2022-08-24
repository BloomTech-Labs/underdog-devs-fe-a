import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Table, Tag, Button } from 'antd';
import MatchingModal from './MatchingModal';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);
  const [modal, setModal] = useState({ show: false, data: null });
  const [selectedMentorKeys, setSelectedMentorKeys] = useState([]);

  useEffect(() => {
    // assignments in this sense means assigned mentees
    axiosWithAuth()
      .get('/assignments')
      .then(res => {
        setAssignments(conformData(res.data));
      });
  }, []);

  const resetModal = () => {
    setSelectedMentorKeys([]);
    setModal({ show: false, data: null });
  };

  const showModal = mentee => {
    setModal({ show: true, data: mentee });
    setSelectedMentorKeys(mentee.matchedMentors);
    console.log('mentee: ', mentee);
  };

  const handleCancel = () => {
    resetModal();
  };

  const handleSave = (menteeId, selectedMentorKeys) => {
    // 1. Attempt to save new data to DS DB
    // 2. If save successful, update slice of state to reflect changes
    // 3. If unsuccessful, exit modal without saving state

    console.log('menteeId: ', menteeId);
    if (menteeId) {
      const test = assignments.filter(mentee => mentee.key === menteeId)[0];
      console.log(test, menteeId, selectedMentorKeys, assignments);

      // setAssignments([
      //   ...assignments,
      //   assignments.filter(mentee => mentee.key === menteeId)[0].matchedMentors = selectedMentorKeys
      // ]);
    }

    resetModal();
  };

  const conformData = data => {
    return data.map(p => {
      return {
        key: p.profile_id,
        name: `${p.first_name} ${p.last_name}`,
        contact: p.email,
        stack: splitTechStack(p),
        description: 'Description goes here',
        tags: p.matched ? 'Matched' : 'Unmatched',
        email: p.email,
        location: p.location,
        company: p.company,
        matchedMentors: p.selectedMentorKeys || [],
      };
    });
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

  return (
    <>
      <h2>Matching</h2>
      <Table columns={columns} dataSource={assignments} />
      <MatchingModal
        handleCancel={handleCancel}
        handleSave={handleSave}
        modal={modal}
        selectedMentors={[selectedMentorKeys, setSelectedMentorKeys]}
      />
    </>
  );
};

export default MentorMenteeMatching;
