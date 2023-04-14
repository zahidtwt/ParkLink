import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { verifyMobiles } from './authAPI';
const initialState = {
  username: undefined,
  mobileNo: '',
  status: 'idle',
  error: null,
};

export const verifyMobile = createAsyncThunk(
  'user/VerifyMobilee',
  async (mobile) => {
    const response = await verifyMobiles(mobile);
    return response;
  }
);

//create Slice
const userSlice = createSlice({
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
        state.mobileNo = action.payload.mobileNo;
      })
      .addCase(verifyMobile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default userSlice.reducer;
