import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Radio, Breadcrumb, Select, Checkbox } from 'antd';
import {
  LoginOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import './Styles/application.css';
import { states } from '../../../common/constants';
const { Option } = Select;

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  city: '',
  state: '',
  country: '',
  underrepresented_group: false,
  low_income: false,
  formerly_incarcerated: false,
  list_convictions: '',
  subject: '',
  experience_level: '',
  job_help: false,
  industry_knowledge: false,
  pair_programming: false,
  other_info: '',
};

const Mentee = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}application/new/mentee`,
        newAccount
      );
      console.log('post response', response);
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
    <div>
      <div className="breadcrumbs">
        <Breadcrumb>
          <Breadcrumb.Item href="/login">
            <LoginOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/signup">
            <IdcardOutlined />
            <span>Signup</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <ReconciliationOutlined />
            <span>Mentee Application</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="application">
        <Form onFinish={formSubmit}>
          <div className="signUpForm">
            <h1> Mentee Application </h1>
            <div className="questions">
              <div className="infoDiv">
                <h3>Please fill out your user information</h3>
                <br />
                <div className="firstName">
                  <div className="titleContainer">
                    <h3>First Name*</h3>
                  </div>
                  <Form.Item
                    type="text"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: 'First name is required!',
                      },
                    ]}
                    value={formValues.first_name}
                    onChange={evt => {
                      inputChange('first_name', evt.target.value);
                    }}
                  >
                    <Input placeholder="Your First Name" />
                  </Form.Item>
                </div>
                <div className="lastName">
                  <div className="titleContainer">
                    <h3>Last Name*</h3>
                  </div>
                  <Form.Item
                    type="text"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Last name is required!',
                      },
                    ]}
                    value={formValues.last_name}
                    onChange={evt => {
                      inputChange('last_name', evt.target.value);
                    }}
                  >
                    <Input placeholder="Your Last Name" />
                  </Form.Item>
                </div>
                <div className="email">
                  <div className="titleContainer">
                    <h3>Email*</h3>
                  </div>
                  <Form.Item
                    type="email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Email is required!',
                      },
                    ]}
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
                  <div>
                    <label>Are you located in the US? *</label>
                    <Radio.Group
                      name="livesInUS"
                      onChange={evt => {
                        inputChange('country', evt.target.value);
                      }}
                      value={formValues.country}
                    >
                      <Radio value={'USA'}>Yes</Radio>
                      <Radio value={'Other'}>No</Radio>
                    </Radio.Group>
                  </div>
                  {formValues.country !== 'USA' && formValues.country !== '' && (
                    <Form.Item
                      type="text"
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: 'Country is required!',
                        },
                      ]}
                      value={formValues.country}
                      onChange={evt => {
                        inputChange('country', evt.target.value);
                      }}
                    >
                      <Input placeholder="Country" />
                    </Form.Item>
                  )}
                  {formValues.country === 'USA' && (
                    <div>
                      <Form.Item
                        type="text"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: 'City is required!',
                          },
                        ]}
                        value={formValues.city}
                        onChange={evt => {
                          inputChange('city', evt.target.value);
                        }}
                      >
                        <Input placeholder="City" />
                      </Form.Item>
                      <Select
                        defaultValue="State"
                        style={{ width: 200 }}
                        onChange={value => {
                          inputChange('state', value);
                        }}
                      >
                        {states.map(state => (
                          <Option value={state}> {state} </Option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
              </div>
              <hr />

              <br />
              <div className="formerly_incarcerated">
                <h3>
                  Which criteria represents you for membership? Check All That
                  Apply
                </h3>
                <Checkbox.Group style={{ width: '100%' }}>
                  <Checkbox
                    value="formerly_incarcerated"
                    onChange={evt => {
                      inputChange(
                        evt.target.value,
                        !formValues.formerly_incarcerated
                      );
                    }}
                  >
                    Formerly incarcerated
                  </Checkbox>
                  <Checkbox
                    value="low_income"
                    onChange={evt => {
                      inputChange(evt.target.value, !formValues.low_income);
                    }}
                  >
                    From a lower socioeconomic background
                  </Checkbox>
                  <Checkbox
                    value="underrepresented_group"
                    onChange={evt => {
                      inputChange(
                        evt.target.value,
                        !formValues.underrepresented_group
                      );
                    }}
                  >
                    From an underrepresented group
                  </Checkbox>
                </Checkbox.Group>
              </div>
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
              <hr />
              <br />
              <div className="tech_stack">
                <h3>
                  Which best describes the tech path you are working towards or
                  are interested in? *
                </h3>
                <Select
                  defaultValue="- Select -"
                  onChange={evt => {
                    inputChange('subject', evt);
                  }}
                >
                  <Option value="career">Career Development</Option>
                  <Option value="frontend">Frontend Development</Option>
                  <Option value="backend">Backend Development</Option>
                  <Option value="design">Design UI/UX</Option>
                  <Option value="iOS">iOS Development</Option>
                  <Option value="android">Android Development</Option>
                </Select>
              </div>
              <div className="experience_level">
                <h3>What is your level of experience?*</h3>
                <Radio.Group
                  name="experience_level"
                  onChange={evt => {
                    inputChange('experience_level', evt.target.value);
                  }}
                  value={formValues.experience_level}
                >
                  <Radio value={'beginner'}>Beginner</Radio>
                  <Radio value={'intermediate'}>Intermediate</Radio>
                  <Radio value={'expert'}>Expert</Radio>
                </Radio.Group>
              </div>
              <div className="your_hope">
                <h3>What are you hoping to gain from the community?*</h3>
                <Checkbox.Group style={{ width: '100%' }}>
                  <Checkbox
                    value="job_help"
                    onChange={evt => {
                      inputChange(evt.target.value, !formValues.job_help);
                    }}
                  >
                    Job search help
                  </Checkbox>
                  <Checkbox
                    value="industry_knowledge"
                    onChange={evt => {
                      inputChange(
                        evt.target.value,
                        !formValues.industry_knowledge
                      );
                    }}
                  >
                    Learn more about the tech industry
                  </Checkbox>
                  <Checkbox
                    value="pair_programming"
                    onChange={evt => {
                      inputChange(
                        evt.target.value,
                        !formValues.pair_programming
                      );
                    }}
                  >
                    Pair programming / coding practice
                  </Checkbox>
                </Checkbox.Group>
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
            </div>
            <Button htmlType="submit" id="button">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Mentee;
