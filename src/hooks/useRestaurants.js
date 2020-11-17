import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllRestaurant } from '../features/restaurants/restaurantSlice';

export const useRestaurants = (search) => {
  const { restaurants, loading } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurants) {
      dispatch(getAllRestaurant(search));
    }
  }, []);

  return { restaurants, loading };
};
