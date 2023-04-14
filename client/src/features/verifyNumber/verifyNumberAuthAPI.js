import axios from '../../utils/axios';

export const verifyMobiles = async (mobile) => {
  const response = await axios.get(`/auth/verifymobile?mobile=${mobile}`);
  return response.data;
};
