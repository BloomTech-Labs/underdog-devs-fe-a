import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { columns } from './NoteUtils';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const NotesTable = () => {
  const [data, setData] = useState([]);

  // Dummy data for table
  useEffect(() => {
    axiosWithAuth()
      .get('https://mocki.io/v1/d52d79b6-7bc3-4fdb-8aea-25140c9a1041')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return <Table columns={columns} dataSource={data} />;
};

export default NotesTable;
