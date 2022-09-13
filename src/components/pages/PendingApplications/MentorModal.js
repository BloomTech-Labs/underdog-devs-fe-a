import { List, Tag } from 'antd';

const MentorModal = ({ applicant }) => {
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
              <p>Can mentor in: </p>
            </div>
            <div className="tags-container">
              {applicant.tech_stack.map(subject => {
                return (
                  <div className="mentor-tag" key={subject}>
                    <Tag color={'green'}>{subject}</Tag>
                  </div>
                );
              })}
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
            <p>
              {applicant.role_name[0].toUpperCase() +
                applicant.role_name.substring(1, applicant.role_name.length)}
            </p>
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
          <div className="list-item-column">
            <p>Current Role:</p>
          </div>
          <div className="list-item-column">
            <p>
              {applicant.current_position} {' at '} {applicant.current_company}
            </p>
          </div>
        </List.Item>
        <List.Item className="list-item">
          <p className="list-item-column">Applicant wants to focus on:</p>
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
          <p className="list-item-column">
            {applicant.other_info || <p>None</p>}
          </p>
        </List.Item>
        <List.Item>
          <p className="list-item-column">Notes:</p>
          <p className="list-item-column">{applicant.application_notes}</p>
        </List.Item>
      </List>
    </>
  );
};

export default MentorModal;
