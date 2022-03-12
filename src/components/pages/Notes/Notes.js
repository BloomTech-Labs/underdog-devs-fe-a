import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import Note from './Note';
import { Table, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const Notes = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('https://mocki.io/v1/ad7eaaca-470f-4da9-a28a-349200e9263b')
      .then(res => {
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
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Notes</h2>
        <Link to="/notesform">
          <Button
            className="add-note-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1em 0.5em',
            }}
          >
            <PlusCircleOutlined />
            Add Note
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={items} />
    </>
  );
};

export default Notes;
