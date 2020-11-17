import firestore from '@react-native-firebase/firestore';

/**
 * Collections
 */
export const users = firestore().collection('users');
export const foodCat = firestore().collection('food-categories');
export const events = firestore().collection('events');

/**
 * Events Api
 */
export function getUserEvents(userId) {
  return (
    events
      // Filter results
      .where('author', '==', userId)
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) =>
          data.push({ ...documentSnapshot.data(), id: documentSnapshot.id }),
        );
        return data;
      })
  );
}

export function getEvents(params) {
  let collectionRef = events;
  if (params && params.location) {
    collectionRef = events.where('location', '==', params.location);
  } else {
    if (params && params.latitude && params.longitude) {
      collectionRef = events
        .where('latitude', '==', params.latitude)
        .where('longitude', '==', params.longitude);
    }
    if (params && params.date) {
      collectionRef = events.where('day', '==', params.date);
    }
  }

  return collectionRef.get().then((querySnapshot) => {
    let data = [];
    querySnapshot.forEach((documentSnapshot) =>
      data.push({ ...documentSnapshot.data(), id: documentSnapshot.id }),
    );
    return data;
  });
}

/**
 * User api
 */

export async function createUserDoc(id, data) {
  await users.doc(id).set(data);
}

export async function updateFoodPreferencies(id, foodPref) {
  await users.doc(id).update({ preferencies: foodPref });
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
    foodCats.push(doc.data());
  });
  return foodCats;
}
