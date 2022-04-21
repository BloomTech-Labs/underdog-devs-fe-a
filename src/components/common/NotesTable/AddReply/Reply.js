import React from 'react';
import './Reply.css';

const ReplyInput = props => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.close(false)}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
};

export default ReplyInput;
