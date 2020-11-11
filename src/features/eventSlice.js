/**
 * Event slice - Redux
 */
import { createSlice } from '@reduxjs/toolkit';
import { getEvents, getUserEvents } from '../api/FirebaseApi';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

const initialState = {
  events: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    eventGet(state) {
      state.loading = true;
    },
    eventGetSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.events = action.payload;
    },
    eventGetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cleanErrors(state) {
      state.error = null;
    },
  },
});

export const {
  eventGet,
  eventGetSuccess,
  eventGetFail,
  cleanErrors,
} = eventSlice.actions;

export const getAllEvents = (lat, lon) => {
  log.info('[EventSlice]::[getAllEvents]');
  return async (dispatch) => {
    try {
      dispatch(eventGet());
      await getEvents(lat, lon);
      dispatch(eventGetSuccess());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const getAllUserEvents = (user) => {
  log.info('[EventSlice]::[getAllUserEvents]');
  return async (dispatch) => {
    try {
      dispatch(eventGet());
      await getUserEvents(user.Id);
      dispatch(eventGetSuccess());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

const handleError = (error, dispatch) => {
  const code = error.code;
  switch (code) {
    case 'event/invalid-user':
      dispatch(eventGetFail('Invalid user'));
      break;
    case 'event/invalid-parameters':
      dispatch(eventGetFail('Invalid get parameters'));
      break;
    default:
      dispatch(eventGetFail('Server error'));
      break;
  }
  log.error('[EventSlice]', error.message);
};

export default eventSlice.reducer;
