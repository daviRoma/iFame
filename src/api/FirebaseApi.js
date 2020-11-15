import firestore from '@react-native-firebase/firestore';

/**
 * Events Api
 */
export function getUserEvents(userId) {
  return (
    firestore()
      .collection('events')
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
  const collectionRef = firestore().collection('events');

  if (params && params.location) {
    collectionRef.where('location', '==', params.location);
  } else {
    if (params && params.latitude && params.longitude) {
      collectionRef
        .where('latitude', '==', params.latitude)
        .where('longitude', '==', params.longitude);
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
