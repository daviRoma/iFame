import axios from 'axios';

const SERVER_URL = 'https://firebase-api';

export const login = function () {
  return axios
    .get(SERVER_URL)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
