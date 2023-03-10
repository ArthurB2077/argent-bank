import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../../reducers/auth';
import { profileReducer } from '../../reducers/profile';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    profileReducer: profileReducer
  }
});