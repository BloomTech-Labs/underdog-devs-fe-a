import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../../utils/axiosWithAuth';

function ShowReply(props) {
  const { note_id } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = () => {
      axiosWithAuth()
        .get(`/notes/${note_id}/comments`)
        .then(res => {
          setComments(res.data);
        });
    };
    getComments();
  }, []);

  return (
    <div>
      <hr />
      {comments.map(item => (
        <div>
          {' '}
          {item.comment_text} <hr />{' '}
        </div>
      ))}
    </div>
  );
}

export default ShowReply;
