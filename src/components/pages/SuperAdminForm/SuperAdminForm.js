import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const SuperAdminForm = props => {
  //Antd design settings
  const { Option } = Select;
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

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  //   const prefixSelector = (
  //     <Form.Item name="prefix" noStyle>
  //       <Select
  //         style={{
  //           width: 70,
  //         }}
  //       >
  //         <Option value="1">+1</Option>
  //       </Select>
  //     </Form.Item>
  //   );

  return (
    <>
      <h1> Super admin form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
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
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create new Superadmin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SuperAdminForm;
