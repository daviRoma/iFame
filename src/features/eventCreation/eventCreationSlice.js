import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  date: '',
  location: '',
  category: '',
  numPart: 0,
  restaurant: null,
  description: '',
};

export const selectState = (state) => state.eventCreation;

const eventCreationSlice = createSlice({
  name: 'eventCreation',
  initialState,
  reducers: {
    addInformations(state, { payload }) {
      const keys = Object.keys(payload);
      keys.forEach((key) => {
        state[key] = payload[key];
      });
    },
    clearInformations(state) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export const {
  addInformations,
  clearInformations,
} = eventCreationSlice.actions;

export default eventCreationSlice.reducer;
