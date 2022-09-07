import React, { useEffect, useState } from 'react';
import '../../../styles/styles.css';
import './PendingApplication.css';
import { Modal, Button, List, Divider, Form, Input } from 'antd';
import { applicationApprove } from '../../../state/actions/applications/setApplicationApprove';
import { applicationReject } from '../../../state/actions/applications/setApplicationReject';

import { useDispatch } from 'react-redux';

/**
 * @param {applicationProfile}
 * @returns pending applications
 * Passed applicationProfile state from pendingApplication.js and rendered the applications in applicationModal.
 */

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
  applicationProfile,
}) => {
  const [currentApplication, setCurrentApplication] = useState();
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
   * @param {pendingAppHelper} Function
   * @returns Mentor or Mentee parameter for approveApplication or rejectApplication
   * If current.application.accepting_new_mentees exists then the account is a Mentor which means we have to pass in an Object in the request body with current_company
   * and validate_status yet if it doesnt exist then its a Mentee and we only pass in validate_status.
   */

  const pendingAppHelper = status => {
    const mentor =
      currentApplication.accepting_new_mentees === undefined
        ? {
            validate_status: status,
          }
        : {
            validate_status: status,
            current_company: currentApplication.current_company,
          };
    return mentor;
  };

  /**
   * Author: Khaleel Musleh
   * @param {approveApplication}
   * Approve application dispatches a request to setApplicationApprove in state/actions/applications which then returns a response of either a success or error status
   */

  const approveApplication = () => {
    dispatch(applicationApprove(profileId, pendingAppHelper('approved')))
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  /**
   * Author: Khaleel Musleh
   * @param {rejectApplication}
   * Reject application dispatches a request to setApplicationReject in state/actions/applications which then returns a response of either a success or error status
   */

  const rejectApplication = () => {
    dispatch(applicationReject(profileId, pendingAppHelper('rejected')))
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  // /*eslint array-callback-return: ["error", { allowImplicit: true }]*/
  useEffect(() => {
    const getCurrentApp = () => {
      Object.values(applicationProfile).map(current_id => {
        if (current_id?.profile_id == profileId)
          setCurrentApplication(current_id);
      });
    };
    getCurrentApp();
  }, [profileId]);

  return (
    <>
      {currentApplication?.profile_id === undefined ? (
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
                <b>Role:</b>
                {currentApplication.accepting_new_mentees === undefined
                  ? 'Mentee'
                  : 'Mentor'}
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
                <b>Application Status:</b> {currentApplication.other_info}
              </List.Item>
            </List>
          ) : (
            <List size="small" bordered>
              <List.Item>
                <b>Role:</b>{' '}
                {currentApplication.accepting_new_mentees === undefined
                  ? 'Mentee'
                  : 'Mentor'}
              </List.Item>
              <List.Item>
                <b>Email:</b> {currentApplication.email}
              </List.Item>
              <List.Item>
                <b>Location:</b> {currentApplication.city},{' '}
                {currentApplication.state} {currentApplication.country}
              </List.Item>
              <List.Item>
                <b>Current Employer:</b> {currentApplication.current_company}
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
                <b>Application Status:</b> {currentApplication.validate_status}
              </List.Item>
            </List>
          )}
        </Modal>
      )}
    </>
  );
};

export default ApplicationModal;
