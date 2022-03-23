import React, { useState, useEffect } from 'react';
import { Button, Avatar, Card, Comment, Table } from 'antd';
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: record => (
          <>
            <Card style={{ marginBottom: '1%' }}>
              <>
                <Comment
                  actions={[<Button type="primary">Reply</Button>]}
                  author={record.createdBy}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt={record.createdBy}
                    />
                  }
                  content={<p>{record.note}</p>}
                ></Comment>
              </>
            </Card>
          </>
        ),
      }}
    />
  );
};

export default NotesTable;
