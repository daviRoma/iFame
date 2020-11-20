import { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { getMyPosition } from '../features/google/googlePosition';

const checkPermissions = async () => {
  let hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (!hasPermission) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      hasPermission = true;
    } else {
      hasPermission = false;
    }
  }
  return hasPermission;
};

export const useGeolocation = (onSuccess, onError) => {
  useEffect(() => {
    async function getPosition() {
      const hasPermission = await checkPermissions();
      if (hasPermission) {
        getMyPosition(onSuccess, onError);
      } else {
        Alert.alert('Attenzione', "Abilita la posizione per usare l'app");
      }
    }
    getPosition();
  }, []);
};
