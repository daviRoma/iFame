import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * Collections
 */
export const users = firestore().collection('users');
export const foodCat = firestore().collection('food-categories');
export const events = firestore().collection('events');
export const cities = firestore().collection('cities');

/**
 * Events API
 */

/**
 * Get events created by user.
 * @param {String} userId
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export function getUserEvents(userId, onSuccess, onError) {
  return events.where('author', '==', userId).onSnapshot({
    next: (snapshot) => {
      let data = [];
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      onSuccess(data);
    },
    error: (e) => onError(e.message),
  });
}

/**
 * Get all events filtered by params
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export function getEvents(params, onSuccess, onError) {
  let collectionRef = events;

  if (params && params.preferences) {
    collectionRef = events.where('category', 'in', params.preferences);
  }
  if (params && params.location) {
    collectionRef = collectionRef.where('location', '==', params.location);
  } else {
    if (params && params.coordinates) {
      // Only perform range comparisons (<, <=, >, >=) on a single field
      collectionRef = collectionRef
        .where(
          'restaurant.coordinates.latitude',
          '<=',
          params.coordinates[0].latitude,
        )
        .where(
          'restaurant.coordinates.latitude',
          '>=',
          params.coordinates[1].latitude,
        );
    }
    if (params && params.date) {
      collectionRef = collectionRef.where('day', '==', params.date);
    }
  }

  return collectionRef.onSnapshot({
    next: (snapshot) => {
      let data = [];

      snapshot.forEach((documentSnapshot) => {
        if (params && params.coordinates) {
          if (
            documentSnapshot.data().restaurant.coordinates.longitude <=
              params.coordinates[0].longitude &&
            documentSnapshot.data().restaurant.coordinates.longitude >=
              params.coordinates[1].longitude
          ) {
            // take events from today date
            if (!params.date) {
              if (documentSnapshot.data().timestamp >= Date.now()) {
                data.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id,
                });
              }
            } else {
              data.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            }
          }
        } else {
          data.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        }
      });
      onSuccess(data);
    },
    error: (error) => onError(error.message),
  });
}

/**
 * Get filtered events by date, location and user preferences
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export function getFilteredEvents(params, onSuccess, onError) {
  let collectionRef = events;

  if (params && params.timestamp) {
    collectionRef = collectionRef.where('timestamp', '>=', params.timestamp);
  }

  return collectionRef.onSnapshot({
    next: (snapshot) => {
      let data = [];

      snapshot.forEach((documentSnapshot) => {
        if (params && params.coordinates) {
          if (
            documentSnapshot.data().restaurant.coordinates.latitude <=
              params.coordinates[0].latitude &&
            documentSnapshot.data().restaurant.coordinates.latitude >=
              params.coordinates[1].latitude &&
            documentSnapshot.data().restaurant.coordinates.longitude <=
              params.coordinates[0].longitude &&
            documentSnapshot.data().restaurant.coordinates.longitude >=
              params.coordinates[1].longitude
          ) {
            if (
              params.preferences.find(
                (pref) => pref === documentSnapshot.data().category,
              ) !== undefined
            ) {
              data.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            }
          }
        }
      });
      onSuccess(data);
    },
    error: (error) => onError(error.message),
  });
}

/**
 * Get filtered events by date, and in which the current user participates.
 * @param {Object} params
 */
export function getHookFilteredEvents(params, onSuccess) {
  let collectionRef = events;
  if (params && params.participation) {
    collectionRef = collectionRef.where(
      'currentParticipants',
      'array-contains',
      params.participation,
    );
  }

  if (params && params.timestamp) {
    collectionRef = collectionRef.where('timestamp', '>=', params.timestamp);
  }

  return collectionRef.onSnapshot({
    next: (snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      onSuccess(data);
    },
    error: (error) => console.log(error),
  });
}

export async function createEvent(event) {
  await events.add(event);
}

export async function deleteEvent(id) {
  await events.doc(id).delete();
}

export async function joinEvent(id) {
  const eventRef = events.doc(id);
  const user = auth().currentUser;
  return firestore().runTransaction(async (transaction) => {
    const event = await transaction.get(eventRef);
    if (event) {
      let partecipants = event.get('currentParticipants');
      if (!partecipants) {
        partecipants = [];
      }
      partecipants.push(user.uid);
      transaction.update(eventRef, {
        currentParticipants: partecipants,
      });
    }
  });
}

export async function unjoinEvent(id) {
  const eventRef = events.doc(id);
  const user = auth().currentUser;
  return firestore().runTransaction(async (transaction) => {
    const event = await transaction.get(eventRef);
    if (event) {
      let partecipants = event.get('currentParticipants');
      if (partecipants && partecipants.includes(user.uid)) {
        partecipants.splice(partecipants.indexOf(user.uid), 1);
        transaction.update(eventRef, { currentParticipants: partecipants });
      }
    }
  });
}

/**
 * User api
 */

export async function createUserDoc(id, data) {
  await users.doc(id).set(data);
}

export async function updateFoodPreferencies(id, foodPref) {
  await users.doc(id).update({ preferences: foodPref });
}

export async function getUser(id, onError, onSuccess) {
  const unsubscribe = users.doc(id).onSnapshot({
    error: (e) => onError(e.message),
    next: (snapshot) => {
      onSuccess(snapshot.data());
    },
  });
  return unsubscribe;
}

export async function getUserInfo(id) {
  const user = (await users.doc(id).get()).data();
  return user;
}

export async function updateUserInfo(id, userData) {
  await users.doc(id).update(userData);
}

/**
 * Food categories API
 */

export async function getFoodCat() {
  let foodCats = [];
  (await foodCat.get()).forEach((doc) => {
    let data = doc.data();
    data.key = doc.id;
    foodCats.push(data);
  });
  return foodCats;
}

/**
 * Cities API
 */

export async function getAllCities() {
  let ris = [];
  (await cities.get()).forEach((doc) => {
    let data = doc.data();
    data.key = doc.id;
    ris.push(data);
  });
  return ris;
}

export async function getCityById(id) {
  const data = await cities.doc(id).get();
  return data.data;
}
