import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import '../../../styles/styles.css';
import './PendingApplication.css';
import { Modal, Button, List, Divider, Form, Input } from 'antd';

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
      const pendingApplicants = [];
      axiosWithAuth()
        .post(`/application`)
        .then(res => {
          console.log(res.data)
          // res.data.filter(applicants => {
          //   if (applicants.validate_status === 'pending') {
          //     pendingApplicants.push(applicants);
          //   }
          // });
          // console.log('pendingApplicants ', pendingApplicants);
          // setCurrentApplication(res.data[0]);
          // setNotesValue(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getCurrentApp();
  }, [profileId]);
  //   const getCurrentApp = () => {
  //     axiosWithAuth()
  //       .post(`/application/${profileId}`)
  //       .then(res => {
  //         setCurrentApplication(res.data[0]);
  //         setNotesValue(res.data[0]);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };
  //   getCurrentApp();
  // }, [profileId]);
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
          className="modalStyle"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return to Previous
            </Button>,
            <Button key="submitA" type="primary" onClick={approveApplication}>
              Approve
            </Button>,
            <Button key="submitR" onClick={rejectApplication} danger>
              Reject
            </Button>,
          ]}
        >
          <Divider orientation="center">{`${currentApplication.first_name} ${currentApplication.last_name}`}</Divider>
          {currentApplication.role_name === 'mentee' ? (
            <List size="small" bordered>
              <List.Item>
                <b>Role:</b> {currentApplication.role_name}
              </List.Item>
              <List.Item>
                <b>Email:</b> {currentApplication.email}
              </List.Item>
              <List.Item>
                <b>Location:</b> {currentApplication.city},{' '}
                {currentApplication.state} {currentApplication.country}
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
                <b>Other information:</b> {currentApplication.other_info}
              </List.Item>
              {/* <List.Item>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </List.Item> */}
              <List.Item>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </List.Item>
              <List.Item>
                <b>Notes:</b> {currentApplication.application_notes}
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
              </List.Item>
            </List>
          ) : (
            <List size="small" bordered>
              <List.Item>
                <b>Role:</b> {currentApplication.role_name}
              </List.Item>
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
                <b>Other information:</b> {currentApplication.other_info}
              </List.Item>
              {/* <List.Item>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </List.Item> */}
              <List.Item>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </List.Item>
              <List.Item>
                <b>Notes:</b> {currentApplication.application_notes}
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
                type="dashed"
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
