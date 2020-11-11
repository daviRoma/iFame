import firestore from '@react-native-firebase/firestore';

export const userPrefs = firestore().collection('userPrefs');
