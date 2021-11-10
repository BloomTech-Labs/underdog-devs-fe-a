import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import './SuperAdminFormStyle.css';

// TODO: enter the endpoint to create new superadmin
const CREATE_DB_ENDPOINT = 'db_endpoint';
const CREATE_OKTA_ENDPOINT = 'okta_endpoint';

const SuperAdminForm = props => {
  //Antd design settings
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      sm: {
        span: 14,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  //form management
  const [disableButton, setDisableButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const formChange = async () => {
    let validate;
    try {
      validate = await form.validateFields();
    } catch (error) {
      validate = error;
    }
    if (!validate.hasOwnProperty('errorFields')) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  async function onFinish(values) {
    //add role to the form
    values = {
      ...values,
      // in db role for superadmin is 5
      role: 5,
    };

    //create user in Okta then in the db
    try {
      const resOkta = await axios.post(CREATE_OKTA_ENDPOINT, values);
      setSuccessMessage(
        `SuperAdmin account ${resOkta.data.userName} is created!`
      );
      const resDb = await axios.post(CREATE_DB_ENDPOINT, values);
      //do something with the returned data
      form.resetFields();
    } catch (error) {
      setSuccessMessage(`The following error occurred: ${error.message}`);
      return;
    }
  }

  return (
    <div className="flexContainer">
      <h1> Super admin form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onChange={formChange}
        initialValues={{
          prefix: '1',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
            {
              type: 'email',
              message: 'The input is not a valid E-mail!',
            },
          ]}
          className="item"
        >
          <Input className="field" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          tooltip="Enter the last name"
          rules={[
            {
              required: false,
              message: 'Please input a last name',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          tooltip="Enter the first name"
          rules={[
            {
              required: false,
              message: 'Please input a first name',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userName"
          label="username"
          tooltip="Enter the username of the account as it will appear on the application"
          rules={[
            {
              required: true,
              message: 'Please input a username',
              whitespace: true,
            },
            {
              message: 'The username must be at least 2 characters long',
              pattern: new RegExp(/[a-z]{2}/gi),
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              pattern: new RegExp(/[0-9]+/g),
              message: 'Phone number must be composed of digits',
            },
          ]}
        >
          <Input
            //TO Use if prefixes are needed with the phone number
            //addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={disableButton}
            className="base"
          >
            Create new Superadmin
          </Button>
        </Form.Item>
        <p className="successMessage"> {successMessage}</p>
      </Form>
    </div>
  );
};

export default SuperAdminForm;
