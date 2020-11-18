import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myEvents: [],
  loading: false,
  errors: null,
};

const myEventsSlice = createSlice({
  name: 'myEvents',
  initialState,
  reducers: {
    getEventsStart(state) {
      state.loading = true;
      state.errors = null;
    },
    getEventsSuccess(state, { payload }) {
      state.loading = false;
      state.myEvents = payload;
      state.errors = null;
    },
    getEventsFail(state, { payload }) {
      state.loading = false;
      state.errors = payload;
    },
  },
});

export const {
  getEventsStart,
  getEventsFail,
  getEventsSuccess,
} = myEventsSlice.actions;

export default myEventsSlice.reducer;
