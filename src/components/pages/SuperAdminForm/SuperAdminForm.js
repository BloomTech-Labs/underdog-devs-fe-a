import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';

// TODO enter the endpoint to create new superadmin
const CREATE_DB_ENDPOINT = 'db_endpoint';
const CREATE_OKTA_ENDPOINT = 'okta_endpoint';

const SuperAdminForm = props => {
  //Antd design settings
  //   const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      sm: {
        span: 6,
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

  const onFinish = values => {
    console.log('values', values);
    //add role to the form
    values = {
      ...values,
      role: 5,
    };

    //create user in Okta
    //create user in db
    axios
      .post(CREATE_DB_ENDPOINT, values)
      .then(res => {
        console.log(res.data);
        setSuccessMessage(
          `SuperAdmin account ${res.data.userName} is created!`
        );
      }) //add reset form and success message
      .catch(err => {
        console.log(err.message);
        setSuccessMessage(`The following error occurred: ${err.message}`);
      });
    console.log('Received values of form: ', values);
  };

  return (
    <>
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
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input />
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
          tooltip="Enter the username"
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

        <Form.Item {...tailFormItemLayout} shouldUpdate>
          <Button type="primary" htmlType="submit" disabled={disableButton}>
            Create new Superadmin
          </Button>
        </Form.Item>
        <p> {successMessage}</p>
      </Form>
    </>
  );
};

export default SuperAdminForm;
