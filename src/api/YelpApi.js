/**
 * Yelp Api
 */

let YELP_URL = 'https://api.yelp.com/v3/businesses/search?';
const CLIENT_ID = '5C6hf23e5LIc3QhWZImB4Q';
const API_Key =
  'AtCIj9fCI8cY2INrBtaomeGO1zk0_A6KROHfbPhTrD8jU1ZlWvAcgT8Lr4ONyiCgCTTzTbo404OaSJo2YrDiNuD4E0e1BRwau-1IA0VMD6lQRiuvZNmoahx8jVutX3Yx';

/**
 * get restaurants from yelp
 * @param {Object} params shoud be { location: string, [optional]latitude:decimal, [optional]longitde:decimal}
 */
export function getRestaurants(params) {
  setParams(params);

  // Default options are marked with *
  return fetch(YELP_URL, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_Key}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then((response) => response.json());
}

function setParams(params) {
  // location, latitude, longitude, categories (join with ',')
  Object.keys(params).forEach((key) => {
    if (params[key] != null) {
      YELP_URL += `${key}=${params[key]}&`;
    }
  });
  YELP_URL = YELP_URL.substring(0, YELP_URL.length - 1);
}
