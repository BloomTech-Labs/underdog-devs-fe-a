import React from 'react';
import useForms from '../../../../hooks/useForms';
import { connect } from 'react-redux';
import { postNewMenteeAccount } from '../../../../state/actions/mentee';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Breadcrumb,
  Select,
  Checkbox,
  Row,
  Col,
  Typography,
  Divider,
} from 'antd';

import {
  LoginOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { states, countries, tech_stack } from '../../../common/constants';
import './Styles/mentorApplication.css';
import './Styles/test.css';

import { useAuth0 } from '@auth0/auth0-react';

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
  convictions: '',
  tech_stack: '',
  job_help: false,
  pair_programming: false,
  referred_by: '',
  other_info: '',
  validate_status: 'pending',
};

const Mentee = ({ dispatch, error }) => {
  const { formValues, handleChange } = useForms(initialFormValues);
  const { push } = useHistory();

  const formSubmit = () => {
    dispatch(postNewMenteeAccount(formValues))
      .then(res => {
        push('/apply/success');
      })
      .catch(err => console.error(err));
  };

  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div className="container-custom">
        <Row style={{ margin: '20px 0px' }}>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => loginWithRedirect()}>
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
            <Form
              layout="vertical"
              onFinish={formSubmit}
              labelWrap
              autoComplete="off"
              size="large"
              requiredMark="required"
              id="main-container"
            >
              <Title className="mentorTitle" level={3}>
                Mentee Application
              </Title>
              <Col className="main-col-container">
                <Title level={4} style={{ paddingTop: '2%' }}>
                  Please fill out your user information
                </Title>
                <Row>
                  <Col md={12} xs={24}>
                    <Form.Item
                      labelCol={{ span: 10 }}
                      wrapperCol={{ sm: 24 }}
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
                      style={{ margin: '.5rem 1rem .5rem 0', gap: '0rem' }}
                    >
                      <Input placeholder="First name" />
                    </Form.Item>
                  </Col>

                  <Col md={12} xs={24}>
                    <Form.Item
                      label="Last name"
                      type="text"
                      name="last_name"
                      wrapperCol={{ sm: 24 }}
                      labelCol={{ span: 8 }}
                      rules={[
                        {
                          required: true,
                          message: 'Last name is required.',
                        },
                      ]}
                      value={formValues.last_name}
                      onChange={handleChange}
                      style={{ margin: '.5rem 1rem .5rem 0rem', gap: '0rem' }}
                    >
                      <Input placeholder="Last name" />
                    </Form.Item>
                  </Col>

                  <Col md={12} xs={24}>
                    <Form.Item
                      label="Email"
                      type="email"
                      name="email"
                      wrapperCol={{ sm: 24 }}
                      labelCol={{ span: 8 }}
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
                      style={{ margin: '.5rem 1rem .5rem 0rem' }}
                    >
                      <Input placeholder="Enter a valid email" />
                    </Form.Item>
                  </Col>

                  <Col md={12} xs={24}>
                    <Form.Item
                      label="Country"
                      wrapperCol={{ sm: 24 }}
                      name="country"
                      style={{ marginTop: '8px', paddingRight: '12px' }}
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

                <Row gutter={[4, 4]}>
                  <Col md={12} xs={24}>
                    <div className="locationUS">
                      <Form.Item
                        label="State"
                        wrapperCol={{ sm: 24 }}
                        style={{ paddingRight: '12px' }}
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
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label="City"
                      type="text"
                      name="city"
                      wrapperCol={{ sm: 24 }}
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

                <Row>
                  <Divider />
                  <Col md={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ sm: 24 }}
                      label="Which criteria represents you for membership? 
                    (Select all that apply)"
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
                          flexFlow: 'column',
                          width: 'auto',
                          gap: '.5rem',

                          paddingLeft: '1rem',
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

                  <Col md={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ sm: 24 }}
                      label="Please list your convictions if comfortable"
                      tooltip={{
                        title:
                          'Include any relevant info that you think may be helpful',
                        icon: <InfoCircleOutlined />,
                      }}
                      style={{ margin: '0 1rem .5rem 1.5rem' }}
                    >
                      <Input.TextArea
                        type="text"
                        name="convictions"
                        value={formValues.convictions}
                        onChange={handleChange}
                        placeholder="Your answer"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider />

                <Row>
                  <Col md={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ sm: 24 }}
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
                        {tech_stack.map((tech_stack, index) => {
                          return (
                            <Option value={`${tech_stack.value}`} key={index}>
                              {tech_stack.label}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col md={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ sm: 24 }}
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
                          flexFlow: 'column',
                          width: 'auto',
                          gap: '.5rem',
                          paddingLeft: '1rem',
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
                  <Col md={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ sm: 24 }}
                      label="How did you hear about Underdog Devs?"
                      tooltip={{
                        title: 'Select where you heard about Underdog Devs',
                        icon: <InfoCircleOutlined />,
                      }}
                      name="referred_by"
                      rules={[
                        {
                          required: true,
                          message: 'Please select an answer.',
                        },
                      ]}
                    >
                      <Select
                        placeholder="- Select -"
                        onChange={e => handleChange(e, 'select', 'referred_by')}
                        style={{
                          width: 250,
                          margin: '0rem 1rem 0.5rem 1.5rem',
                        }}
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
                        <Option value="fromMentor">Mentor</Option>
                        <Option value="abstain">Do not wish to share</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ sm: 24 }}
                      label="Anything else you want us to know?"
                      labelCol={{ flex: 1 }}
                      tooltip={{
                        title:
                          'Include any relevant info that you think may be helpful',
                        icon: <InfoCircleOutlined />,
                      }}
                      style={{ margin: '0 1rem 1rem 1.5rem' }}
                    >
                      <Input.TextArea
                        type="text"
                        name="other_info"
                        value={formValues.other_info}
                        onChange={handleChange}
                        placeholder="Your answer"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col style={{ display: 'flex', justifyContent: 'center' }}>
                <Button htmlType="submit" id="mentorSubmitButton" size="large">
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
                {Object.keys(error).length !== 0 ? (
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
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.user.error,
  };
};

export default connect(mapStateToProps)(Mentee);
