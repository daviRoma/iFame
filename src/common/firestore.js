import firestore from '@react-native-firebase/firestore';

export const users = firestore().collection('users');
export const foodCats = firestore().collection('food-categories');
