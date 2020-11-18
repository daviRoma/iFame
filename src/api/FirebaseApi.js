import firestore from '@react-native-firebase/firestore';

/**
 * Collections
 */
export const users = firestore().collection('users');
export const foodCat = firestore().collection('food-categories');
export const events = firestore().collection('events');
export const cities = firestore().collection('cities');

/**
 * Events Api
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

export function getEvents(params, onSuccess, onError) {
  let query = events;
  if (params && params.location) {
    query = events.where('location', '==', params.location);
  } else {
    if (params && params.latitude && params.longitude) {
      query = events
        .where('latitude', '==', params.latitude)
        .where('longitude', '==', params.longitude);
    }
  }

  return query.onSnapshot({
    next: (snapshot) => {
      let data = [];
      snapshot.forEach((documentSnapshot) =>
        data.push({ ...documentSnapshot.data(), id: documentSnapshot.id }),
      );
      onSuccess(data);
    },
    error: (error) => onError(error.message),
  });
}

export async function createEvent(event) {
  await events.add(event);
}

export async function deleteEvent(id) {
  await events.doc(id).delete();
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
