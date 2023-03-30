import React, { useEffect, useState } from 'react';
import { Modal, Tag, Button, Divider } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { getUserMatches } from '../../../state/actions/userMatches/getUserMatches';
import { getSuggestedMatches } from '../../../state/actions/userMatches/getSuggestedMatches';

const MatchingModal = ({
  matchShow,
  handleCancel,
  user,
  userMatches,
  suggestedMatches,
}) => {
  const [currentMatch, setCurrentMatch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserMatches(user.matches, user.role.toLowerCase()));
      if (user.validate_status === 'approved' && user.is_active) {
        dispatch(getSuggestedMatches(user.profile_id, user.role.toLowerCase()));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!currentMatch && userMatches) {
      setCurrentMatch(userMatches[0]);
    }
    if (currentMatch && currentMatch !== userMatches[0]) {
      setCurrentMatch(userMatches[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMatches]);

  return (
    <div>
      {user ? (
        <Modal
          title={
            <div className="header-api">
              <p style={{ marginBottom: '0px' }}>Matching</p>
              <p
                className="cross"
                style={{
                  marginBottom: '0px',
                  color: '#000',
                  cursor: 'pointer',
                  fontWeight: 'bolder',
                }}
                onClick={handleCancel}
              >
                X
              </p>
            </div>
          }
          width={'80vw'}
          visible={matchShow}
          onCancel={handleCancel}
          okText={'Save Changes'}
          maskClosable={false}
          footer={null}
          className="UserModal"
        >
          <div className="MatchingModal">
            <div className="UserTable">
              <div>
                <div span={24} className="customCol">
                  <div className="FieldTitle">Name</div>
                  <p className="FieldValue">
                    {`${user?.first_name} ${user?.last_name}`}
                    <div className="userTag">
                      <Tag color="blue">
                        {user?.role === 'mentee' || user?.role === 'Mentee'
                          ? 'Mentee'
                          : 'Mentor'}
                      </Tag>
                    </div>
                  </p>
                </div>
                <div span={24} className="customCol">
                  <div className="FieldTitle">City/ State/ Country</div>
                  <p className="FieldValue">{`${user?.city} / ${user?.state} / ${user?.country}`}</p>
                </div>
                <div span={24} className="customCol">
                  <div className="FieldTitle">Mentorship Topics</div>
                  <p className="FieldValue">
                    {<span>{user?.tech_stack}</span>}
                  </p>
                </div>
                <div span={24} className="customCol">
                  <div className="FieldTitle">Other Topics</div>
                  <p className="FieldValue">{user?.other_info}</p>
                </div>
              </div>

              <div className="MatchSuggestMatch">
                <div className="Matches">
                  <h4>Matches</h4>
                  {userMatches
                    ? userMatches.map((row, idx) => {
                        return (
                          <>
                            <Divider style={{ margin: '8px 0' }} />
                            <div className="matchLine" key={idx}>
                              <p>{`${row.first_name} ${row.last_name}`}</p>
                              <p
                                onClick={() => setCurrentMatch(row)}
                                className="viewLink"
                              >
                                View
                              </p>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>

                <div className="Suggestions">
                  <h4>Suggested Matches</h4>
                  {suggestedMatches && suggestedMatches.length > 0 ? (
                    suggestedMatches.map(row => {
                      return (
                        <>
                          <Divider style={{ margin: '8px 0' }} />
                          <div className="suggestLine">
                            <p>{`${row.first_name} ${row.last_name}`}</p>
                            <p
                              className="viewLink"
                              onClick={() => setCurrentMatch(row)}
                            >
                              View
                            </p>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <Tag color="orange">No Suggested Matches</Tag>
                  )}
                </div>
              </div>
            </div>
            <br />
            <div className="UserTable">
              <div className="addMentorContainer">
                <Button className="ant-btn-primary">Add as a Match</Button>
              </div>
              <br></br>
              <div span={24} className="customCol">
                <div className="FieldTitle">Name</div>
                <p className="FieldValue">
                  {`${currentMatch.first_name} ${currentMatch.last_name}`}
                  <div className="userTag">
                    <Tag color="blue">
                      {user?.role.toLowerCase() === 'mentee'
                        ? 'Mentor'
                        : 'Mentee'}
                    </Tag>
                  </div>
                </p>
              </div>

              <div span={24} className="customCol">
                <div className="FieldTitle">Email</div>
                <p className="FieldValue">{`${currentMatch.email}`}</p>
              </div>
              <div span={24} className="customCol">
                <div className="FieldTitle">City/ State/ Country</div>
                <p className="FieldValue">{`${currentMatch.city} / ${currentMatch.state} / ${currentMatch.country}`}</p>
              </div>
              <div span={24} className="customCol">
                <div className="FieldTitle">Current Company/ Position</div>
                <p className="FieldValue">{currentMatch.current_company}</p>
              </div>
              <div span={24} className="customCol">
                <div className="FieldTitle">Mentorship Topics</div>
                <p className="FieldValue">
                  {<span>{currentMatch.tech_stack}</span>}
                </p>
              </div>
              <div span={24} className="customCol">
                <div className="FieldTitle">Other Topics</div>
                <p className="FieldValue">{currentMatch.other_info}</p>
              </div>
              <div span={24} className="customCol">
                <div className="FieldTitle">Anything Else?</div>
                <p className="FieldValue">{currentMatch.other_info}</p>
              </div>
            </div>
          </div>
          <div className="header-api"> </div>
        </Modal>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userMatches: state.user.allUserMatches,
    suggestedMatches: state.user.userSuggestedMatches,
  };
};

export default connect(mapStateToProps)(MatchingModal);
