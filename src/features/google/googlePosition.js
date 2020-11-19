import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
const GoogleAPIKey = 'AIzaSyC5ym4xWYvCczh74RGafSYgMaYqnhsLtJw';

export async function getMyPosition() {
  // notice, no then(), cause await would block and wait for the resolved result
  const position = await getCoordinates();
  return position;
}

export async function getReverseGeocoding() {
  const resp = await reverseGeocoding();
  return resp;
}

async function reverseGeocoding() {
  Geocoder.init(GoogleAPIKey); // use a valid API key

  const resp = await getMyPosition().then((info) => {
    return Geocoder.from(info.coords.latitude, info.coords.longitude)
      .then((json) => {
        return {
          location: json.results[0].address_components[1].short_name,
          address: json.results[0].address_components[0].short_name,
        };
      })
      .catch((error) => console.warn(error));
  });
  return resp;
}

function getCoordinates() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject);
  });
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
