import { createSlice } from '@reduxjs/toolkit';
import { logger } from 'react-native-logs';
import {
  getUserEvents,
  deleteEvent as deleteEventApi,
} from '../../api/FirebaseApi';
import * as Routes from '../../routes';

const log = logger.createLogger();

const initialState = {
  myEvents: null,
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
    eventDeleteStart(state) {
      state.loading = true;
    },
    eventDeleteSuccess(state) {
      state.loading = false;
    },
    eventDeleteFail(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getEventsStart,
  getEventsFail,
  getEventsSuccess,
  eventDeleteStart,
  eventDeleteSuccess,
  eventDeleteFail,
} = myEventsSlice.actions;

export const getAllUserEvents = (userId) => {
  log.info('[EventSlice]::[getAllUserEvents]');
  return (dispatch) => {
    dispatch(getEventsStart());
    const sub = getUserEvents(
      userId,
      (events) => dispatch(getEventsSuccess(events)),
      (error) => handleError(error, dispatch),
    );
    return sub;
  };
};

export const deleteEvent = (eventId, navigation) => {
  log.info('[EventSlice]::[deleteEvent]');
  return async (dispatch) => {
    try {
      dispatch(eventDeleteStart());
      await deleteEventApi(eventId);
      dispatch(eventDeleteSuccess());
      navigation.navigate(Routes.MY_EVENTS);
    } catch (error) {
      handleError(error);
    }
  };
};

export default myEventsSlice.reducer;

const handleError = (error, dispatch) => {
  const code = error.code;
  switch (code) {
    case 'event/invalid-user':
      dispatch(getEventsFail('Invalid user'));
      break;
    case 'event/invalid-parameters':
      dispatch(getEventsFail('Invalid get parameters'));
      break;
    default:
      dispatch(getEventsFail('Server error'));
      break;
  }
  log.error('[EventSlice]', error.message);
};
