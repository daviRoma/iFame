import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';

const appReducer = combineReducers({
  loggedUser: userReducer,
  auth: authReducer,
});

export default appReducer;
