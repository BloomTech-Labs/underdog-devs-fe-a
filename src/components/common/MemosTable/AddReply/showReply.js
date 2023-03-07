import React, { useEffect } from 'react';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';

function ShowReply(props) {
  const { note_id } = props;
  const axiosWithAuth = useAxiosWithAuth0();

  const { setComments, comments } = props;
  useEffect(() => {
    const getComments = () => {
      axiosWithAuth()
        .get(`/notes/${note_id}/comments`)
        .then(res => {
          setComments(res.data);
        });
    };
    getComments();
  }, [axiosWithAuth, note_id, setComments]);
  const data = [];
  // eslint-disable-next-line array-callback-return
  comments.map(t => {
    const ticketDetails = {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      content: t.comment_text,
      datetime: (
        <Tooltip
          title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
        >
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    };
    data.push(ticketDetails);
  });

  return (
    <List
      className="comment-list"
      header={`${data.length} replies`}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <li>
          <Comment
            actions={item.actions}
            author={item.author}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
  );
}

export default ShowReply;
