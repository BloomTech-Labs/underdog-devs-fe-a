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
import './Styles/mentorApplication.css';
const { Title } = Typography;

const { Option } = Select;

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  city: '',
  state: '',
  country: '',
  current_comp: '',
  subject: '',
  experience_level: '',
  job_help: false,
  industry_knowledge: false,
  pair_programming: false,
  other_info: '',
};

const Mentor = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}application/new/mentor`,
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
    <div>
      <Row style={{ padding: '3vh' }}>
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
                <Col span={12}>
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
                <Col span={12}>
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
                  <h3>Location*:</h3>
                </Col>
                <Col>
                  <label>Are you located in the U.S.?*</label>
                </Col>
                <Col offset={1}>
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
                    <Input placeholder="City" />
                  </Form.Item>
                  <Select
                    defaultValue="State"
                    style={{ width: 200 }}
                    onChange={evt => {
                      inputChange('state', evt);
                    }}
                  >
                    <Option value="none">--None--</Option>
                    <Option value="Alabama">Alabama</Option>
                    <Option value="Alaska">Alaska</Option>
                    <Option value="Arizona">Arizona</Option>
                    <Option value="Arkansas">Arkansas</Option>
                    <Option value="California">California</Option>
                    <Option value="Colorado">Colorado</Option>
                    <Option value="Connecticut">Connecticut</Option>
                    <Option value="Delaware">Delaware</Option>
                    <Option value="DC">District of Columbia</Option>
                    <Option value="Florida">Florida</Option>
                    <Option value="Georgia">Georgia</Option>
                    <Option value="Hawaii">Hawaii</Option>
                    <Option value="Idaho">Idaho</Option>
                    <Option value="Illinois">Illinois</Option>
                    <Option value="Indiana">Indiana</Option>
                    <Option value="Iowa">Iowa</Option>
                    <Option value="Kansas">Kansas</Option>
                    <Option value="Kentucky">Kentucky</Option>
                    <Option value="Louisiana">Louisiana</Option>
                    <Option value="Maine">Maine</Option>
                    <Option value="Maryland">Maryland</Option>
                    <Option value="Massachusetts">Massachusetts</Option>
                    <Option value="Michigan">Michigan</Option>
                    <Option value="Minnesota">Minnesota</Option>
                    <Option value="Mississippi">Mississippi</Option>
                    <Option value="Missouri">Missouri</Option>
                    <Option value="Montana">Montana</Option>
                    <Option value="Nebraska">Nebraska</Option>
                    <Option value="Nevada">Nevada</Option>
                    <Option value="New Hampshire">New Hampshire</Option>
                    <Option value="New Jersey">New Jersey</Option>
                    <Option value="New Mexico">New Mexico</Option>
                    <Option value="New York">New York</Option>
                    <Option value="North Carolina">North Carolina</Option>
                    <Option value="North Dakota">North Dakota</Option>
                    <Option value="Ohio">Ohio</Option>
                    <Option value="Oklahoma">Oklahoma</Option>
                    <Option value="Oregon">Oregon</Option>
                    <Option value="Pennsylvania">Pennsylvania</Option>
                    <Option value="Rhode Island">Rhode Island</Option>
                    <Option value="South Carolina">South Carolina</Option>
                    <Option value="South Dakota">South Dakota</Option>
                    <Option value="Tennessee">Tennessee</Option>
                    <Option value="Texas">Texas</Option>
                    <Option value="Utah">Utah</Option>
                    <Option value="Vermont">Vermont</Option>
                    <Option value="Virginia">Virginia</Option>
                    <Option value="Washington">Washington</Option>
                    <Option value="West Virginia">West Virginia</Option>
                    <Option value="Wisconsin">Wisconsin</Option>
                    <Option value="Wyoming">Wyoming</Option>
                  </Select>
                </div>
              )}

              <hr />
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
              <hr />
              <br />
              <h3>
                Which best describes your tech stack?* (Check all that apply)
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
              <Row>
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
              </Row>
              <br />
              <div>
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
