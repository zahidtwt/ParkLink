import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationValue: null,
};

const locationReducer = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationValue: (state, action) => {
      state.locationValue = action.payload;
    },
  },
});

export const { setLocationValue } = locationReducer.actions;

export default locationReducer.reducer;
