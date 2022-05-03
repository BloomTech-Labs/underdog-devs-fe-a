import React, { useState } from 'react';
import FormInput from '../../FormInput';
import './Reply.css';

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
        <h1>Add a comment:</h1>
        <>
          <label htmlFor={props.labelId}>{props.labelId}</label>
          <FormInput
            name="content"
            type="text"
            onChange={onChange}
            placeholder="insert comment here"
          />
        </>
        <br />
        <button className="submit" onClick={() => console.log('submit')}>
          Submit
        </button>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <h1>close</h1>
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
}

export default ReplyInput;
