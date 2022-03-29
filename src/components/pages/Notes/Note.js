import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { useParams } from 'react-router-dom';
const Note = props => {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axiosWithAuth()
        .get(`/items/${id}`)
        .then(res => {
          setItem(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setItem(props.item);
    }
  }, []);
  return (
    <div className="entries">
      <p>{item.name}</p>
      <p>{item.note}</p>
      <div className="timestamp">
        <p>{item.date}</p>
        <p>{item.time}</p>
      </div>
    </div>
  );
};

export default Note;
