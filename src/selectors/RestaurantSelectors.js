/**
 * Restaurant selectors
 */
const selectRestaurants = (state) => state.restaurant;

export const selectLoadedRestaurants = (state) =>
  selectRestaurants(state).restaurants;

export const selectRestaurantsLoading = (state) =>
  selectRestaurants(state).loading;
