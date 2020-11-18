import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCitiesAction } from '../features/citiesSlice';

export const useCities = () => {
  const dispatch = useDispatch();
  const { citiesLoading, cities } = useSelector((state) => state.cities);
  useEffect(() => {
    if (!cities) {
      dispatch(getAllCitiesAction());
    }
  }, []);
  return { citiesLoading, cities };
};
