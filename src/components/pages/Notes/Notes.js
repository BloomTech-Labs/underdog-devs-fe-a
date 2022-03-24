import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Table, Input, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NotesForm from './NotesForm';

const Notes = props => {
  const [items, setItems] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get('https://mocki.io/v1/94a4eccc-f153-4d24-a6db-307f780a4d9e')
      .then(res => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: 'Created By',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Visibility',
      dataIndex: 'visibilty',
      key: 'visibility',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Concern Level',
      dataIndex: 'concern',
      key: 'concern',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
  ];

  const showModal = () => {
    setDisplayModal(true);
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
      <Table
        columns={columns}
        dataSource={items}
        expandable={{
          expandedRowRender: record => (
            <p style={{ margin: 0 }}>{record.note}</p>
          ),
        }}
      />
    </>
  );
};

export default Notes;
