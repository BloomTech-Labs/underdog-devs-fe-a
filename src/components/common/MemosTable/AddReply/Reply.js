import React, { useState } from 'react';
import FormInput from '../../FormInput';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';
import './Reply.css';
import { Button } from 'antd';

function ReplyInput(props) {
  const { note_id } = props;
  const [formValues, setFormValues] = useState({ comment_text: '' });
  // const [comments, setComments] = useState({ comment_text: '' });
  const { axiosWithAuth } = useAxiosWithAuth0();

  const { setComments, comments } = props;
  const handleChange = e => {
    setFormValues({
      ...formValues,
      comment_text: e.target.value,
    });
  };

  const handleSumbitButton = () => {
    axiosWithAuth()
      .post(`/notes/${note_id}/comments`, formValues)
      .then(res => {
        props.setTrigger(false);
        setComments([...comments, { comment_text: formValues.comment_text }]);
      })
      .catch(err => {
        console.log(err);
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
            onChange={handleChange}
            onSubmit={handleSumbitButton}
            value={formValues.content}
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
