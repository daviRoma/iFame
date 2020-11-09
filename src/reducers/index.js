/**
 * Reducers
 */
import { combineReducers } from 'redux';

import AppReducers from './AppReducers';
import RestaurantReducers from './RestaurantReducers';

const rootReducer = combineReducers({
  app: AppReducers,
  restaurant: RestaurantReducers,
});

export default rootReducer;
