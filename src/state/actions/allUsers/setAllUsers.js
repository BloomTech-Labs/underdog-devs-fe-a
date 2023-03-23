export const SET_ALL_USERS = 'SET_ALL_USERS';

export const setAllUsers = (list, role) => {
  let payload = list.map(row => {
    return {
      name: `${row.first_name} ${row.last_name}`,
      numberOfMatches: row.matches.length,
      role: role,
      ...row,
    };
  });
  return { type: SET_ALL_USERS, payload };
};
