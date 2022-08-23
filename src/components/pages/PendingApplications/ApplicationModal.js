import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import '../../../styles/styles.css';
import './PendingApplication.css';
import { Modal, Button, List, Form, Input, Tag } from 'antd';

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
}) => {
  const notes = { application_notes: '' };
  const { TextArea } = Input;
  const [currentApplication, setCurrentApplication] = useState({});
  const [notesValue, setNotesValue] = useState(notes);
  const [hideForm, setHideForm] = useState(true);

  const updateModal = () => {
    axiosWithAuth()
      .post(`/application/profileId/${profileId}`)
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

  /**
   * Author: Khaleel Musleh
   * @param {approveApplication} e is for approving an application of a mentor_intake or mentee_intake Boolean from false to approved:true making a PUT call to the backend database server.
   */
  /**
   * Author: Christwide Oscar
   * @param {onConfirm} e was not created for the application approve and reject buttons. I changed the functions for the onConfirm to onClick and everything seem to work correctly from the console side.
   */
  const approveApplication = e => {
    console.log(currentApplication);
    axiosWithAuth()
      .post(`/application/approve/${currentApplication.profile_id}`, {
        profile_id: currentApplication.profile_id,
        low_income: currentApplication.low_income,
      })
      .then(res => {
        setCurrentApplication({ ...res.data, approved: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * Author: Khaleel Musleh
   * @param {rejectApplication} e is for rejecting an application of a mentor_intake or mentee_intake validateStatus from pending to rejected and making sure the approved Boolean is always at false, making a PUT call to the backend database server.
   */

  const rejectApplication = e => {
    axiosWithAuth()
      .post(`/application/reject/${currentApplication.profile_id}`, {
        profile_id: currentApplication.profile_id,
        low_income: currentApplication.low_income,
      })
      .then(res => {
        setCurrentApplication({ ...res.data, approved: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getCurrentApp = () => {
      axiosWithAuth()
        .post(`/application`)
        .then(res => {
          // console.log("RES: ", res);
          res.data.users.forEach((applicant, index) => {
            if (applicant['profile_id'] === profileId) {
              // console.log('applicant: ', applicant);
              applicant.hasOwnProperty('accepting_new_mentees')
                ? (applicant.role_name = 'mentor')
                : (applicant.role_name = 'mentee');
              console.log(applicant);
              setCurrentApplication(applicant);
              setNotesValue(applicant);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
    getCurrentApp();
  }, [profileId]);

  /*
  *Author: Melody McClure
  The suggestion was made by Elijah Hopkins that creating error handlers as a slice of state rather than leaving the console logs to handle errors would be a good decision. However this seems like it would be a seperate ticket so we are going to open that as a new issue to be worked on.
  */

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
          className={
            currentApplication.role_name === 'mentor'
              ? 'modalStyleMentor'
              : 'modalStyleMentee'
          }
          footer={[
            <Button key="edit-notes" onClick={displayForm} hidden={!hideForm}>
              Edit Notes
            </Button>,
            <Button key="submitA" type="primary" onClick={approveApplication}>
              Approve
            </Button>,
            <Button key="submitR" onClick={rejectApplication} danger>
              Reject
            </Button>,
          ]}
        >
          <div className="profile-intro">
            <div className="image-container">
              <img
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                alt="I can do this if I work hard enough and practice my coding skills"
              />
            </div>
            <div className="profile-intro-description">
              <h2>
                {currentApplication.first_name} {currentApplication.last_name}
              </h2>
              <div className="preferences">
                <div>
                  {currentApplication.hasOwnProperty(
                    'accepting_new_mentees'
                  ) === true ? (
                    <p>Can mentor in</p>
                  ) : (
                    <p>Interested in</p>
                  )}
                </div>
                {currentApplication.hasOwnProperty('accepting_new_mentees') ? (
                  <div className="tags-container">
                    {currentApplication.tech_stack.map(subject => {
                      return (
                        <div className="mentor-tag" key={subject}>
                          <Tag color={'green'}>{subject}</Tag>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mentee-tag">
                    <Tag color={'green'}>{currentApplication.tech_stack}</Tag>
                  </div>
                )}
              </div>
            </div>
          </div>
          {currentApplication.role_name === 'mentee' ? (
            <List size="small">
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Role</p>
                </div>
                <div className="list-item-column">
                  <p>
                    {currentApplication.role_name[0].toUpperCase() +
                      currentApplication.role_name.substring(
                        1,
                        currentApplication.role_name.length
                      )}
                  </p>
                </div>
              </List.Item>
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Email:</p>
                </div>
                <div className="list-item-column">
                  <p>{currentApplication.email}</p>
                </div>
              </List.Item>
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Location:</p>
                </div>
                <div className="list-item-column">
                  <p>
                    {currentApplication.state} {currentApplication.country}
                  </p>
                </div>
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
                    ? currentApplication.convictions
                    : 'none'
                }`} */}
              </List.Item>
              <List.Item className="list-item">
                <p className="list-item-column">Applicant needs help with:</p>
                <div className="list-item-column">
                  {currentApplication.industry_knowledge === true ||
                  currentApplication.pair_programming === true ||
                  currentApplication.job_help === true ? (
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
                  ) : (
                    <p>Not available</p>
                  )}
                </div>
              </List.Item>
              <List.Item className="list-item">
                <p className="list-item-column">Other information:</p>
                <p className="list-item-column">
                  {currentApplication.other_info}
                </p>
              </List.Item>
              <List.Item>
                <p className="list-item-column">Notes:</p>
                <p className="list-item-column">
                  {currentApplication.application_notes}
                </p>
              </List.Item>
            </List>
          ) : (
            <List size="small">
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Role</p>
                </div>
                <div className="list-item-column">
                  <p>
                    {currentApplication.role_name[0].toUpperCase() +
                      currentApplication.role_name.substring(
                        1,
                        currentApplication.role_name.length
                      )}
                  </p>
                </div>
              </List.Item>
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Email:</p>
                </div>
                <div className="list-item-column">
                  <p>{currentApplication.email}</p>
                </div>
              </List.Item>
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Location:</p>
                </div>
                <div className="list-item-column">
                  <p>
                    {currentApplication.state} {currentApplication.country}
                  </p>
                </div>
              </List.Item>
              <List.Item className="list-item">
                <div className="list-item-column">
                  <p>Current Role:</p>
                </div>
                <div className="list-item-column">
                  <p>
                    {currentApplication.current_position} {' at '}{' '}
                    {currentApplication.current_company}
                  </p>
                </div>
              </List.Item>
              <List.Item>
                <>Tech Stack:</> {currentApplication.tech_stack}
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
                <p>Other information:</p> {currentApplication.other_info}
              </List.Item>
              <List.Item>
                <p>Notes:</p> {currentApplication.application_notes}
              </List.Item>
              <Button
                onClick={displayForm}
                hidden={!hideForm}
                block
                size="small"
                type="dashed"
                style={{ background: 'white', borderColor: '#1890ff' }}
              >
                Edit Notes
              </Button>
            </List>
          )}
          <Form className="notesField" hidden={hideForm}>
            <Form.Item
              id="application_notes"
              type="text"
              value={notesValue.application_notes}
              onChange={handleChange}
              className="applicationNotes"
            >
              <TextArea autosize="true" placeholder="Edit notes here..." />
              <Button
                onClick={addNote}
                size="small"
                style={{ background: '#f0f0f0', borderColor: '#1890ff' }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ApplicationModal;
