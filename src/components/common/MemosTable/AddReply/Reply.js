import React, { useState } from 'react';
import FormInput from '../../FormInput';
import './Reply.css';
import { Button } from 'antd';

const initialValues = {
  content: '',
};

function ReplyInput(props) {
  const [formValues, setFormValues] = useState(initialValues);

  const onChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>Send reply</h1>
        <>
          <label htmlFor={props.labelId}>{props.labelId}</label>
          <FormInput
            style={{ color: 'black' }}
            className="inputArea"
            name="content"
            type="text"
            onChange={onChange}
            placeholder="insert comment here"
          />
        </>
        <br />
        <Button
          type="primary"
          className="submit"
          onClick={() => props.setTrigger(false)}
        >
          Send
        </Button>
        <Button className="close-btn" onClick={() => props.setTrigger(false)}>
          <span>&#x2715;</span>
        </Button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
}

export default ReplyInput;
