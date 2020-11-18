import auth from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { createEvent as createEventApi } from '../../api/FirebaseApi';
import * as Routes from '../../routes';

const initialState = {
  title: '',
  day: '',
  hour: '',
  location: '',
  category: '',
  partecipants: '',
  restaurant: null,
  description: '',
  loading: false,
  error: null,
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
    createEventStart(state) {
      state.loading = true;
    },
    createEventSuccess(state) {
      state.loading = false;
    },
    createEventError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  addInformations,
  clearInformations,
  createEventStart,
  createEventSuccess,
  createEventError,
} = eventCreationSlice.actions;

export default eventCreationSlice.reducer;

export function createEvent(navigation) {
  return async (dispatch, getState) => {
    dispatch(createEventStart);
    const {
      title,
      day,
      hour,
      location,
      category,
      partecipants,
      description,
      restaurant,
    } = getState().eventCreation;
    try {
      await createEventApi({
        title,
        day,
        hour,
        location,
        category,
        partecipants,
        description,
        restaurant,
        author: auth().currentUser.uid,
      });
      dispatch(createEventSuccess());
      navigation.navigate(Routes.MY_EVENTS);
    } catch (error) {
      dispatch(createEventError(error));
    }
  };
}
