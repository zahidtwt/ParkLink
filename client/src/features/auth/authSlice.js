import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      Cookies.remove('auth');
    },
    userUpdate: (state, action) => {
      state.user = action.payload.user;
      Cookies.set(
        'auth',
        JSON.stringify({
          user: action.payload.user,
        }),
        { expires: 1 } // 1 day
      );
    },
  },
});

export const { userLoggedIn, userLoggedOut, userUpdate } = authSlice.actions;
export default authSlice.reducer;
