import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Radio, Space } from 'antd';

const initialFormValues = {
  email: '',
  location: '',
  name: '',
  current_comp: '',
  tech_stack: '',
  can_commit: '',
  how_commit: '',
  other_info: '',
};

const Mentor = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        'https://underdog-devs-a-api.herokuapp.com/application/new-mentor',
        newAccount
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmit = () => {
    const newAccount = formValues;
    postNewAccount(newAccount);
  };

  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Form onFinish={formSubmit}>
      <div>
        <h1> Mentor Application </h1>
        <div className="email">
          <Form.Item
            label="Email*"
            type="email"
            name="email"
            value={formValues.email}
            onChange={evt => {
              inputChange('email', evt.target.value);
            }}
          >
            <Input placeholder="Enter valid email" />
          </Form.Item>
        </div>

        <div className="location">
          <Form.Item
            label="Location*"
            type="text"
            name="location"
            value={formValues.location}
            onChange={evt => {
              inputChange('location', evt.target.value);
            }}
          >
            <Input placeholder="Your Location" />
          </Form.Item>
        </div>

        <div className="name">
          <Form.Item
            label="Name*"
            type="text"
            name="name"
            value={formValues.name}
            onChange={evt => {
              inputChange('name', evt.target.value);
            }}
          >
            <Input placeholder="Your Name" />
          </Form.Item>
        </div>

        <div className="current_comp">
          <h3>Current company/position?</h3>
          <Form.Item
            type="text"
            name="current_comp"
            value={formValues.current_comp}
            onChange={evt => {
              inputChange('current_comp', evt.target.value);
            }}
          >
            <Input placeholder="Your answer" />
          </Form.Item>
        </div>

        <div className="tech_stack">
          <h3>What is your tech stack?*</h3>
          <Form.Item
            type="text"
            name="tech_stack"
            value={formValues.tech_stack}
            onChange={evt => {
              inputChange('tech_stack', evt.target.value);
            }}
          >
            <Input placeholder="Your answer" />
          </Form.Item>
        </div>

        <div className="can_commit">
          <h3>
            Can you commit to 1:1 mentoring of one or more mentees at a cadence
            you both decide upon or a minimum of 1 hour per week pair program
            (problem solving) with a mentee in our stipend program?*
          </h3>
          <Radio.Group value={formValues.can_commit}>
            <Space direction="vertical">
              <Radio
                onChange={evt => {
                  inputChange('can_commit', evt.target.value);
                }}
                value="1:1 Mentoring"
              >
                1:1 Mentoring
              </Radio>
              <Radio
                onChange={evt => {
                  inputChange('can_commit', evt.target.value);
                }}
                value="Pair Program"
              >
                Pair Program
              </Radio>
              <Radio
                onChange={evt => {
                  inputChange('can_commit', evt.target.value);
                }}
                value="Neither"
              >
                Neither
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className="how_commit">
          <h3>
            If you can not commit to 1:1 mentoring or pair programming what type
            of commitment did you have in mind to help our mentees? *
          </h3>
          <Form.Item
            type="text"
            name="how_commit"
            value={formValues.how_commit}
            onChange={evt => {
              inputChange('how_commit', evt.target.value);
            }}
          >
            <Input placeholder="Your answer" />
          </Form.Item>
        </div>

        <div className="other_info">
          <h3>Anything else you want us to know?</h3>
          <Form.Item
            type="text"
            name="other_info"
            value={formValues.other_info}
            onChange={evt => {
              inputChange('other_info', evt.target.value);
            }}
          >
            <Input placeholder="Your answer" />
          </Form.Item>
        </div>

        <Button htmlType="submit" id="button">
          {' '}
          Submit{' '}
        </Button>
      </div>
    </Form>
  );
};

export default Mentor;
