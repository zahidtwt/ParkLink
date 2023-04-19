import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { verifyMobiles } from './verifyNumberAuthAPI';
const initialState = {
  username: undefined,
  mobile: '',
  status: 'idle',
  error: null,
};

export const verifyMobile = createAsyncThunk(
  'user/VerifyMobile',
  async (mobile) => {
    const response = await verifyMobiles(mobile);
    return response;
  }
);

//create Slice
const verifyMobileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyMobile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyMobile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.mobile = action.payload.mobile;
        state.profileImage = action.payload.profileImage;
        state.balance = action.payload.balance;
        state.due = action.payload.due;
      })
      .addCase(verifyMobile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default verifyMobileSlice.reducer;
