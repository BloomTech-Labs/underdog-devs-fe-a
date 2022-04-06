import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Table, Grid } from 'antd';
import '../../common/styles/Resources.css';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import useForms from '../../../hooks/useForms';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    sm: {
      span: 16,
    },
  },
};

const MenteeAddReview = () => {
  const [formValues, setFormValues] = useState({
    Mentee_name: '',
    review: '',
  });

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault()
      // axiosWithAuth()
      .post(`/reviews`, formValues)
      .then(res => {})
      .catch(err => console.log({ err }));
  };

  return (
    <Form
      {...formItemLayout}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ fontWeight: 'bold', paddingLeft: '1.3rem' }}>
        Please fill out a review
      </p>
      <Form.Item
        name="mentor_name"
        label="Mentor Name"
        value={formValues.mentor_name}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentor name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mentee_review"
        label="Mentee Review"
        value={formValues.mentor_review}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentor review' }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item style={{ alignSelf: 'center' }}>
        <Button onClick={handleSubmit}>Submit review</Button>
      </Form.Item>
    </Form>
  );
};

export default MenteeAddReview;
