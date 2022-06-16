import React, { useState } from 'react';
import FormInput from '../../FormInput';
import axiosWithAuth from '../../../../utils/axiosWithAuth';
import './Reply.css';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({
  forceRefresh: true,
});

function ReplyInput(props) {
  const { note_id } = props;
  const [formValues, setFormValues] = useState({ comment_text: '' });

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
        history.push('/memos');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>Add a comment {props.key}:</h1>
        <div>
          <FormInput
            onChange={handleChange}
            onSubmit={handleSumbitButton}
            value={formValues.content}
          />
        </div>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <span>&#x2715;</span>
        </button>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ReplyInput;
