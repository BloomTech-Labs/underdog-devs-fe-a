export const SET_SUGGESTED_MATCHES = 'SET_SUGGESTED_MATCHES';

export const setSuggestedMatches = arrOfSugMatches => {
  let payload = arrOfSugMatches.map(row => {
    return {
      ...row,
    };
  });
  return { type: SET_SUGGESTED_MATCHES, payload };
};
