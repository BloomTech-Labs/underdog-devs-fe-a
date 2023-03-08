import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Table, Tag, Button } from 'antd';
import MatchingModal from './MatchingModal';
import dummyData from '../MyMentees/data.json';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);
  const [modal, setModal] = useState({ show: false, data: null });
  const [selectedMentorKeys, setSelectedMentorKeys] = useState([]);
  const { axiosWithAuth } = useAxiosWithAuth0();

  useEffect(() => {
    // assignments in this sense means assigned mentees
    axiosWithAuth()
      .get('/assignments/mentor/f299125d-15a7-4721-a3b1-498733fa5e02')
      .then(res => {
        setAssignments(conformData(res.data));
      });
  });

  const resetModal = () => {
    setSelectedMentorKeys([]);
    setModal({ show: false, data: null });
  };

  const showModal = mentee => {
    setModal({ show: true, data: mentee });
    setSelectedMentorKeys(mentee.matchedMentors);
  };

  const handleCancel = () => {
    resetModal();
  };

  const handleSave = (menteeId, selectedMentorKeys) => {
    // 1. Attempt to save new data to DS DB
    // 2. If save successful, update slice of state to reflect changes
    // 3. If unsuccessful, exit modal without saving state

    if (menteeId) {
      const tempAssignments = assignments;
      tempAssignments.filter(
        mentee => mentee.key === menteeId
      )[0].matchedMentors = selectedMentorKeys;

      setAssignments(tempAssignments);
    }

    resetModal();
  };

  // I wasn't sure if this 'data mapping' was necessary so I kept it in for now
  const conformData = data => {
    return data.map(p => {
      return {
        key: p.profile_id,
        name: `${p.first_name} ${p.last_name}`,
        contact: p.email,
        stack: splitTechStack(p.tech_stack),
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
  const splitTechStack = techStackArray => {
    return techStackArray.join(', ');
  };

  return (
    <>
      <h2>Matching</h2>
      <Table columns={columns} dataSource={dummyData} />
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
