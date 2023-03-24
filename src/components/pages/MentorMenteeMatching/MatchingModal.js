import React, { useEffect, useState } from 'react';
import { Modal, Tag, Button, Divider } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { getUserMatches } from '../../../state/actions/userMatches/getUserMatches';

const inital = {
  name: 'Branden Jones',
};

const MatchingModal = ({ matchShow, handleCancel, user, allUserMatches }) => {
  const [currentMatch, setCurrentMatch] = useState(allUserMatches[0]);
  const dispatch = useDispatch();
  console.log(`CURRENT MATCH`, currentMatch);

  useEffect(() => {
    dispatch(getUserMatches(user.matches, user.role));
    setCurrentMatch(allUserMatches[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
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
              <p className="FieldValue nameLink">
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
              <p className="FieldValue">{<span>{user?.tech_stack}</span>}</p>
            </div>
            <div span={24} className="customCol">
              <div className="FieldTitle">Other Topics</div>
              <p className="FieldValue">{user?.other_info}</p>
            </div>
          </div>

          <div className="MatchSuggestMatch">
            <div className="Matches">
              <h4>Matches</h4>
              {allUserMatches
                ? allUserMatches.map(row => {
                    return (
                      <>
                        <Divider style={{ margin: '8px 0' }} />
                        <div className="matchLine">
                          <p>{`${row.first_name} ${row.last_name}`}</p>
                          <p
                            style={{ color: 'blue' }}
                            onClick={() =>
                              allUserMatches
                                ? setCurrentMatch(allUserMatches[row])
                                : null
                            }
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
              <Divider style={{ margin: '8px 0' }} />
              <div className="suggestLine">
                <p>Name One</p>
                <p style={{ color: 'blue' }}>View</p>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div className="suggestLine">
                <p>Name Two</p>
                <p style={{ color: 'blue' }}>View</p>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div className="suggestLine">
                <p>Name Three</p>
                <p style={{ color: 'blue' }}>View</p>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div className="suggestLine">
                <p>Name Four</p>
                <p style={{ color: 'blue' }}>View</p>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div className="suggestLine">
                <p>Name Five</p>
                <p style={{ color: 'blue' }}>View</p>
              </div>
              <Divider style={{ margin: '8px 0' }} />
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
                  {user?.role === 'mentee' || user?.role === 'Mentee'
                    ? 'Mentee'
                    : 'Mentor'}
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
  );
};

const mapStateToProps = state => {
  return { allUserMatches: state.user.allUserMatches };
};

export default connect(mapStateToProps)(MatchingModal);
