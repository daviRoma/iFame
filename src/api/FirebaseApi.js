import database from '@react-native-firebase/database';

/**
 * Events Api
 */
export function getUserEvents(userId) {
  return database().ref(`/events/user/${userId}`).once('value');
}

export function getEvents(lat, lon) {
  return database().ref(`/events/all/${lat}/${lon}`).once('value');
}
