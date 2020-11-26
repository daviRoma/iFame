import { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { getMyPosition } from '../features/google/googlePosition';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

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
      log.info('[iFame]::[useGeolocation]::[Platform]', Platform.OS);
      if (Platform.OS === 'ios') {
        getMyPosition(onSuccess, onError);
      } else if (Platform.OS === 'android') {
        const hasPermission = await checkPermissions();
        if (hasPermission) {
          getMyPosition(onSuccess, onError);
        } else {
          Alert.alert('Attenzione', "Abilita la posizione per usare l'app");
        }
      }
    }
    getPosition();
  }, []);
};
