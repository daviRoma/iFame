import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import foodCatReducer from '../features/foodCategories/foodCategoriesSlice';
import restaurantReducer from '../features/restaurants/restaurantSlice';
import eventReducer from '../features/events/eventSlice';
import eventCreationReducer from '../features/eventCreation/eventCreationSlice';
import citiesReducer from '../features/citiesSlice';
import myEventsReducer from '../features/myEvents/myEventsSlice';

const appReducer = combineReducers({
  loggedUser: userReducer,
  auth: authReducer,
  foodCat: foodCatReducer,
  restaurant: restaurantReducer,
  event: eventReducer,
  eventCreation: eventCreationReducer,
  cities: citiesReducer,
  myEvents: myEventsReducer,
});

export default appReducer;
