import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useForms from '../../../../hooks/useForms';
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

import './Styles/mentorApplication.css';
import { states } from '../../../common/constants';
const { Title } = Typography;
const { Option } = Select;

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  city: '',
  state: '',
  country: '',
  current_company: '',
  current_position: '',
  subject: '',
  experience_level: '',
  job_help: false,
  industry_knowledge: false,
  pair_programming: false,
  other_info: '',
};

const Mentor = () => {
  const [formValues, handleChange] = useForms(initialFormValues);
  const [error, setError] = useState('');

  const history = useHistory();

  const postNewAccount = async newAccount => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URI}/application/new/mentor`,
        newAccount
      );
      history.push('/apply/success');
    } catch (err) {
      setError(err);
    }
  };

  const formSubmit = () => {
    const newAccount = formValues;
    postNewAccount(newAccount);
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
            <span>Signup</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <ReconciliationOutlined />
            <span>Mentor Application</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="mentorApplication">
        <Col span={24} className="applicationForm">
          <Form onFinish={formSubmit} style={{ borderRadius: '30px' }}>
            <Title className="mentorTitle" level={3}>
              Mentor Application
            </Title>
            <Col span={18} offset={3}>
              <Title level={5} style={{ paddingTop: '2%' }}>
                Fill out your user Information
              </Title>
              <Row style={{ padding: '0 0 3% 3%' }}>
                <Col md={20} xs={24}>
                  <Form.Item
                    label="First Name"
                    type="text"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: 'First name is required!',
                      },
                    ]}
                    value={formValues.first_name}
                    onChange={handleChange}
                    style={{ margin: '1.5rem 1.5rem .5rem 0' }}
                  >
                    <Input placeholder="Your First Name" />
                  </Form.Item>
                </Col>

                <Col md={20} xs={24}>
                  <Form.Item
                    label="Last Name"
                    type="text"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Last name is required!',
                      },
                    ]}
                    value={formValues.last_name}
                    onChange={handleChange}
                    style={{ margin: '.5rem 1rem .5rem 0' }}
                  >
                    <Input placeholder="Your Last Name" />
                  </Form.Item>
                </Col>

                <Col md={20} xs={24}>
                  <Form.Item
                    label="Email"
                    type="email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Email is required!',
                      },
                    ]}
                    value={formValues.email}
                    onChange={handleChange}
                    style={{ margin: '0.5rem 1rem 1rem 0' }}
                  >
                    <Input placeholder="Enter Valid Email" />
                  </Form.Item>
                </Col>

                <Col
                  span={14}
                  offset={0}
                  style={{ display: 'flex', justifyItems: 'left' }}
                >
                  <Form.Item
                    label="Are you located in the U.S.?"
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: 'Location is required.',
                      },
                    ]}
                  >
                    <Radio.Group
                      name="country"
                      onChange={handleChange}
                      value={formValues.country}
                      style={{ width: '250', display: 'flex' }}
                      rules={[
                        {
                          required: true,
                          message: 'Country is required.',
                        },
                      ]}
                    >
                      <Radio value={'USA'}>Yes</Radio>
                      <Radio value={'Other'}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col md={15} xs={24} offset={1}>
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
                      onChange={handleChange}
                    >
                      <Input placeholder="Your Country" />
                    </Form.Item>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={15} xs={24} offset={1}>
                  {formValues.country === 'USA' && (
                    <div className="locationUS">
                      <Form.Item
                        label="City"
                        type="text"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: 'City is required!',
                          },
                        ]}
                        value={formValues.city}
                        onChange={handleChange}
                        style={{ margin: '0 1rem .5rem 0' }}
                      >
                        <Input placeholder="Your City" />
                      </Form.Item>
                      <Form.Item
                        label="State"
                        style={{ margin: '.5rem 1rem 1rem 0' }}
                        name="state"
                        rules={[
                          {
                            required: true,
                            message: 'State is required!',
                          },
                        ]}
                      >
                        <Select
                          placeholder="- Select -"
                          onChange={e => handleChange(e, 'select', 'state')}
                        >
                          {states.map(state => (
                            <Option key={state} value={state}>
                              {' '}
                              {state}{' '}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  )}
                </Col>
              </Row>

              <hr />

              <Row style={{ padding: '3% 0 3% 3%' }}>
                <Col md={22} xs={24}></Col>
                <Col md={20} xs={24}>
                  <Form.Item
                    label="Current Company"
                    type="text"
                    name="current_company"
                    value={formValues.current_company}
                    onChange={handleChange}
                    style={{ margin: '.5rem 1rem .5rem' }}
                    rules={[
                      {
                        required: true,
                        message: 'Current company is required.',
                      },
                    ]}
                  >
                    <Input placeholder="Current company" />
                  </Form.Item>
                </Col>
                <Col md={20} xs={24}>
                  <Form.Item
                    label="Current Position"
                    type="text"
                    name="current_position"
                    value={formValues.current_position}
                    onChange={handleChange}
                    style={{ margin: '.5rem 1rem .5rem' }}
                    rules={[
                      {
                        required: true,
                        message: 'Current position is required.',
                      },
                    ]}
                  >
                    <Input placeholder="Current position" />
                  </Form.Item>
                </Col>
              </Row>

              <hr />

              <Row style={{ padding: '3% 0 3% 3%' }}>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="Which best describes your tech stack?"
                    name="tech_stack"
                    rules={[
                      {
                        required: true,
                        message: 'Tech stack is required.',
                      },
                    ]}
                  >
                    <Select
                      placeholder="- Select -"
                      onChange={e => handleChange(e, 'select', 'tech_stack')}
                      style={{ width: 250, margin: '0 1rem 1rem 1.5rem' }}
                    >
                      <Option value="career">Career Development</Option>
                      <Option value="frontend">Frontend Development</Option>
                      <Option value="backend">Backend Development</Option>
                      <Option value="design">Design UI/UX</Option>
                      <Option value="IOS">IOS Development</Option>
                      <Option value="android">Android Development</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="What is your level of experience?"
                    name="experience_level"
                    rules={[
                      {
                        required: true,
                        message: 'Experience is required.',
                      },
                    ]}
                  >
                    <Radio.Group
                      name="experience_level"
                      onChange={handleChange}
                      value={formValues.experience_level}
                      style={{ width: 250, margin: '0 1rem 1rem 1.5rem' }}
                    >
                      <Radio value={'beginner'}>Beginner</Radio>
                      <Radio value={'intermediate'}>Intermediate</Radio>
                      <Radio value={'expert'}>Expert</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="How else can you contribute in the progression of our
                    mentees?"
                    name="contribute"
                    rules={[
                      {
                        required: true,
                        message: 'Possible contribution is required.',
                      },
                    ]}
                  >
                    <Checkbox.Group
                      style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexFlow: 'column',
                        width: 350,
                        margin: '0 1rem 1rem 1.5rem',
                      }}
                    >
                      <Checkbox
                        value="job_help"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Job Search Help
                      </Checkbox>
                      <Checkbox
                        value="industry_knowledge"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Tech Industry Coaching
                      </Checkbox>
                      <Checkbox
                        value="pair_programming"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Pair Programming / Coding Practice
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>

                <Col md={22} xs={24}>
                  <p>Anything else you want us to know?</p>
                  <Form.Item
                    type="text"
                    name="other_info"
                    value={formValues.other_info}
                    onChange={handleChange}
                    style={{ margin: '0 1rem 1rem 1.5rem' }}
                  >
                    <Input.TextArea placeholder="Your answer" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <Button htmlType="submit" id="mentorSubmitButton" size="large">
                {' '}
                Submit{' '}
              </Button>
            </Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'red',
              }}
              align="middle"
            >
              {error ? (
                <p className="error">
                  We're sorry! Something went wrong. Please try again and submit
                  later.
                </p>
              ) : null}
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Mentor;
