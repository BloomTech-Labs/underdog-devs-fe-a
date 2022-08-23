import { Modal, Button, List, Form, Input, Tag } from 'antd';
import '../../../styles/styles.css';
import './PendingApplication.css';

const MenteeModal = ({ applicant }) => {
  return (
    <>
      <div className="profile-intro">
        <div className="image-container">
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="I can do this if I work hard enough and practice my coding skills"
          />
        </div>
        <div className="profile-intro-description">
          <h2>
            {applicant.first_name} {applicant.last_name}
          </h2>
          <div className="preferences">
            <div>
              <p>Interested in: </p>
            </div>
            <div className="mentee-tag">
              <Tag color={'green'}>{applicant.tech_stack}</Tag>
            </div>
          </div>
        </div>
      </div>
      <List size="small">
        <List.Item className="list-item">
          <div className="list-item-column">
            <p>Role</p>
          </div>
          <div className="list-item-column">
            <p>Mentee</p>
          </div>
        </List.Item>
        <List.Item className="list-item">
          <div className="list-item-column">
            <p>Email:</p>
          </div>
          <div className="list-item-column">
            <p>{applicant.email}</p>
          </div>
        </List.Item>
        <List.Item className="list-item">
          <div className="list-item-column">
            <p>Location:</p>
          </div>
          <div className="list-item-column">
            <p>
              {applicant.state} {applicant.country}
            </p>
          </div>
        </List.Item>
        <List.Item className="list-item">
          <p className="list-item-column">Membership Criteria:</p>
          <div className="list-item-column">
            {applicant.formerly_incarcerated === true ||
            applicant.low_income === true ||
            applicant.underrepresented_group === true ? (
              <ul>
                {applicant.formerly_incarcerated === true ? (
                  <li>Formerly Incarcerated</li>
                ) : null}
                {applicant.low_income === true ? <li>Low Income</li> : null}
                {applicant.underrepresented_group === true ? (
                  <li>Belongs to underrepresented group</li>
                ) : null}
              </ul>
            ) : (
              <p>Not available</p>
            )}
          </div>
        </List.Item>
        <List.Item className="list-item">
          <p className="list-item-column">Convictions:</p>
          <div className="list-item-column">
            <ul>
              {applicant.formerly_incarcerated === true ? (
                applicant.convictions.split(', ').map(conviction => {
                  return <li key={conviction}>{conviction}</li>;
                })
              ) : (
                <p>None</p>
              )}
            </ul>
          </div>
        </List.Item>
        <List.Item className="list-item">
          <p className="list-item-column">Applicant needs help with:</p>
          <div className="list-item-column">
            {applicant.industry_knowledge === true ||
            applicant.pair_programming === true ||
            applicant.job_help === true ? (
              <ul>
                {applicant.industry_knowledge === true ? (
                  <li>Industry Knowledge</li>
                ) : null}
                {applicant.pair_programming === true ? (
                  <li>Pair Programming</li>
                ) : null}
                {applicant.job_help === true ? <li>Job Help</li> : null}
              </ul>
            ) : (
              <p>Not available</p>
            )}
          </div>
        </List.Item>
        <List.Item className="list-item">
          <p className="list-item-column">Other information:</p>
          <p className="list-item-column">{applicant.other_info}</p>
        </List.Item>
        <List.Item>
          <p className="list-item-column">Notes:</p>
          <p className="list-item-column">{applicant.application_notes}</p>
        </List.Item>
      </List>
    </>
  );
};

export default MenteeModal;
