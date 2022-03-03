import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal } from 'antd';
import '../../../styles/styles.css';
import './PendingApplication.css';

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
}) => {
  const notes = { application_notes: '' };

  const [currentApplication, setCurrentApplication] = useState({});
  const [notesValue, setNotesValue] = useState(notes);
  const [hideForm, setHideForm] = useState(true);

  const updateModal = () => {
    axiosWithAuth()
      .get(`/application/profileId/${profileId}`)
      .then(res => {
        setCurrentApplication(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOk = () => {
    setDisplayModal(false);
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId('');
    setNotesValue(notes);
    setHideForm(true);
  };

  const displayForm = () => {
    setHideForm(false);
  };
  const handleChange = e => {
    setNotesValue({
      ...notesValue,
      [e.target.name]: e.target.value,
    });
  };
  const addNote = e => {
    axiosWithAuth()
      .put(
        `/application/update-notes/${currentApplication.application_id}`,
        notesValue
      )
      .then(res => {
        updateModal();
      })
      .catch(err => {
        console.log(err);
      });
    e.preventDefault();
    setHideForm(true);
  };

  useEffect(() => {
    const getCurrentApp = () => {
      axiosWithAuth()
        .get(`/application/profileId/${profileId}`)
        .then(res => {
          setCurrentApplication(res.data);
          setNotesValue(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getCurrentApp();
  }, [profileId]);

  return (
    <>
      {currentApplication.role_name === undefined ? (
        <Modal
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          footer={null}
        >
          Application not found
        </Modal>
      ) : (
        <Modal
          title="Application"
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          className="modalStyle"
          footer={null}
        >
          <h3>{`${currentApplication.first_name} ${currentApplication.last_name}`}</h3>
          {currentApplication.role_name === 'mentee' ? (
            <div>
              <p>
                <b>Email:</b> {currentApplication.email}
              </p>
              <p>
                <b>Location:</b> {currentApplication.city},{' '}
                {currentApplication.state} {currentApplication.country}
              </p>

              <p>
                <b>Experience Level:</b> {currentApplication.experience_level}
              </p>
              <ul>
                <b>Membership Criteria:</b>
                {currentApplication.formerly_incarcerated === true ? (
                  <li>Formerly Incarcerated</li>
                ) : null}
                {currentApplication.low_income === true ? (
                  <li>Low Income</li>
                ) : null}
                {currentApplication.underrepresented_group === true ? (
                  <li>Belongs to underrepresented group</li>
                ) : null}
              </ul>
              <p>
                {' '}
                <b>Convictions:</b>{' '}
                {`${
                  currentApplication.formerly_incarcerated === true
                    ? currentApplication.list_convictions
                    : 'none'
                }`}
              </p>
              <ul>
                <b>Applicant needs help with:</b>{' '}
                {currentApplication.industry_knowledge === true ? (
                  <li>Industry Knowledge</li>
                ) : null}
                {currentApplication.pair_programming === true ? (
                  <li>Pair Programming</li>
                ) : null}
                {currentApplication.job_help === true ? (
                  <li>Job Help</li>
                ) : null}
              </ul>
              <p>
                <b>Subject most interested in:</b> {currentApplication.subject}
              </p>
              <p>
                <b>Role:</b> {currentApplication.role_name}
              </p>
              <p>
                <b>Other information:</b> {currentApplication.other_info}
              </p>
              <p>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </p>
              <p>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </p>
              <p>
                <b>Notes:</b> {currentApplication.application_notes}
              </p>
              <button onClick={displayForm} hidden={!hideForm}>
                Edit Notes
              </button>
            </div>
          ) : (
            <div>
              <p>
                <b>Email:</b> {currentApplication.email}
              </p>
              <p>
                <b>Location:</b> {currentApplication.city},{' '}
                {currentApplication.state} {currentApplication.country}
              </p>
              <p>
                <b>Current Employer:</b> {currentApplication.current_comp}
              </p>
              <p>
                <b>Tech Stack:</b> {currentApplication.tech_stack}
              </p>
              <p>
                <b>Experience Level:</b> {currentApplication.experience_level}
              </p>
              <p>
                <ul>
                  <b>Applicant wants to focus on:</b>{' '}
                  {currentApplication.industry_knowledge === true ? (
                    <li>Industry Knowledge</li>
                  ) : null}
                  {currentApplication.pair_programming === true ? (
                    <li>Pair Programming</li>
                  ) : null}
                  {currentApplication.job_help === true ? (
                    <li>Job Help</li>
                  ) : null}
                </ul>
              </p>
              <p>
                <b>Role:</b> {currentApplication.role_name}
              </p>
              <p>
                <b>Other information:</b> {currentApplication.other_info}
              </p>
              <p>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </p>
              <p>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </p>
              <p>
                <b>Notes:</b> {currentApplication.application_notes}
              </p>
              <button
                className="note-button-color"
                onClick={displayForm}
                hidden={!hideForm}
              >
                Edit Notes
              </button>
            </div>
          )}
          <form className="notesField" onSubmit={addNote} hidden={hideForm}>
            <textarea
              id="application_notes"
              type="text"
              name="application_notes"
              placeholder="Write Notes Here"
              value={notesValue.application_notes}
              onChange={handleChange}
              className="applicationNotes"
            />
            <button className="note-button-color">Save Notes</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ApplicationModal;
