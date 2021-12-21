import axios from 'axios';

// we will define a bunch of API calls here.
const apiUrl = process.env.REACT_APP_API_URI;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  localStorage.setItem('token', authState.idToken);
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(`${apiUrl}profiles`, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const getRole = async profile_id => {
  try {
    const res = await axios.get(`${apiUrl}roles/${profile_id}`);
    if (res.data.role_id) {
      localStorage.setItem('role_id', res.data.role_id);
      return res.data.role_id;
    }
  } catch (err) {
    alert('An error has occured. This is a bad error message.');
  }
};

export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  getRole,
  getAuthHeader,
};
