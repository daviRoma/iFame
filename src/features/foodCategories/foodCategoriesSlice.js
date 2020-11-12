import { createSlice } from '@reduxjs/toolkit';
import { foodCat } from '../../common/firestore';

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
      const foodCats = (await foodCat.get()).docs[0].get('categories');
      dispatch(storeCategoriesSuccess(foodCats));
    } catch (error) {
      console.log(error);
      dispatch(storeCategoriesFail('Error'));
    }
  };
};

export default foodCategoriesSlice.reducer;
