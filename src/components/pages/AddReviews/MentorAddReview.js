import React, { useState} from 'react';
import { Form, Input, Button } from 'antd';
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

const MentorAddReview = () => {
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
        name="mentee_name"
        label="Mentee Name"
        value={formValues.mentee_name}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentee name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mentee_review"
        label="Mentee Review"
        value={formValues.mentee_review}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentee review' }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item style={{ alignSelf: 'center' }}>
        <Button onClick={handleSubmit}>Submit review</Button>
      </Form.Item>
    </Form>
  );
};

export default MentorAddReview;
