import React, { useState } from 'react';
import axios from 'axios';
// import { reach } from 'yup'
// import schema from '../../../utils/validation/formSchema'
import { Form, Input, Button, Radio } from 'antd';

const initialFormValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const initialFormErrors = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const [value, setValue] = React.useState(1);

  const postNewAccount = async newAccount => {
    try {
      const response = await axios.post(' ', newAccount);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // const validate = (name, value) => {

  //     reach(schema, name)
  //         .validate(value)
  //         .then(()=> setFormErrors({...formErrors, [name]: '' }))
  //         .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  // }

  const formSubmit = () => {
    const newAccount = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
    };
    console.log(newAccount);
    postNewAccount(newAccount);
  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const inputChange = (name, value) => {
    // validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Form
      onSubmit={evt => {
        evt.preventDefault();
        formSubmit();
      }}
    >
      <div>
        <h1>Hello! please signup below</h1>
        <div className="errors">
          <div>{formErrors.username}</div>
          <div>{formErrors.password}</div>
        </div>

        <div className="email">
          <Form.Item
            label="email"
            type="text"
            placeholder="Please enter a email"
            name="email"
            value={email}
            onChange={evt => {
              setEmail(evt.target.value);
              inputChange(evt.target.name, evt.target.value);
            }}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="password">
          <Form.Item
            label="password"
            type="password"
            placeholder="********"
            name="password"
            value={password}
            onChange={evt => {
              setPassword(evt.target.value);
              inputChange(evt.target.name, evt.target.value);
            }}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="firstName">
          <Form.Item
            label="First Name"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={evt => {
              setFirstName(evt.target.value);
              inputChange(evt.target.name, evt.target.value);
            }}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="lastName">
          <Form.Item
            label="Last Name"
            type="LastName"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={evt => {
              setLastName(evt.target.value);
              inputChange(evt.target.name, evt.target.value);
            }}
          >
            <Input />
          </Form.Item>
        </div>

        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Mentor</Radio>
          <Radio value={2}>Mentee</Radio>
        </Radio.Group>

        <Button id="button">Submit</Button>
      </div>
    </Form>
  );
};

export default Signup;
