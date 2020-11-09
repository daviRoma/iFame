import axios from 'axios';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

const URL = 'https://firebase.com';

/**
 * Get all restaurants
 */
export const getRestaurants = function () {
  return axios
    .get(`${URL}/api/restaurants`)
    .then((response) => response.data)
    .catch((error) => {
      log.error('[API]::[getRestaurants]', error);
      throw error;
    });
};

/**
 * Get all events
 */
export const getEvents = function () {
  return axios
    .get(`${URL}/api/events`)
    .then((response) => response.data)
    .catch((error) => {
      log.error('[API]::[getEvents]', error);
      throw error;
    });
};
