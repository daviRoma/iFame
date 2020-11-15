import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCategories } from '../features/foodCategories/foodCategoriesSlice';

export const useFoodCategories = () => {
  const { foodCategories, loading } = useSelector((state) => state.foodCat);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!foodCategories) {
      dispatch(loadCategories());
    }
  }, []);
  return { foodCategories, loading };
};
