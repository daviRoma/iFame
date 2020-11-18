/**
 * Event slice - Redux
 */
import { createSlice } from '@reduxjs/toolkit';
import {
  getEvents,
  getUserEvents,
  deleteEvent as deleteEventApi,
} from '../../api/FirebaseApi';
import { logger } from 'react-native-logs';
import * as Routes from '../../routes';

const log = logger.createLogger();

const selectEventState = (state) => state.event;
export const selectAllEvents = (state) => selectEventState(state).events;
export const selectEventById = (state, eventId) =>
  selectAllEvents(state).find((id) => id === eventId);
export const selectEventLoading = (state) => selectEventState(state).loading;
export const selectEventError = (state) => selectEventState(state).error;

const initialState = {
  events: [],
  loading: true,
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
      state.events = [...action.payload];
    },
    eventGetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cleanErrors(state) {
      state.error = null;
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
  eventGet,
  eventGetSuccess,
  eventGetFail,
  cleanErrors,
  eventDeleteSuccess,
  eventDeleteStart,
  eventDeleteFail,
} = eventSlice.actions;

export const getAllEvents = (params) => {
  log.info('[EventSlice]::[getAllEvents]');
  return async (dispatch) => {
    try {
      dispatch(eventGet());
      const events = await getEvents(params);
      dispatch(eventGetSuccess(events));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const getAllUserEvents = (userId) => {
  log.info('[EventSlice]::[getAllUserEvents]');
  return async (dispatch) => {
    try {
      dispatch(eventGet());
      const events = await getUserEvents(userId);
      dispatch(eventGetSuccess(events));
    } catch (error) {
      handleError(error, dispatch);
    }
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
