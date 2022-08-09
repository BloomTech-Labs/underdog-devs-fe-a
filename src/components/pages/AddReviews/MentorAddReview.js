import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import '../../common/styles/Resources.css';

const { TextArea } = Input;

const MentorAddReview = () => {
  const [formValues, setFormValues] = useState({
    mentee_name: '',
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
    <Card
      title="Please fill out a review"
      style={{
        width: '40rem',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
      headStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Form.Item
        name="mentee_name"
        label="Mentee Name"
        labelCol={{ span: 8 }}
        value={formValues.mentee_name}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentee name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mentee_review"
        label="Mentee Review"
        labelCol={{ span: 8 }}
        value={formValues.mentee_review}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentee review' }]}
      >
        <TextArea size="large" />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button onClick={handleSubmit}>Submit review</Button>
      </Form.Item>
    </Card>
  );
};

export default MentorAddReview;
