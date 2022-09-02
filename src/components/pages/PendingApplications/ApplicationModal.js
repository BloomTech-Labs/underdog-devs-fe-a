import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import '../../../styles/styles.css';
import './PendingApplication.css';
import { Modal, Button, List, Divider, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { getProfileId } from '../../../state/actions/userProfile/getProfileId';
// import { addNewNote } from '../../../state/actions/notes';
import { applicationApprove } from '../../../state/actions/applications/setApplicationApprove';
import { applicationReject } from '../../../state/actions/applications/setApplicationReject';

import { useDispatch } from 'react-redux';

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
  applicationProfile,
}) => {
  const { TextArea } = Input;
  const [currentApplication, setCurrentApplication] = useState({});
  const [hideForm, setHideForm] = useState(true);

  const dispatch = useDispatch();

  const handleOk = () => {
    setDisplayModal(false);
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId('');
    setHideForm(true);
  };

  const displayForm = () => {
    setHideForm(false);
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
    dispatch(
      applicationApprove(
        currentApplication.role_name,
        currentApplication.application_id,
        currentApplication.profile_id
      )
    );
  };

  /**
   * Author: Khaleel Musleh
   * @param {rejectApplication} e is for rejecting an application of a mentor_intake or mentee_intake validateStatus from pending to rejected and making sure the approved Boolean is always at false, making a PUT call to the backend database server.
   */

  const rejectApplication = e => {
    dispatch(
      applicationReject(
        currentApplication.role_name,
        currentApplication.application_id,
        currentApplication.profile_id
      )
    );
  };
  // /*eslint array-callback-return: ["error", { allowImplicit: true }]*/
  useEffect(() => {
    const getCurrentApp = () => {
      dispatch(getProfileId(profileId));
      Object.entries(applicationProfile).map(current_id => {
        if (current_id[1]?.profile_id == profileId)
          setCurrentApplication(current_id[1]);
      });
    };
    getCurrentApp();
  }, [profileId]);

  // console.log(Object.keys(applicationProfile[0]))

  // console.log([...applicationProfile])
  /*
  *Author: Melody McClure
  The suggestion was made by Elijah Hopkins that creating error handlers as a slice of state rather than leaving the console logs to handle errors would be a good decision. However this seems like it would be a seperate ticket so we are going to open that as a new issue to be worked on.
  */

  return (
    <>
      {currentApplication?.role_name === undefined ? (
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
              <List.Item>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </List.Item>
              <List.Item>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </List.Item>
              <List.Item>
                <b>Notes:</b> {'currentApplication.application_notes'}
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
              <List.Item>
                <b>Submission Date:</b>{' '}
                {currentApplication.created_at.slice(0, 10)}
              </List.Item>
              <List.Item>
                <b>Application Status:</b> {currentApplication.validateStatus}
              </List.Item>
              <List.Item>
                <b>Notes:</b> {'currentApplication.application_notes'}
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
              value={'notesValue'}
              className="applicationNotes"
            >
              <TextArea autosize="true" placeholder="Edit notes here..." />
              <Button
                onClick={'addNote'}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
    applicationProfile: state.user.ApplicationProfile,
  };
};

export default connect(mapStateToProps)(ApplicationModal);
