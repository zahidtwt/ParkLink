import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSliceReducer from '../features/authentication/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSliceReducer,
  },
});
