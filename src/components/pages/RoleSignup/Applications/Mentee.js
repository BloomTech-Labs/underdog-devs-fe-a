import React from 'react';
import useForms from '../../../../hooks/useForms';
import { connect } from 'react-redux';
import { postNewMenteeAccount } from '../../../../state/actions/mentee';
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

import { states, countries, tech_stack } from '../../../common/constants';
import './Styles/menteeApplication.css';

const { Title } = Typography;
const { Option } = Select;

const initialFormValues = {
  profile_id: '',
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
  tech_stack: '',
  job_help: false,
  pair_programming: false,
  heard_about: '',
  other_info: '',
};

const Mentee = ({ dispatch, error, successPage }) => {
  const [formValues, handleChange] = useForms(initialFormValues);

  const formSubmit = () => {
    dispatch(postNewMenteeAccount(formValues));
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
              <Title level={5} style={{ paddingTop: '2%' }}>
                Please fill out your user information
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
                        message: 'First name is required.',
                      },
                    ]}
                    value={formValues.first_name}
                    onChange={handleChange}
                    style={{ margin: '1.5rem 1rem .5rem 0' }}
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
                        message: 'Last name is required.',
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
                        type: 'email',
                        message: 'Please input a valid email address.',
                      },
                      {
                        required: true,
                        message: 'Email is required.',
                      },
                    ]}
                    value={formValues.email}
                    onChange={handleChange}
                    style={{ margin: '.5rem 1rem 1rem 0' }}
                  >
                    <Input placeholder="Enter a valid email" />
                  </Form.Item>
                </Col>

                <Col span={24}></Col>
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
                    <Input placeholder="Your city" />
                  </Form.Item>
                </Col>
              </Row>

              <hr />

              <Row style={{ padding: '3% 0 3% 3%' }}>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="Which criteria represents you for membership? (Select all that apply)"
                    tooltip={{
                      title: 'If none apply, leave blank',
                      icon: <InfoCircleOutlined />,
                    }}
                    name="criteria-for-membership"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a topic of focus',
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
                        value="formerly_incarcerated"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        Formerly incarcerated
                      </Checkbox>
                      <Checkbox
                        value="low_income"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        From a lower socioeconomic background
                      </Checkbox>
                      <Checkbox
                        value="underrepresented_group"
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        From an underrepresented group
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>

                <Col md={22} xs={24}>
                  <Form.Item
                    label="Please list your convictions if comfortable"
                    tooltip={{
                      title:
                        'Include any relevant info that you think may be helpful',
                      icon: <InfoCircleOutlined />,
                    }}
                  ></Form.Item>
                  <Form.Item
                    type="text"
                    name="list_convictions"
                    value={formValues.list_convictions}
                    onChange={handleChange}
                    style={{ margin: '0 1rem .5rem 1.5rem' }}
                  >
                    <Input.TextArea placeholder="Your answer" />
                  </Form.Item>
                </Col>
              </Row>

              <hr />

              <Row style={{ padding: '3% 0 3% 3%' }}>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="What subject do you want to get mentored in?"
                    tooltip={{
                      title: 'Select the title that best reflects your goals',
                      icon: <InfoCircleOutlined />,
                    }}
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
                      onChange={e => handleChange(e, 'select', 'tech_stack')}
                      style={{ width: 250, margin: '0 1rem 1rem 1.5rem' }}
                    >
                      {tech_stack.map(tech_stack => {
                        return (
                          <Option value={`${tech_stack.value}`}>
                            {tech_stack.label}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={22} xs={24}></Col>
                <Col md={22} xs={24}>
                  <Form.Item
                    label="What are you hoping to gain from the community?"
                    tooltip={{
                      title: 'Select all that apply',
                      icon: <InfoCircleOutlined />,
                    }}
                    name="your_hope"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a topic of focus',
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
                  <Form.Item
                    label="How did you hear about Underdog Devs?"
                    tooltip={{
                      title: 'Select where you heard about Underdog Devs',
                      icon: <InfoCircleOutlined />,
                    }}
                    name="heard_about"
                    rules={[
                      {
                        required: true,
                        message: 'Please select an answer.',
                      },
                    ]}
                  >
                    <Select
                      placeholder="- Select -"
                      onChange={e => handleChange(e, 'select', 'heard_about')}
                      style={{ width: 250, margin: '0 1rem 1rem 1.5rem' }}
                    >
                      <Option value="friend_family">Friend/Family</Option>
                      <Option value="coworker">Co-Worker</Option>
                      <Option value="facebook">Facebook</Option>
                      <Option value="twitter">Twitter</Option>
                      <Option value="youtube">YouTube</Option>
                      <Option value="radio_podcast">Radio/Podcast</Option>
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
              <Button htmlType="submit" id="menteeSubmitButton" size="large">
                Submit
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
    error: state.user.errors.menteeError,
    successPage: state.user.mentee.successPage,
  };
};

export default connect(mapStateToProps)(Mentee);
