import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { getAllRestaurant } from '../features/restaurants/restaurantSlice';
import { useFocusEffect } from '@react-navigation/native';

export const useRestaurants = (search, onLoad) => {
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant,
  );
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllRestaurant(search));
    }, []),
  );
  return { restaurants, loading, error };
};
