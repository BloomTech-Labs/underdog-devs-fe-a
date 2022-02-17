import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Radio, Breadcrumb, Select, Checkbox } from 'antd';
import {
  LoginOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import './Styles/application.css';
const { Option } = Select;

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  city: '', //TODO: separate to city, state, country & change to dropdown
  state: '',
  country: '',
  underRepGroup: false,
  lowerBackground: false,
  formerly_incarcerated: false,
  list_convictions: '',
  tech_stack: '',
  experience_level: '',
  your_hope: '',
  other_info: '',
};

const Mentee = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}application/new/mentee`,
        newAccount
      );
      console.log('post response', response); // DELETE CONSOLE.LOG
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmit = () => {
    const newAccount = formValues;
    console.log('newAccount', newAccount); // DELETE CONSOLE.LOG
    postNewAccount(newAccount);
  };

  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  function handleChangeStates(value) {
    // REVIEW THIS LATER, MAY COMBINE WITH INPUTCHANGE??
    console.log(`selected ${value}`);
  }

  return (
    <div>
      <div className="breadcrumbs">
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
            <span>Mentee Application</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="application">
        <Form onFinish={formSubmit}>
          <div className="signUpForm">
            <h1> Mentee Application </h1>
            <div className="questions">
              <div className="infoDiv">
                <h3>Please fill out your user information</h3>
                <br />
                <div className="firstName">
                  <div className="titleContainer">
                    <h3>First Name*</h3>
                  </div>
                  <Form.Item
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
                </div>
                <div className="lastName">
                  <div className="titleContainer">
                    <h3>Last Name*</h3>
                  </div>
                  <Form.Item
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
                </div>
                <div className="email">
                  <div className="titleContainer">
                    <h3>Email*</h3>
                  </div>
                  <Form.Item
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
                </div>

                <div className="location">
                  <div className="titleContainer">
                    <h3>Location*</h3>
                  </div>

                  {/*Are you located in the US ? if yes, country === USA, select state & city, if no, type in country*/}
                  <div>
                    <label>Are you located in the US? *</label>
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
                  </div>

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
                        onChange={handleChangeStates}
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
                </div>
              </div>
              <hr />

              <br />
              <div className="formerly_incarcerated">
                <h3>
                  Which criteria represents you for membership? Check All That
                  Apply
                </h3>
                {/* <Form.Item>
                  <Input
                    type="checkbox"
                    onClick={
                      initialFormValues.formerly_incarcerated
                        ? inputChange('formerly_incarcerated', false)
                        : inputChange('formerly_incarcerated', true)
                    }
                  />
                </Form.Item> */}
              </div>
              <hr />
              <br />
              <div className="list_convictions">
                <h3>Please list your convictions if comfortable</h3>
                <Form.Item
                  type="text"
                  name="list_convictions"
                  value={formValues.list_convictions}
                  onChange={evt => {
                    inputChange('list_convictions', evt.target.value);
                  }}
                >
                  <Input.TextArea placeholder="Your answer" />
                </Form.Item>
              </div>

              <div className="tech_stack">
                <h3>What is your tech stack?*</h3>
                <Form.Item
                  type="text"
                  name="tech_stack"
                  rules={[
                    {
                      required: true,
                      message: 'This field is required!',
                    },
                  ]}
                  value={formValues.tech_stack}
                  onChange={evt => {
                    inputChange('tech_stack', evt.target.value);
                  }}
                >
                  <Input.TextArea placeholder="Your answer" />
                </Form.Item>
              </div>

              <div className="experience_level">
                <h3>What is your level of experience?*</h3>
                <Form.Item
                  type="text"
                  name="experience_level"
                  rules={[
                    {
                      required: true,
                      message: 'Experience is required!',
                    },
                  ]}
                  value={formValues.experience_level}
                  onChange={evt => {
                    inputChange('experience_level', evt.target.value);
                  }}
                >
                  <Input.TextArea placeholder="Your answer" />
                </Form.Item>
              </div>

              <div className="your_hope">
                <h3>What are you hoping to gain from the community?*</h3>
                <Form.Item
                  type="text"
                  name="your_hope"
                  rules={[
                    {
                      required: true,
                      message: 'This field is required!',
                    },
                  ]}
                  value={formValues.your_hope}
                  onChange={evt => {
                    inputChange('your_hope', evt.target.value);
                  }}
                >
                  <Input.TextArea placeholder="Your goals" />
                </Form.Item>
              </div>

              <div className="other_info">
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
              <hr />
            </div>
            <Button htmlType="submit" id="button">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Mentee;
