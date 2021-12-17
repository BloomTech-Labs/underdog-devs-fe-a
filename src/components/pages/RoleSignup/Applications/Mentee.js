import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Radio } from 'antd';
import './Styles/application.css';

const initialFormValues = {
  email: '',
  location: '',
  name: '',
  lives_in_us: '',
  formerly_incarcerated: '',
  list_convictions: '',
  tech_stack: '',
  experience_level: '',
  your_hopes: '',
  other_info: '',
};

const Mentee = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        'https://underdog-devs-a-api.herokuapp.com/application/new-mentee',
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
    <div className="application">
      <Form onFinish={formSubmit}>
        <div className="signUpForm">
          <h1> Mentee Application </h1>
          <div className="questions">
            <div className="infoDiv">
              <h3>Please fill out your user information</h3>
              <br />
              <div className="name">
                <div className="titleContainer">
                  <h3>Full Name*</h3>
                </div>
                <Form.Item
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
              <div className="email">
                <div className="titleContainer">
                  <h3>Email*</h3>
                </div>
                <Form.Item
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
                <div className="titleContainer">
                  <h3>Location*</h3>
                </div>
                <Form.Item
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
            </div>
            <hr />
            <div className="lives_in_us">
              <h3>Do you live in the U.S?*</h3>
              <Radio.Group value={formValues.lives_in_us}>
                <Radio
                  onChange={evt => {
                    inputChange('lives_in_us', evt.target.value);
                  }}
                  value="Yes"
                >
                  Yes
                </Radio>
                <Radio
                  onChange={evt => {
                    inputChange('lives_in_us', evt.target.value);
                  }}
                  value="No"
                >
                  No
                </Radio>
              </Radio.Group>
            </div>
            <br />
            <div className="formerly_incarcerated">
              <h3>Are you formerly incarcerated/have a felony?*</h3>
              <Radio.Group value={formValues.formerly_incarcerated}>
                <Radio
                  onChange={evt => {
                    inputChange('formerly_incarcerated', evt.target.value);
                  }}
                  value="Yes"
                >
                  Yes
                </Radio>
                <Radio
                  onChange={evt => {
                    inputChange('formerly_incarcerated', evt.target.value);
                  }}
                  value="No"
                >
                  No
                </Radio>
              </Radio.Group>
            </div>
            <hr />
            <br />
            <div className="list_convictions">
              <h3>Please list your convictions if comfortable</h3>
              <Form.Item
                type="text"
                name="list_convictions"
                value={formValues.list_convictions}
                onChange={evt => {
                  inputChange('list_convictions', evt.target.value);
                }}
              >
                <Input.TextArea placeholder="Your answer" />
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
                <Input.TextArea placeholder="Your answer" />
              </Form.Item>
            </div>

            <div className="experience_level">
              <h3>What is your level of experience?*</h3>
              <Form.Item
                type="text"
                name="experience_level"
                value={formValues.experience_level}
                onChange={evt => {
                  inputChange('experience_level', evt.target.value);
                }}
              >
                <Input.TextArea placeholder="Your answer" />
              </Form.Item>
            </div>

            <div className="your_hopes">
              <h3>What are you hoping to gain from the community?*</h3>
              <Form.Item
                type="text"
                name="your_hopes"
                value={formValues.your_hopes}
                onChange={evt => {
                  inputChange('your_hopes', evt.target.value);
                }}
              >
                <Input.TextArea placeholder="Your goals" />
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
                <Input.TextArea placeholder="Your answer" />
              </Form.Item>
            </div>
            <hr />
          </div>
          <Button htmlType="submit" id="button">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Mentee;
