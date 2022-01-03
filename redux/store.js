import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter/counterSlice'
import authSlice from "./counter/auth";
export const store = configureStore({
  reducer: {
      counter: counterSlice,
      auth: authSlice
  },
})