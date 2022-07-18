import React from 'react';
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
  Divider,
} from 'antd';

import {
  LoginOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import './Styles/mentorApplication.css';
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

const Mentor = ({ dispatch, error, successPage }) => {
  const { formValues, handleChange, handleTechStack } =
    useForms(initialFormValues);

  const formSubmit = () => {
    dispatch(postNewMentorAccount(formValues));
  };
  console.log(formValues);

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
          autoComplete="off"
          size="large"
          requiredMark="required"
          id="main-container"
        >
          <Title className="mentorTitle">Mentor Application</Title>

          {/*Main application form*/}
          <Col className="main-col-container">
            <Title level={4}>Fill out your user information</Title>

            {/*Personal info*/}
            <Row className="row-container">
              {/*First name*/}
              <Col>
                <Form.Item
                  className="form-group"
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
              <Col>
                <Form.Item
                  className="form-group"
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
                  // style={{ margin: '.5rem 1rem .5rem 0' }}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
              </Col>
              {/*Email*/}
              <Col>
                <Form.Item
                  className="form-group"
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
                  // style={{ margin: '0.5rem 1rem 1rem 0' }}
                >
                  <Input placeholder="Enter a valid email" />
                </Form.Item>
              </Col>

              <Divider />
              {/*Country*/}
              <Col md={15}>
                <Form.Item
                  className="form-group"
                  label="Country"
                  // style={{ margin: '.5rem 1rem 0.5rem 0' }}
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
              <Col md={15}>
                <div className="locationUS">
                  <Form.Item
                    className="form-group"
                    label="State"
                    // style={{ margin: '.5rem 1rem 1rem 0' }}
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
                  className="form-group"
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
                  // style={{ margin: '0 1rem .5rem 0' }}
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            {/*Work*/}
            <Row className="row-container">
              {/*Company*/}
              <Col>
                <Form.Item
                  className="form-group"
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
              <Col>
                <Form.Item
                  className="form-group"
                  label="Current position"
                  type="text"
                  name="current_position"
                  value={formValues.current_position}
                  onChange={handleChange}
                  // style={{ margin: '.5rem 1rem .5rem' }}
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
            <Row className="row-container">
              <Divider />
              <Col className="mentorshipArea" md={20}>
                <Form.Item
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
                    <Checkbox
                      value="Career Development"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      Career Development
                    </Checkbox>
                    <Checkbox
                      value="Frontend"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      Frontend
                    </Checkbox>
                    <Checkbox
                      value="Backend"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      Backend
                    </Checkbox>
                    <Checkbox
                      value="Design UI/UX"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      Design UI/UX
                    </Checkbox>
                    <Checkbox
                      value="iOS"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      iOS
                    </Checkbox>
                    <Checkbox
                      value="Android"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      Android
                    </Checkbox>
                    <Checkbox
                      value="Data Science"
                      onChange={handleTechStack}
                      style={{ margin: '.2rem', width: '100%' }}
                    >
                      Data Science
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col md={20}>
                <Form.Item
                  className="form-group"
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
              <Divider />
              <Col md={20}>
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
                  className="form-group"
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
                    className="form-group"
                    name="commitment"
                    onChange={handleChange}
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
                    <Radio
                      style={{ margin: '.2rem', width: '100%' }}
                      value={'yes'}
                    >
                      Yes
                    </Radio>
                    <Radio
                      style={{ margin: '.2rem', width: '100%' }}
                      value={'no'}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col md={20}>
                <Form.Item
                  className="form-group"
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
                  className="form-group"
                  label="Anything else you want us to know?"
                  labelCol={{ flex: 1 }}
                  tooltip={{
                    title:
                      'Include any relevant info that you think may be helpful',
                    icon: <InfoCircleOutlined />,
                  }}
                  type="text"
                  name="other_info"
                  value={formValues.other_info}
                  onChange={handleChange}
                >
                  <Input.TextArea placeholder="Your answer" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Divider />
          {/*button*/}
          <Button htmlType="submit" id="mentorSubmitButton" size="large">
            {' '}
            Submit{' '}
          </Button>

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
    error: state.user.errors.mentorError,
    successPage: state.user.mentor.successPage,
  };
};

export default connect(mapStateToProps)(Mentor);
