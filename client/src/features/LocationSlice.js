import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: { longitude: null, latitude: null },
  reducers: {
    setLocation(state, action) {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
    clearLocation(state) {
      state.longitude = null;
      state.latitude = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
