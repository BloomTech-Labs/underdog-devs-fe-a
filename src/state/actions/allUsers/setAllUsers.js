import { Tag } from 'antd';

export const SET_ALL_MENTORS = 'SET_ALL_MENTORS';
export const SET_ALL_MENTEES = 'SET_ALL_MENTEES';

export const setAllUsers = (list, role) => {
  let payload = list.map(row => {
    return {
      name: `${row.first_name} ${row.last_name}`,
      numberOfMatches:
        row.matches && row.matches.length > 0 ? (
          row.matches.length
        ) : (
          <Tag color={'orange'}>No Matches</Tag>
        ),
      role: role === 'mentor' ? 'Mentor' : 'Mentee',
      matches: row.matches === undefined ? [] : row.matches,
      ...row,
    };
  });
  if (role === 'mentor') {
    return { type: SET_ALL_MENTORS, payload };
  } else {
    return { type: SET_ALL_MENTEES, payload };
  }
};
