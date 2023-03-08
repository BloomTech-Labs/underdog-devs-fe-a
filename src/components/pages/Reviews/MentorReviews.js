import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Table } from 'antd';

const columns = [{ title: 'Mentor', dataIndex: 'name', key: 'name' }];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const axiosWithAuth = useAxiosWithAuth0();

  useEffect(() => {
    const getReviews = () => {
      axiosWithAuth
        .get('/reviews')
        .then(res => {
          setReviews(
            res.data.map(row => ({
              key: row.review_id,
              name: row.mentor_id,
              notes: 'Mentee ID: ' + row.mentee_id + '. Review: ' + row.review,
            }))
          );
        })
        .catch(err => {
          console.log(err);
        });
    };
    getReviews();
  });

  return (
    <>
      <h1>Mentor Reviews</h1>
      <Table
        rowKey="your_data_id"
        columns={columns}
        dataSource={reviews}
        expandable={{
          expandedRowRender: record => (
            <p style={{ margin: 5 }}>{record.notes}</p>
          ),
        }}
      />
    </>
  );
};

export default Reviews;
