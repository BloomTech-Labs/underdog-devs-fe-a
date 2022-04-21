import React from 'react';
import './Reply.css';

function ReplyInput(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>Test</h1>
        <p>test</p>
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
