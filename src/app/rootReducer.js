import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import foodCatReducer from '../features/foodCategories/foodCategoriesSlice';
import restaurantReducer from '../features/restaurantSlice';
import eventREducer from '../features/eventSlice';

const appReducer = combineReducers({
  loggedUser: userReducer,
  auth: authReducer,
  foodCat: foodCatReducer,
  restaurant: restaurantReducer,
  event: eventREducer,
});

export default appReducer;
