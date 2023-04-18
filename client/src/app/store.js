import { configureStore } from '@reduxjs/toolkit';
import verifyMobileSliceReducer from '../features/verifyNumber/verifyNumberAuthSlice';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import locationReducer from '../features/LocationSlice';
import parkingSliceReducer from '../features/parking/parkingSlice';

export const store = configureStore({
  reducer: {
    verifyMobile: verifyMobileSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    location: locationReducer,
    parking: parkingSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
