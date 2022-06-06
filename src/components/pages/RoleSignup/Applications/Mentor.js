import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { postNewMentorAccount } from '../../../../state/actions/mentor';
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
  InfoCircleOutlined,
} from '@ant-design/icons';

import './Styles/mentorApplication.css';
import { states, countries, tech_stack } from '../../../common/constants';
import axiosWithAuth from '../../../../utils/axiosWithAuth';
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
  tech_stack: [],
  job_help: false,
  industry_knowledge: false,
  pair_programming: false,
  commitment: false,
  referred_by: '',
  other_info: '',
  validate_status: 'pending',
};

const Mentor = ({ dispatch, error, successPage }) => {
  const [formValues, handleChange, setFormValues] = useForms(initialFormValues);
  const history = useHistory();
  const formSubmit = () => {
    dispatch(postNewMentorAccount(formValues));
  };
  console.log(formValues);
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
                Fill out your user information
              </Title>
              <Row style={{ padding: '0 0 3% 3%' }}>
                <Col md={20} xs={24}>
                  <Form.Item
                    label="First name"
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
                    <Input placeholder="First name" />
                  </Form.Item>
                </Col>

                <Col md={20} xs={24}>
                  <Form.Item
                    label="Last name"
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
                    <Input placeholder="Last name" />
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
                    <Input placeholder="Enter a valid email" />
                  </Form.Item>
                </Col>

                <Col
                  span={14}
                  offset={0}
                  style={{ display: 'flex', justifyItems: 'left' }}
                >
                  <Form.Item
                    label="Country"
                    style={{ margin: '.5rem 1rem 0.5rem 0' }}
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: 'Country is required!',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="- Select -"
                      onChange={e => handleChange(e, 'select', 'country')}
                    >
                      {countries.map(country => (
                        <Option key={country} value={country}>
                          {' '}
                          {country}{' '}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col md={15} xs={24} offset={1}>
                  <div className="locationUS">
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
                        showSearch
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
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
              </Row>

              <hr />

              <Row style={{ padding: '3% 0 3% 3%' }}>
                <Col md={22} xs={24}></Col>
                <Col md={20} xs={24}>
                  <Form.Item
                    label="Current company"
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
                    label="Current position"
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
                    label="What areas are you wanting to provide mentorship in?"
                    tooltip={{
                      title: 'What development role have you trained for?',
                      icon: <InfoCircleOutlined />,
                    }}
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: 'Tech stack is required.',
                      },
                    ]}
                  >
                    <Checkbox.Group
                      style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexFlow: 'column',
                        width: 350,
                        margin: '0rem 1rem 1rem 1.5rem',
                      }}
                    >
                      <Checkbox
                        value="Career Development"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Career Development
                      </Checkbox>
                      <Checkbox
                        value="Frontend"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Frontend
                      </Checkbox>
                      <Checkbox
                        value="Backend"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Backend
                      </Checkbox>
                      <Checkbox
                        value="Design UI/UX"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Design UI/UX
                      </Checkbox>
                      <Checkbox
                        value="iOS"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        iOS
                      </Checkbox>
                      <Checkbox
                        value="Android"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Android
                      </Checkbox>
                      <Checkbox
                        value="Data Science"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Data Science
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="How else can you contribute in the progression of our
                    mentees?"
                    tooltip={{
                      title: 'Select all that apply',
                      icon: <InfoCircleOutlined />,
                    }}
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
                        Job search help
                      </Checkbox>
                      <Checkbox
                        value="industry_knowledge"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Tech industry coaching
                      </Checkbox>
                      <Checkbox
                        value="pair_programming"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Pair programming / Coding practice
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
                <Col md={22} xs={24}>
                  <p>
                    Mentor commitments range from general mentoring and
                    answering questions the mentees have in Slack, <br></br>
                    being paired with a mentee for weekly 1:1 meetings, and pair
                    programming for an hour a week with mentees in Project
                    Underdog.
                  </p>
                  <Form.Item
                    label=" Are you able to commit to one or more of these?"
                    tooltip={{
                      title: 'Choose one',
                      icon: <InfoCircleOutlined />,
                    }}
                    name="commitment"
                    rules={[
                      {
                        required: true,
                        message: 'Commitment is required.',
                      },
                    ]}
                  >
                    <Radio.Group
                      name="commitment"
                      onChange={handleChange}
                      value={formValues.commitment}
                      style={{ width: 250, margin: '0 1rem 1rem 1.5rem' }}
                    >
                      <Radio value={'yes'}>Yes</Radio>
                      <Radio value={'no'}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col md={22} xs={24}>
                  <Form.Item
                    label="How did you hear about Underdog Devs?"
                    tooltip={{
                      title: 'Please choose one',
                      icon: <InfoCircleOutlined />,
                    }}
                    name="referred_by"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a referral',
                      },
                    ]}
                  >
                    <Select
                      placeholder="- Select -"
                      onChange={e => handleChange(e, 'select', 'referred_by')}
                      style={{ width: 250, margin: '0 1rem 1rem 1.5rem' }}
                    >
                      <Option value="friend_or_family">Friend/Family</Option>
                      <Option value="coworker">Co-worker</Option>
                      <Option value="facebook">Facebook</Option>
                      <Option value="twitter">Twitter</Option>
                      <Option value="youtube">Youtube</Option>
                      <Option value="radio_or_podcast">Radio/Podcast</Option>
                      <Option value="linkedin">LinkedIn</Option>
                      <Option value="reddit">Reddit</Option>
                      <Option value="fromMentee">Mentee</Option>
                      <Option value="fromMentee">Mentor</Option>
                      <Option value="abstain">Do not wish to share</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="Anything else you want us to know?"
                    tooltip={{
                      title:
                        'Include any relevant info that you think may be helpful',
                      icon: <InfoCircleOutlined />,
                    }}
                  ></Form.Item>
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
                  We're sorry! Something went wrong. Please re-apply and try
                  again later.
                </p>
              ) : null}
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: state.user.errors.mentorError,
    successPage: state.user.mentor.successPage,
  };
};

export default connect(mapStateToProps)(Mentor);
