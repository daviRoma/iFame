/**
 * Restaurant slice - Redux
 */
import { createSlice } from '@reduxjs/toolkit';
import { getRestaurants } from '../api/YelpApi';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

const initialState = {
  restaurants: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    restaurantGet(state) {
      state.loading = true;
    },
    restaurantGetSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.restaurants = action.payload;
    },
    restaurantGetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cleanErrors(state) {
      state.error = null;
    },
  },
});

export const {
  restaurantGet,
  restaurantGetSuccess,
  restaurantGetFail,
  cleanErrors,
} = restaurantSlice.actions;

export const getAllRestaurant = (params) => {
  log.info('[RestaurantSlice]::[getAllRestaurants]');
  return (dispatch) => {
    dispatch(restaurantGet());
    getRestaurants(params)
      .then((json) => {
        dispatch(restaurantGetSuccess(json.businesses));
        return json.businesses;
      })
      .catch((error) => {
        handleError(error, dispatch);
      });
  };
};

const handleError = (error, dispatch) => {
  const code = error.code;
  switch (code) {
    case 'restaurant/invalid-user':
      dispatch(restaurantGetFail('Invalid user'));
      break;
    case 'restaurant/invalid-parameters':
      dispatch(restaurantGetFail('Invalid get parameters'));
      break;
    default:
      dispatch(restaurantGetFail('Server error'));
      break;
  }
  log.error('[RestaurantSlice]', error.message);
};

export default restaurantSlice.reducer;
