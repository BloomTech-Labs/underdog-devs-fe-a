import React, { useState } from 'react';
import FormInput from '../../FormInput';
import './Reply.css';
import styled from 'styled-components';
import { device } from '../../Size&Devices';

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

    styled.div`
      @media ${device.laptop} {
        max-width: 800px;
      }

      @media ${device.mobileM} {
      }

      @media ${device.desktop} {
        max-width: 1400px;
      }
    `;
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
          Reply
        </button>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <span>&#x2715;</span>
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
}

export default ReplyInput;
