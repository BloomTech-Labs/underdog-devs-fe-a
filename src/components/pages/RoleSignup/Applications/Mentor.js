import React from 'react';
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

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/application/new/mentor`,
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
    console.log(formValues);
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    name="country"
                    onChange={handleChange}
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
                      onChange={handleChange}
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
                        onChange={handleChange}
                      >
                        <Input placeholder="Your City" />
                      </Form.Item>

                      <Select
                        defaultValue="State"
                        style={{ width: 250, paddingLeft: '5%' }}
                        onChange={e => handleChange(e, 'select', 'state')}
                      >
                        {states.map(state => (
                          <Option key={state} value={state}>
                            {' '}
                            {state}{' '}
                          </Option>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={e => handleChange(e, 'select', 'tech_stack')}
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
                onChange={handleChange}
              >
                <Input placeholder="Your answer" />
              </Form.Item>
              <br />
              <hr />
              <br />
              <h3>Which best describes your tech stack?*</h3>
              <Select
                defaultValue="- Select -"
                onChange={e => handleChange(e, 'select', 'current_comp')}
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
                onChange={handleChange}
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
                    onChange={e => handleChange(e, 'checkbox')}
                    style={{ margin: '1rem' }}
                  >
                    Job Search Help
                  </Checkbox>
                  <Checkbox
                    value="industry_knowledge"
                    onChange={e => handleChange(e, 'checkbox')}
                    style={{ margin: '1rem' }}
                  >
                    Tech Industry Coaching
                  </Checkbox>
                  <Checkbox
                    value="pair_programming"
                    onChange={e => handleChange(e, 'checkbox')}
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
                  onChange={handleChange}
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
