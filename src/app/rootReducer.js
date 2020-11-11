import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

const appReducer = combineReducers({
  auth: authReducer,
});

export default appReducer;
