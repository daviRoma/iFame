import { createSlice } from '@reduxjs/toolkit';
import { getAllCities } from '../api/FirebaseApi';

const initialState = {
  cities: null,
  citiesLoading: false,
  citiesErrors: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    loadCitiesStart(state) {
      state.citiesLoading = true;
      state.citiesErrors = null;
    },
    loadCitiesSuccess(state, { payload }) {
      state.cities = payload;
      state.citiesLoading = false;
      state.citiesErrors = null;
    },
    loadCitiesError(state, { payload }) {
      state.citiesLoading = false;
      state.citiesErrors = payload;
    },
  },
});

export const {
  loadCitiesStart,
  loadCitiesError,
  loadCitiesSuccess,
} = citiesSlice.actions;

export function getAllCitiesAction() {
  return async (dispatch) => {
    dispatch(loadCitiesStart);
    try {
      const cities = await getAllCities();
      dispatch(loadCitiesSuccess(cities));
    } catch (error) {
      dispatch(loadCitiesError(error.message));
    }
  };
}

export default citiesSlice.reducer;
