import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import Note from './Note';

const Notes = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('https://mocki.io/v1/ad7eaaca-470f-4da9-a28a-349200e9263b')
      .then(res => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="notes-page">
      <div className="headers">
        <h1>Created By</h1>
        <h1>Note</h1>
        <h1>Role</h1>
        <h1>Visibility</h1>
        <h1>Concern Level</h1>
        <h1>Date</h1>
        <h1>Time</h1>
      </div>
      <div className="notes-container">
        {items &&
          items.map(itm => {
            return <Note key={itm.id} item={itm} />;
          })}

        {/* <div className="entries">
        <p>{items.name}</p>
        <p>{items.note}</p>
        <p>{items.date}</p>
        <p>{items.time}</p>
        </div> */}
      </div>
      <Link to="/notesform">
        <button className="add-note-button">Add Note</button>
      </Link>
    </div>
  );
};

export default Notes;
