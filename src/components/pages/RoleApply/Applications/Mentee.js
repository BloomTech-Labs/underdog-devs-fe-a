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
  convictions: '',
  tech_stack: '',
  job_help: false,
  pair_programming: false,
  referred_by: '',
  other_info: '',
  validate_status: 'pending',
};

const Mentee = ({ dispatch, error, successPage }) => {
  const { formValues, handleChange } = useForms(initialFormValues);
  const { push } = useHistory();

  const formSubmit = () => {
    dispatch(postNewMenteeAccount(formValues));
    push('/apply/success');
  };

  return (
    <>
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
      <div className="container-main">
        <Row className="menteeApplication">
          <Col span={24} className="applicationForm">
            <Form
              layout="vertical"
              onFinish={formSubmit}
              labelWrap
              autoComplete="off"
              size="medium"
              requiredMark="required"
              id="main-container"
            >
              <Title className="menteeTitle" level={3}>
                Mentee Application
              </Title>
              <Col className="main-col-container">
                <Title level={5} style={{ paddingTop: '2%' }}>
                  Please fill out your user information
                </Title>
                <Row className="row-container">
                  <Col md={15} xs={24} span={18} offset={1}>
                    <Form.Item
                      labelCol={{ span: 10 }}
                      className="form-group"
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

                  <Col md={20} xs={24} span={18} offset={1}>
                    <Form.Item
                      label="Last name"
                      type="text"
                      name="last_name"
                      className="form-group"
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

                  <Col md={20} xs={24} span={18} offset={1}>
                    <Form.Item
                      label="Email"
                      type="email"
                      name="email"
                      className="form-group"
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

                  <Col md={15} span={18} offset={1}>
                    <Form.Item
                      label="Country"
                      className="form-group"
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 10 }}
                      style={{ margin: '0 1rem .5rem 0', gap: '0rem' }}
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
                        className="form-group"
                        name="state"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 10 }}
                        style={{ margin: '0 1rem .5rem 0', gap: '0rem' }}
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
                      className="form-group"
                      labelCol={{ span: 10 }}
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

                <Row className="row-container">
                  <Divider />
                  <Col sm={10} md={20}>
                    <Form.Item
                      className="form-group"
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

                  <Col md={20}>
                    <Form.Item
                      className="form-group"
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

                <Row className="row-container">
                  <Col md={20}>
                    <Form.Item
                      className="form-group"
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

                  <Col sm={10} md={20}>
                    <Form.Item
                      className="form-group"
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
                  <Col md={20}>
                    <Form.Item
                      className="form-group"
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
                  <Col md={20}>
                    <Form.Item
                      className="form-group"
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
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.user.errors.menteeError,
    successPage: state.user.mentee.successPage,
  };
};

export default connect(mapStateToProps)(Mentee);
