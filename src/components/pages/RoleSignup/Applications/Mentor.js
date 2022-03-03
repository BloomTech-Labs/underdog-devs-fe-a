import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [formValues, setFormValues] = useState(initialFormValues);

  let history = useHistory();

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/application/new/mentor`,
        newAccount
      );
      history.push('/apply/success');
      console.log(response);
    } catch (err) {
      history.push('/apply/error');
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
              <Title level={5}>Fill out your user Information</Title>
              <br />
              <Row gutter={[16, 16]}>
                <Col md={12} xs={24}>
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
                </Col>

                <Col span={24}>
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
                    onChange={evt => {
                      inputChange('email', evt.target.value);
                    }}
                  >
                    <Input placeholder="Enter valid email" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <h3>Location:</h3>
                </Col>
                <Col span={8}>
                  <label>Are you located in the U.S.?*</label>
                </Col>
                <Col span={6} style={{ paddingBottom: '5%' }}>
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
                            message: 'City is required!',
                          },
                        ]}
                        value={formValues.city}
                        onChange={evt => {
                          inputChange('city', evt.target.value);
                        }}
                      >
                        <Input placeholder="Your City" />
                      </Form.Item>

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
                    </div>
                  )}
                </Col>
                <hr />
                <br />
                <div className="current_comp">
                  <h3>Current company and position?:</h3>
                </div>
                <label>
                  Current company
                  <Form.Item
                    type="text"
                    name="current_company"
                    value={formValues.current_company}
                    onChange={evt => {
                      inputChange('current_company', evt.target.value);
                    }}
                  >
                    <Input placeholder="Current company" />
                  </Form.Item>
                </label>
                <label>
                  Current position
                  <Form.Item
                    type="text"
                    name="current_position"
                    value={formValues.current_position}
                    onChange={evt => {
                      inputChange('current_position', evt.target.value);
                    }}
                  >
                    <Input placeholder="Current position" />
                  </Form.Item>
                </label>

                <hr />
                <br />
                <div className="tech_stack">
                  <h3>
                    Which best describes your tech stack?* (Check all that
                    apply)
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
                    <Option value="IOS">IOS Development</Option>
                    <Option value="android">Android Development</Option>
                  </Select>
                </div>
              </Row>
              <br />
              <h3>Current company/position?:</h3>
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
              <br />
              <hr />
              <br />
              <h3>Which best describes your tech stack?*</h3>
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
                <Option value="IOS">IOS Development</Option>
                <Option value="android">Android Development</Option>
              </Select>
              <br />

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

              <br />
              <Col>
                <h3>
                  How else can you contribute in the progression of our
                  mentees?*
                </h3>
                <Checkbox.Group>
                  <Checkbox
                    value="job_help"
                    onChange={evt => {
                      inputChange(evt.target.value, !formValues.job_help);
                    }}
                    style={{ margin: '1rem' }}
                  >
                    Job Search Help
                  </Checkbox>
                  <Checkbox
                    value="industry_knowledge"
                    onChange={evt => {
                      inputChange(
                        evt.target.value,
                        !formValues.industry_knowledge
                      );
                    }}
                    style={{ margin: '1rem' }}
                  >
                    Tech Industry Coaching
                  </Checkbox>
                  <Checkbox
                    value="pair_programming"
                    onChange={evt => {
                      inputChange(
                        evt.target.value,
                        !formValues.pair_programming
                      );
                    }}
                    style={{ margin: '1rem' }}
                  >
                    Pair Programming / Coding Practice
                  </Checkbox>
                </Checkbox.Group>
              </Col>
              <br />
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
                {' '}
                Submit{' '}
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Mentor;
