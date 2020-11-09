import { RestaurantActionTypes } from '../stores/ActionTypes';

const INITIAL_STATE = {
  restaurants: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${RestaurantActionTypes.RESTAURANT_LOAD}`:
      return {
        ...state,
        loading: true,
      };
    case `${RestaurantActionTypes.RESTAURANT_LOAD_FAILURE}`:
      return {
        ...state,
        loading: false,
      };
    case `${RestaurantActionTypes.RESTAURANT_LOAD_SUCCESS}`:
      return {
        ...state,
        restaurants: action.payload.restaurants,
        loading: false,
      };
    default:
      return state;
  }
};
