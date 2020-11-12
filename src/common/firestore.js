import firestore from '@react-native-firebase/firestore';

export const users = firestore().collection('users');
export const foodCat = firestore().collection('food-categories');
