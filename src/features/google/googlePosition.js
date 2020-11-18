import Geolocation from '@react-native-community/geolocation';

const GoogleAPIKey = 'AIzaSyC5ym4xWYvCczh74RGafSYgMaYqnhsLtJw';

export function getMyPosition() {
  return Geolocation.getCurrentPosition((info) => info.coords);
}

export function reverseGeocoding() {
  const myPosition = getMyPosition();
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${myPosition.latitude},${myPosition.longitude}&key=${GoogleAPIKey}`,
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(
        'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
      );
    });
}
