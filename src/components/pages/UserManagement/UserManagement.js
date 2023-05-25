import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../state/actions/allUsers/getAllUsers';
import { useDispatch, connect } from 'react-redux';
import {
  Table,
  Button,
  Tabs,
  Modal,
  Tag,
  Divider,
  Descriptions,
  Spin,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import UserModal from './UserModal';
import axios from 'axios';
// import MatchingModal from '../MentorMenteeMatching/MatchingModal';

const UserManagement = ({ allMentors, allMentees, themeRedux }) => {
  const [userShow, setUserShow] = useState(false);
  const [matchShow, setMatchShow] = useState(false);
  const [user, setUser] = useState('');
  const [displayRole, setDisplayRole] = useState('Mentees');
  const dispatch = useDispatch();

  const handleChange = () => {
    displayRole === 'Mentors'
      ? setDisplayRole('Mentees')
      : setDisplayRole('Mentors');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayRole]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.name - b.name,
      render: (value, record) => (
        <p
          className="nameLink"
          onClick={() => {
            setUser(record);
            setUserShow(true);
          }}
        >{`${record.name}`}</p>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: 'superAdmin',
          value: 'superAdmin',
        },
        {
          text: 'admin',
          value: 'admin',
        },
        {
          text: 'mentor',
          value: 'Mentor',
        },
        {
          text: 'mentee',
          value: 'Mentee',
        },
      ],
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: 'Matches',
      dataIndex: 'numberOfMatches',
      filters: [
        {
          text: 'Not Matched',
          value: 0,
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => (
        <Button
          style={{
            backgroundImage:
              'linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%)',
            borderRadius: '.5rem',
            boxSizing: 'border-box',
            color: '#FFFFFF',
            display: 'flex',
            fontSize: '16px',
            justifyContent: 'center',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
          type="primary"
          onClick={() => {
            setUser(record);
            setMatchShow(true);
          }}
        >
          Edit Matches
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUsers('mentor'));
    dispatch(getAllUsers('mentee'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Manage Users</h2>
      {themeRedux === 'dark' ? (
        <Tabs
          type="card"
          items={[
            {
              key: '1',
              label: 'Mentees',
            },
            {
              key: '2',
              label: 'Mentors',
            },
          ]}
          defaultActiveKey="1"
          size="large"
          onChange={() => handleChange()}
        />
      ) : (
        <Tabs
          type="card"
          items={[
            {
              key: '1',
              label: <span style={{ color: 'black' }}>Mentees</span>,
            },
            {
              key: '2',
              label: <span style={{ color: 'black' }}>Mentors</span>,
            },
          ]}
          defaultActiveKey="1"
          size="large"
          onChange={() => handleChange()}
        />
      )}
      <Table
        columns={columns}
        dataSource={displayRole === 'Mentors' ? allMentors : allMentees}
      />
      <UserModal
        userShow={userShow}
        handleCancel={() => setUserShow(false)}
        user={user}
      />
      <MatchingModal
        matchShow={matchShow}
        handleCancel={() => setMatchShow(false)}
        user={user}
        themeRedux={themeRedux}
      />
    </>
  );
};

export const MatchingModal = ({
  matchShow,
  handleCancel,
  user,
  themeRedux,
}) => {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [matchChangeHappened, SetMatchChangedHappened] = useState(false);
  const [userMatches, setUserMatches] = useState(null);
  const [suggestedMatches, setSuggestedMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const convertDate = previousDate => {
    const timestamp = new Date(previousDate);
    const newConvertedDate = timestamp.toLocaleString();
    if (newConvertedDate === 'Invalid Date') {
      return '';
    }
    return newConvertedDate;
  };

  async function getUserMatches(idArr, role) {
    setUserMatches(null);
    if (idArr) {
      role === 'mentor' ? (role = 'mentee') : (role = 'mentor');
      const results = [];
      let n = 0;
      if (idArr.length > 0) {
        while (n < idArr.length) {
          const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URI}matches/read/${role}`,
            data: {
              profile_id: idArr[n],
            },
          });
          results.push(res.data[0]);
          n++;
        }
      }
      setUserMatches(results);
    } else {
      setUserMatches(null);
    }
  }

  async function getSuggestedMatches(profile_id, role) {
    // setSuggestedMatches(null);
    setIsLoading(true);
    const results = [];
    let n = 0;
    const arrOfProfIDs = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URI}matches/${role}/${profile_id}`,
      data: {
        profile_id: `${profile_id}`,
      },
    })
      .then(resp => {
        return resp.data;
      })
      .catch(err => console.error(err));
    if (arrOfProfIDs.length > 0) {
      while (n < arrOfProfIDs.length) {
        const newRole = role === 'mentee' ? 'mentor' : 'mentee';
        const res = await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URI}matches/read/${newRole}`,
          data: {
            profile_id: arrOfProfIDs[n],
          },
        });
        results.push(res.data[0]);
        n++;
      }
    } else {
      setIsLoading(false);
      setSuggestedMatches([]);
    }
    setIsLoading(false);
    setSuggestedMatches(results);
  }

  async function updateUserMatches(profile, matchArr, role) {
    role = role.toLowerCase();
    await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URI}matches/update/${role}/${profile.profile_id}`,
      data: matchArr,
    });
    return;
  }

  useEffect(() => {
    setSuggestedMatches(null);
    if (user) {
      getUserMatches(user.matches, user.role.toLowerCase());
      if (user.validate_status === 'approved' && user.is_active) {
        getSuggestedMatches(user.profile_id, user.role.toLowerCase());
      }
    }
    setCurrentMatch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (matchChangeHappened) {
      dispatch(getAllUsers('mentor'));
      dispatch(getAllUsers('mentee'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMatch]);

  const matchChangeHandler = () => {
    SetMatchChangedHappened(true);
    let newUserArray = [...user.matches];
    let newOtherArray = [...currentMatch.matches];
    const matchRole =
      user.role.toLowerCase() === 'mentor' ? 'mentee' : 'mentor';
    if (!isMatched) {
      newUserArray.push(currentMatch.profile_id);
      newOtherArray.push(user.profile_id);
    } else {
      newUserArray = newUserArray.filter(el => {
        return el !== currentMatch.profile_id;
      });
      newOtherArray = newOtherArray.filter(el => {
        return el !== user.profile_id;
      });
    }
    updateUserMatches(user, newUserArray, user.role);
    updateUserMatches(currentMatch, newOtherArray, matchRole);
    getUserMatches(newUserArray, user.role.toLowerCase());
    setCurrentMatch(null);
  };

  return (
    <div>
      {user ? (
        <Modal
          title={
            <div className="header-api">
              <p style={{ marginBottom: '0px' }}>Matching</p>
              <Button
                type="link"
                className="cross"
                style={{
                  marginBottom: '0px',
                  color: '#000',
                  cursor: 'pointer',
                  fontWeight: 'bolder',
                }}
                onClick={() => {
                  setCurrentMatch(null);
                  handleCancel();
                }}
              >
                <CloseOutlined />
              </Button>
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
            <div className="matchingUserTable">
              <div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Name
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >
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
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    City &nbsp; State &#160; Country
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >{`${user?.city} / ${user?.state} / ${user?.country}`}</p>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Mentorship Topics
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? {
                            backgroundColor: '#303030',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }
                        : {
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }
                    }
                  >
                    {typeof user?.tech_stack === typeof '' ? (
                      <p>&nbsp; {user?.tech_stack} &nbsp;</p>
                    ) : (
                      user?.tech_stack.map((stack, idx) => {
                        return <p key={idx}> &nbsp; {`${stack}`} &nbsp;</p>;
                      })
                    )}
                  </p>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Other Topics
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >
                    {user?.other_info}
                  </p>
                </div>
              </div>

              <div className="MatchSuggestMatch">
                <div className="Matches">
                  <h4>Matches</h4>
                  {userMatches ? (
                    userMatches.map((row, idx) => {
                      return (
                        <>
                          <Divider style={{ margin: '8px 0' }} />
                          <div className="matchLine" key={idx}>
                            <p>{`${row.first_name} ${row.last_name}`}</p>
                            <p
                              onClick={() => {
                                setCurrentMatch(row);
                                setIsMatched(true);
                              }}
                              className="viewLink"
                            >
                              View
                            </p>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <Tag color="orange">No Matches</Tag>
                  )}
                </div>

                <div className="Suggestions">
                  <h4>Suggested Matches</h4>
                  {suggestedMatches && suggestedMatches.length > 0 ? (
                    suggestedMatches.map((row, idx) => {
                      return (
                        <>
                          <Divider style={{ margin: '8px 0' }} />
                          <div className="suggestLine" key={idx}>
                            <p>{`${row.first_name} ${row.last_name}`}</p>
                            <p
                              className="viewLink"
                              onClick={() => {
                                setCurrentMatch(row);
                                setIsMatched(false);
                              }}
                            >
                              View
                            </p>
                          </div>
                        </>
                      );
                    })
                  ) : isLoading ? (
                    <Spin />
                  ) : (
                    <Tag color="orange">No Suggested Matches</Tag>
                  )}
                </div>
              </div>
            </div>
            <br />
            {currentMatch ? (
              <div
                className="matchingUserTable"
                style={
                  themeRedux === 'dark'
                    ? { backgroundColor: 'grey' }
                    : { backgroundColor: '#D9D9D9' }
                }
              >
                <div className="addMentorContainer">
                  {!isMatched ? (
                    <Button
                      className="ant-btn-primary"
                      onClick={() => {
                        matchChangeHandler();
                      }}
                    >
                      Add as a Match
                    </Button>
                  ) : (
                    <div className="updated">
                      {currentMatch.updated_at ? (
                        <span>
                          Updated: {convertDate(currentMatch.updated_at)}
                        </span>
                      ) : null}
                      <Button
                        className="ant-btn-secondary"
                        onClick={() => {
                          matchChangeHandler();
                        }}
                      >
                        Remove Match
                      </Button>
                    </div>
                  )}
                </div>
                <br></br>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Name
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >
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
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Email
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >{`${currentMatch.email}`}</p>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    City / State / Country
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >{`${currentMatch.city} / ${currentMatch.state} / ${currentMatch.country}`}</p>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Current Company / Position
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >
                    {currentMatch.current_company}
                  </p>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Mentorship Topics
                  </div>
                  <div
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? {
                            backgroundColor: '#303030',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }
                        : {
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }
                    }
                  >
                    {currentMatch?.tech_stack ? (
                      typeof currentMatch.tech_stack === typeof '' ? (
                        <p>{currentMatch?.tech_stack}</p>
                      ) : (
                        currentMatch?.tech_stack.map((stack, idx) => {
                          return <p key={idx}>{`${stack}`}</p>;
                        })
                      )
                    ) : null}
                  </div>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Other Topics
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >
                    {currentMatch.other_info}
                  </p>
                </div>
                <div span={24} className="customCol">
                  <div
                    className="FieldTitle"
                    style={
                      themeRedux === 'light'
                        ? { backgroundColor: '#FAFAFA' }
                        : { backgroundColor: '#A6A6A6' }
                    }
                  >
                    Anything Else?
                  </div>
                  <p
                    className="FieldValue"
                    style={
                      themeRedux === 'dark'
                        ? { backgroundColor: '#303030' }
                        : { backgroundColor: '#FFFFFF' }
                    }
                  >
                    {currentMatch.other_info}
                  </p>
                </div>
              </div>
            ) : (
              <div className="descriptionContainer">
                <Descriptions
                  className="noCurrentMatch"
                  column={1}
                  layout="vertical"
                  bordered
                >
                  <Descriptions.Item label="">
                    Select a match or suggested match to view details.
                  </Descriptions.Item>
                </Descriptions>
              </div>
            )}
          </div>
          <div className="header-api"> </div>
        </Modal>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allMentors: state.user.allMentors,
    allMentees: state.user.allMentees,
    themeRedux: state.theme.theme,
  };
};

export default connect(mapStateToProps)(UserManagement);
