import axios from '../../utils/axios';

export const verifyMobiles = async (mobile) => {
  const response = await axios.get(`/api/verifymobile?mobile=${mobile}`);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post('/api/login', data);
  return response.data;
};

export const updateProfile = async (username, data) => {
  const response = await axios.put('/api/updateprofile', data);
  return response.data;
};
