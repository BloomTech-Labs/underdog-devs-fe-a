import React from 'react';
import { connect } from 'react-redux';
import { postNewMentorAccount } from '../../../../state/actions/mentor';
import useForms from '../../../../hooks/useForms';
import { useHistory } from 'react-router-dom';
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
  Divider,
} from 'antd';

import {
  LoginOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import './Styles/mentorApplication.css';
import './Styles/test.css';

import { states, countries } from '../../../common/constants';
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

const Mentor = ({ dispatch, error }) => {
  const { formValues, handleChange, handleTechStack } =
    useForms(initialFormValues);
  const { push } = useHistory();

  const formSubmit = () => {
    dispatch(postNewMentorAccount(formValues))
      .then(res => {
        push('/apply/success');
      })
      .catch(err => console.error(err));
  };

  const [form] = Form.useForm();
  const optionsArray = [
    { name: 'friend_or_family', value: 'Friend/Family' },
    { name: 'coworker', value: 'Co-Worker' },
    { name: 'facebook', value: 'Facebook' },
    { name: 'twitter', value: 'Twitter' },
    { name: 'youtube', value: 'YouTube' },
    { name: 'radio_or_podcast', value: 'Radio/Podcast' },
    { name: 'linkedin', value: 'LinkedIn' },
    { name: 'reddit', value: 'Reddit' },
    { name: 'fromMentee', value: 'Mentee' },
    { name: 'fromMentor', value: 'Mentor' },
    { name: 'abstain', value: 'Do not wish to share' },
  ];
  const mentorshipArray = [
    { name: 'career_development', value: 'Career Development' },
    { name: 'frontend', value: 'Frontend' },
    { name: 'backend', value: 'Backend' },
    { name: 'design', value: 'Design UI/UX' },
    { name: 'ios', value: 'iOS' },
    { name: 'android', value: 'Android' },
    { name: 'data_science', value: 'Data Science' },
  ];
  const contributionArray = [
    { name: 'job_help', value: 'Job Search Help' },
    { name: 'industry_knowledge', value: 'Industry Knowledge' },
    { name: 'pair_programming', value: 'Pair Programming' },
  ];
  const commitmentArray = [
    { name: true, value: 'Yes' },
    { name: false, value: 'No' },
  ];

  return (
    <>
      <Row>
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
      <div className="container">
        <Form
          labelWrap
          form={form}
          onFinish={formSubmit}
          layout="vertical"
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 10 }}
          autoComplete="off"
          size="large"
          requiredMark="required"
          id="main-container"
        >
          <Title className="mentorTitle">Mentor Application</Title>

          {/*Main application form*/}
          <Col className="col-container">
            <Title level={4}>Fill out your user information</Title>

            {/*Personal info*/}
            <Row>
              {/*First name*/}
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
                >
                  <Input placeholder="First name" />
                </Form.Item>
              </Col>
              {/*Last name*/}
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
                >
                  <Input placeholder="Last name" />
                </Form.Item>
              </Col>
              {/*Email*/}
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
                >
                  <Input placeholder="Enter a valid email" />
                </Form.Item>
              </Col>
              {/*Country*/}
              <Col md={20} xs={24}>
                <Form.Item
                  label="Country"
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
              {/*State & State*/}
              <Col md={20} xs={24}>
                <div className="locationUS">
                  <Form.Item
                    label="State"
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
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            {/*Work*/}
            <Row className="row-container">
              {/*Company*/}
              <Col md={20} xs={24}>
                <Form.Item
                  label="Current company"
                  type="text"
                  name="current_company"
                  value={formValues.current_company}
                  onChange={handleChange}
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
              {/*Position*/}
              <Col md={20} xs={24}>
                <Form.Item
                  label="Current position"
                  type="text"
                  name="current_position"
                  value={formValues.current_position}
                  onChange={handleChange}
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

            {/*CheckBoxes*/}
            <Row>
              <Col className="mentorshipArea" md={20} xs={24}>
                <Form.Item
                  size="medium"
                  className="form-group"
                  label="What areas are you wanting to provide mentorship in?"
                  tooltip={{
                    title: 'What development role have you trained for?',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="tech_stack"
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
                      flexFlow: 'column',
                      width: 'auto',
                      gap: '.5rem',
                      paddingLeft: '1rem',
                    }}
                  >
                    {mentorshipArray.map(checkbox => (
                      <Checkbox
                        value={checkbox.value}
                        onChange={e => handleTechStack(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        {checkbox.value}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </Col>

              <Col md={20} xs={24}>
                <Form.Item
                  className="mentorContribution"
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
                      flexFlow: 'column',
                      width: 'auto',
                      gap: '.5rem',
                      paddingLeft: '1rem',
                    }}
                  >
                    {contributionArray.map(area => (
                      <Checkbox
                        value={area.name}
                        onChange={e => handleChange(e, 'checkbox')}
                        style={{ margin: '.2rem', width: '100%' }}
                      >
                        {area.value}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Divider />
              <Col md={20} xs={24}>
                <div className="em">
                  <em>
                    Mentor commitments range from general mentoring and
                    answering questions the mentees have in Slack, <br></br>
                    being paired with a mentee for weekly 1:1 meetings, and pair
                    programming for an hour a week with mentees in Project
                    Underdog.
                  </em>
                </div>

                <Form.Item
                  style={{ paddingTop: '2rem' }}
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
                    onChange={e => handleChange(e, 'checkbox')}
                    value={formValues.commitment}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexFlow: 'column',
                      width: 'auto',
                      gap: '.5rem',
                      paddingLeft: '1rem',
                    }}
                  >
                    {commitmentArray.map(object => (
                      <Radio
                        style={{ margin: '.2rem', width: '100%' }}
                        value={object.name}
                      >
                        {object.value}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col md={20} xs={24}>
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
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexFlow: 'column',
                      width: '10rem',
                      gap: '.5rem',
                      paddingLeft: '1rem',
                    }}
                  >
                    {optionsArray.map(object => (
                      <Option value={object.name}>{object.value}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col md={20}>
                <Form.Item
                  label="Anything else you want us to know?"
                  tooltip={{
                    title:
                      'Include any relevant info that you think may be helpful',
                    icon: <InfoCircleOutlined />,
                  }}
                ></Form.Item>
                <Input.TextArea
                  type="text"
                  name="other_info"
                  value={formValues.other_info}
                  onChange={handleChange}
                  placeholder="Your answer"
                />
              </Col>
            </Row>
          </Col>

          <Divider />
          {/*button*/}
          <Col>
            <Button htmlType="submit" id="mentorSubmitButton" size="large">
              {' '}
              Submit{' '}
            </Button>
          </Col>

          {/*Error message*/}
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
                We're sorry! Something went wrong. Please re-apply and try again
                later.
              </p>
            ) : null}
          </Col>
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.user.error,
  };
};

export default connect(mapStateToProps)(Mentor);
