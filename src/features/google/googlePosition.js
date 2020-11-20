import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
const GoogleAPIKey = 'AIzaSyC5ym4xWYvCczh74RGafSYgMaYqnhsLtJw';

export function getMyPosition(onSuccess, onError) {
  const id = Geolocation.getCurrentPosition(
    (pos) => {
      onSuccess(pos);
    },
    onError,
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 3000,
    },
  );
  return id;
}

export async function getReverseGeocoding(position) {
  const resp = await reverseGeocoding(position);
  return resp;
}

async function reverseGeocoding(position) {
  Geocoder.init(GoogleAPIKey);
  return Geocoder.from(position.latitude, position.longitude)
    .then((json) => {
      return {
        location: json.results[0].address_components[1].short_name,
        address: json.results[0].address_components[0].short_name,
      };
    })
    .catch((error) => console.warn(error));
}

export function getDistances(value, lat, lon) {
  switch (value) {
    case 30:
      return [
        { latitude: lat + 0.27112, longitude: lon + 0.35559 },
        { latitude: lat - 0.27112, longitude: lon - 0.35559 },
      ];
    case 25:
      return [
        { latitude: lat + 0.22391, longitude: lon + 0.29667 },
        { latitude: lat - 0.22391, longitude: lon - 0.29667 },
      ];
    case 20:
      return [
        { latitude: lat + 0.18061, longitude: lon + 0.2378 },
        { latitude: lat - 0.18061, longitude: lon - 0.2378 },
      ];
    case 15:
      return [
        { latitude: lat + 0.13499, longitude: lon + 0.17813 },
        { latitude: lat - 0.13499, longitude: lon - 0.17813 },
      ];
    case 10:
      return [
        { latitude: lat + 0.08995, longitude: lon + 0.11893 },
        { latitude: lat - 0.08995, longitude: lon - 0.11893 },
      ];
    case 5:
      return [
        { latitude: lat + 0.04509, longitude: lon + 0.05963 },
        { latitude: lat - 0.04509, longitude: lon - 0.05963 },
      ];
    default:
      break;
  }
}

/**
 * Km to latitude and longitude
 *
 * 30 km = 0,27112 - 0,35559
 * 25 km = 0,22391 - 0,29667
 * 20 km = 0,18061 - 0,2378
 * 15 km = 0,13499 - 0,17813
 * 10 km = 0,08995 - 0,11893
 * 5 km = 0,04509 - 0,05963
 */
