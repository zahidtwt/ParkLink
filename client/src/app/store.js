import { configureStore } from '@reduxjs/toolkit';
import verifyMobileSliceReducer from '../features/verifyNumber/verifyNumberAuthSlice';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import locationReducer from '../features/LocationSlice';

export const store = configureStore({
  reducer: {
    verifyMobile: verifyMobileSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
