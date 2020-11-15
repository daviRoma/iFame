import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import restaurantReducer from '../features/restaurantSlice';
import eventREducer from '../features/eventSlice';

const appReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  event: eventREducer,
});

export default appReducer;
