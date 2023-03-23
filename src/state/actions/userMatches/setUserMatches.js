export const SET_USER_MATCHES = 'SET_USER_MATCHES';

export const setUserMatches = arrOfMatches => {
  console.log(`SET MATCHES`, arrOfMatches);
  let payload = arrOfMatches.map(row => {
    return {
      ...row,
    };
  });
  return { type: SET_USER_MATCHES, payload };
};
