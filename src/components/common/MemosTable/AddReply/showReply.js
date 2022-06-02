import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../../utils/axiosWithAuth';

function ShowReply(props) {
  const { a, note_id } = props;
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

  console.log('props.note_id', note_id);
  console.log('comments =', comments);
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
  // return 1 ? (
  //   <div className="popup">
  //     YYYYY
  //   </div>
  // ) : (
  //   ''
  // );
}

export default ShowReply;
