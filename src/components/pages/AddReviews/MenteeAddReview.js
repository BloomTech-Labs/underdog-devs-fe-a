import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import '../../common/styles/Resources.css';

const { TextArea } = Input;

const MenteeAddReview = () => {
  const [formValues, setFormValues] = useState({
    mentor_name: '',
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
        name="mentor_name"
        label="Mentor Name"
        labelCol={{ span: 8 }}
        value={formValues.mentor_name}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentor name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mentor_review"
        label="Mentor Review"
        labelCol={{ span: 8 }}
        value={formValues.mentor_review}
        onChange={handleChange}
        rules={[{ required: true, message: 'Please input a mentor review' }]}
      >
        <TextArea size="large" />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button onClick={handleSubmit}>Submit review</Button>
      </Form.Item>
    </Card>
  );
};

export default MenteeAddReview;
