import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import foodCatReducer from '../features/foodCategories/foodCategoriesSlice';
import restaurantReducer from '../features/restaurantSlice';
import eventReducer from '../features/eventSlice';
import eventCreationReducer from '../features/eventCreation/eventCreationSlice';

const appReducer = combineReducers({
  loggedUser: userReducer,
  auth: authReducer,
  foodCat: foodCatReducer,
  restaurant: restaurantReducer,
  event: eventReducer,
  eventCreation: eventCreationReducer,
});

export default appReducer;
