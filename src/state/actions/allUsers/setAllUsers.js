export const SET_ALL_MENTORS = 'SET_ALL_MENTORS';
export const SET_ALL_MENTEES = 'SET_ALL_MENTEES';

export const setAllUsers = (list, role) => {
  let payload = list.map(row => {
    if (row.matches === undefined) {
      return {
        name: `${row.first_name} ${row.last_name}`,
        numberOfMatches: 0,
        role: role === 'mentor' ? 'Mentor' : 'Mentee',
        ...row,
      };
    } else {
      return {
        name: `${row.first_name} ${row.last_name}`,
        numberOfMatches: row.matches.length,
        role: role === 'mentor' ? 'Mentor' : 'Mentee',
        ...row,
      };
    }
  });
  if (role === 'mentor') {
    return { type: SET_ALL_MENTORS, payload };
  } else {
    return { type: SET_ALL_MENTEES, payload };
  }
};
