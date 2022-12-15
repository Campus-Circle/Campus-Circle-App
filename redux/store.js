import { configureStore } from '@reduxjs/toolkit';
import authSlice from './counter/auth';
export const store = configureStore({
  reducer: {
    auth: authSlice
  }
});
