import { RestaurantActionTypes } from '../stores/ActionTypes';
import * as API from '../api/FirebaseApi';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

export function restaurantLoad(restaurants) {
  return {
    type: RestaurantActionTypes.RESTAURANT_LOAD,
    payload: {
      restaurants,
    },
  };
}

export function restaurantLoadOld() {
  return function (dispatch) {
    dispatch({ type: RestaurantActionTypes.RESTAURANT_LOAD });
    API.getRestaurants()
      .then((restaurants) => dispatch(restaurantLoad(restaurants)))
      .catch((err) => {
        log.error('[RestaurantActions]::[restaurantLoadOld]', err);
        return dispatch({
          type: RestaurantActionTypes.RESTAURANT_LOAD_FAILURE,
        });
      });
  };
}

export function albumFetch() {
  return {
    type: RestaurantActionTypes.RESTAURANT_LOAD,
    payload: API.getRestaurants().then((response) => ({
      restaurants: response,
    })),
  };
}
