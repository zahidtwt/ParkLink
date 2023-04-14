import { configureStore } from '@reduxjs/toolkit';
import verifyMobileSliceReducer from '../features/verifyNumber/verifyNumberAuthSlice';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    verifyMobile: verifyMobileSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
