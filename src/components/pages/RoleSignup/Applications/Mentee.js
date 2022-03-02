import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Button,
  Radio,
  Breadcrumb,
  Select,
  Checkbox,
  Row,
  Col,
  Typography,
} from 'antd';

import {
  LoginOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { states } from '../../../common/constants';
import './Styles/menteeApplication.css';

const { Title } = Typography;

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
        `${process.env.REACT_APP_API_URI}/application/new/Mentees`,
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
      <Row style={{ padding: '3vh' }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/login">
            <LoginOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/apply">
            <IdcardOutlined />
            <span>Apply</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <ReconciliationOutlined />
            <span>Mentee Application</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="menteeApplication">
        <Col span={24} className="applicationForm">
          <Form onFinish={formSubmit} style={{ borderRadius: '30px' }}>
            <Title className="menteeTitle" level={3}>
              Mentee Application
            </Title>
            <Col span={18} offset={3}>
              <Title style={{ paddingBottom: '5%' }} level={5}>
                Please fill out your user information
              </Title>

              <Row gutter={[16, 16]}>
                <Col md={12} xs={24}>
                  <Form.Item
                    label="First Name"
                    type="text"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: 'First name is required.',
                      },
                    ]}
                    value={formValues.first_name}
                    onChange={evt => {
                      inputChange('first_name', evt.target.value);
                    }}
                  >
                    <Input placeholder="Your First Name" />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Last Name"
                    type="text"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Last name is required.',
                      },
                    ]}
                    value={formValues.last_name}
                    onChange={evt => {
                      inputChange('last_name', evt.target.value);
                    }}
                  >
                    <Input placeholder="Your Last Name" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Email"
                    type="email"
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'Please input a valid email address.',
                      },
                      {
                        required: true,
                        message: 'Email is required.',
                      },
                    ]}
                    value={formValues.email}
                    onChange={evt => {
                      inputChange('email', evt.target.value);
                    }}
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <h3>Location:</h3>
                </Col>
                <Col style={{ paddingBottom: '5%' }}>
                  <Form.Item
                    label="Are you located in the US?"
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: 'Please select whether you live in the US.',
                      },
                    ]}
                  >
                    <Radio.Group
                      name="livesInUS"
                      onChange={evt => {
                        inputChange('country', evt.target.value);
                      }}
                      value={formValues.country}
                    >
                      <Radio value={'USA'}>Yes</Radio>
                      <Radio value={'Your Country'}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  {formValues.country !== 'USA' && formValues.country !== '' && (
                    <Form.Item
                      label="Country"
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
                      <Input placeholder="Your Country" />
                    </Form.Item>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {formValues.country === 'USA' && (
                    <div className="locationUS">
                      <Form.Item
                        label="City"
                        type="text"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: 'City is required.',
                          },
                        ]}
                        value={formValues.city}
                        onChange={evt => {
                          inputChange('city', evt.target.value);
                        }}
                      >
                        <Input placeholder="City" />
                      </Form.Item>
                      <Form.Item
                        label="State"
                        rules={[
                          {
                            required: true,
                            message: 'State is required.',
                          },
                        ]}
                      >
                        <Select
                          defaultValue="State"
                          style={{ width: 250, paddingLeft: '5%' }}
                          onChange={value => {
                            inputChange('state', value);
                          }}
                        >
                          {states.map(state => (
                            <Option value={state}> {state} </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  )}
                </Col>
              </Row>

              <hr />

              <Row style={{ paddingTop: '3%' }}>
                <Col>
                  <h3>
                    Which criteria represents you for membership? (Select all
                    that apply)
                  </h3>
                </Col>
                <Col>
                  <Checkbox.Group
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <Checkbox
                      value="formerly_incarcerated"
                      onChange={evt => {
                        inputChange(
                          evt.target.value,
                          !formValues.formerly_incarcerated
                        );
                      }}
                      style={{ margin: '1.8rem' }}
                    >
                      Formerly incarcerated
                    </Checkbox>
                    <Checkbox
                      value="low_income"
                      onChange={evt => {
                        inputChange(evt.target.value, !formValues.low_income);
                      }}
                      style={{ margin: '1.8rem' }}
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
                      style={{ margin: '1.8rem' }}
                    >
                      From an underrepresented group
                    </Checkbox>
                  </Checkbox.Group>
                </Col>
                <Col span={24}>
                  <h3>Please list your convictions if comfortable</h3>
                </Col>
                <Col span={24}>
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
                </Col>
              </Row>

              <hr />
              <br />
              <div className="tech_stack">
                <h3>
                  Which best describes the tech path you are working towards or
                  are interested in?*
                </h3>
                <Form.Item
                  name="tech_stack"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a path.',
                    },
                  ]}
                >
                  <Select
                    placeholder="- Select -"
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
                </Form.Item>
              </div>
              <div className="experience_level">
                <h3>What is your level of experience?*</h3>
                <Form.Item
                  name="experience_level"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an experience level.',
                    },
                  ]}
                >
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
                </Form.Item>
              </div>
              <Col span={24}>
                <h3>What are you hoping to gain from the community?*</h3>
              </Col>
              <Form.Item
                name="your_hope"
                rules={[
                  {
                    required: true,
                    message: 'Please select a topic of focus',
                  },
                ]}
              >
                <Checkbox.Group
                  style={{ display: 'flex', justifyContent: 'space-evenly' }}
                >
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
              </Form.Item>

              <Col span={24}>
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
              </Col>
              <br />
            </Col>
            <Col offset={10}>
              <Button htmlType="submit" id="mentorSubmitButton" size="large">
                Submit
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Mentee;
