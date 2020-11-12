import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/userSlice';
import foodCatReducer from '../features/foodCategories/foodCategoriesSlice';

const appReducer = combineReducers({
  loggedUser: userReducer,
  auth: authReducer,
  foodCat: foodCatReducer,
});

export default appReducer;
