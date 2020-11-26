import { createSlice } from '@reduxjs/toolkit';
import { getFoodCat } from '../../api/FirebaseApi';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

const initialState = {
  foodCategories: null,
  loading: false,
  error: null,
};

const foodCategoriesSlice = createSlice({
  name: 'foodCategories',
  initialState,
  reducers: {
    storeCategoriesStart(state) {
      state.loading = true;
    },
    storeCategoriesSuccess(state, { payload }) {
      state.loading = false;
      state.foodCategories = payload;
      state.error = null;
    },
    storeCategoriesFail(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  storeCategoriesStart,
  storeCategoriesSuccess,
  storeCategoriesFail,
} = foodCategoriesSlice.actions;

export const loadCategories = () => {
  return async (dispatch) => {
    dispatch(storeCategoriesStart());
    try {
      const foodCats = await getFoodCat();
      dispatch(storeCategoriesSuccess(foodCats));
    } catch (error) {
      log.error('[foodCategoriesSlice]::[loadCategories]', error);
      dispatch(storeCategoriesFail('Error'));
    }
  };
};

export default foodCategoriesSlice.reducer;
