import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Modal, Button, Popconfirm, List, Divider } from 'antd';
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
          setCurrentApplication(res.data[0]);
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
          title="Review Application"
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          className="modalStyle"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return to Previous
            </Button>,
            <Popconfirm title="Are you sure you want to reject?">
              <Button key="submit" danger>
                Reject
              </Button>
            </Popconfirm>,
            <Button key="submit" type="primary">
              Approved
            </Button>,
          ]}
        >
          <Divider orientation="center">{`${currentApplication.first_name} ${currentApplication.last_name}`}</Divider>

          {currentApplication.role_name === 'mentee' ? (
            <List size="small" bordered>
              <List.Item>
                <b>Email:</b> {currentApplication.email}
              </List.Item>
              <List.Item>
                <b>Location:</b> {currentApplication.city},{' '}
                {currentApplication.state} {currentApplication.country}
              </List.Item>
              <List.Item>
                <b>Experience Level:</b> {currentApplication.experience_level}
              </List.Item>
              <List.Item>
                <b>Membership Criteria:</b>
                <ul>
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
              </List.Item>
              <List.Item>
                {' '}
                <b>Convictions:</b>{' '}
                {`${
                  currentApplication.formerly_incarcerated === true
                    ? currentApplication.list_convictions
                    : 'none'
                }`}
              </List.Item>
              <List.Item>
                <b>Applicant needs help with:</b>{' '}
                <ul>
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
              </List.Item>
              <List.Item>
                <b>Subject most interested in:</b> {currentApplication.subject}
              </List.Item>
              <List.Item>
                <b>Role:</b> {currentApplication.role_name}
              </List.Item>
              <List.Item>
                <b>Other information:</b> {currentApplication.other_info}
              </List.Item>
              <List.Item>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </List.Item>
              <List.Item>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </List.Item>
              <List.Item>
                <b>Notes:</b> {currentApplication.application_notes}
              </List.Item>
              <button onClick={displayForm} hidden={!hideForm}>
                Edit Notes
              </button>
            </List>
          ) : (
            <List size="small" bordered>
              <List.Item>
                <b>Email:</b> {currentApplication.email}
              </List.Item>
              <List.Item>
                <b>Location:</b> {currentApplication.city},{' '}
                {currentApplication.state} {currentApplication.country}
              </List.Item>
              <List.Item>
                <b>Current Employer:</b> {currentApplication.current_comp}
              </List.Item>
              <List.Item>
                <b>Tech Stack:</b> {currentApplication.tech_stack}
              </List.Item>
              <List.Item>
                <b>Experience Level:</b> {currentApplication.experience_level}
              </List.Item>
              <List.Item>
                <b>Applicant wants to focus on:</b>{' '}
                <ul>
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
              </List.Item>
              <List.Item>
                <b>Role:</b> {currentApplication.role_name}
              </List.Item>
              <List.Item>
                <b>Other information:</b> {currentApplication.other_info}
              </List.Item>
              <List.Item>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </List.Item>
              <List.Item>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </List.Item>
              <List.Item>
                <b>Notes:</b> {currentApplication.application_notes}
              </List.Item>
              <button onClick={displayForm} hidden={!hideForm}>
                Edit Notes
              </button>
            </List>
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
            <button>Save Notes</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ApplicationModal;
