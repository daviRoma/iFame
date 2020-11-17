import axios from 'axios';

/**
 * Yelp Api
 */

let YELP_URL = 'https://api.yelp.com/v3/businesses';
const API_Key =
  'AtCIj9fCI8cY2INrBtaomeGO1zk0_A6KROHfbPhTrD8jU1ZlWvAcgT8Lr4ONyiCgCTTzTbo404OaSJo2YrDiNuD4E0e1BRwau-1IA0VMD6lQRiuvZNmoahx8jVutX3Yx';

const basePath = axios.create({
  baseURL: YELP_URL,
  headers: {
    Authorization: `Bearer ${API_Key}`,
  },
});

export const searchRestaurants = async (params) => {
  const url = setParams(YELP_URL + '/search?', params);
  try {
    console.log(url);
    const result = await basePath.get(url);
    return result.data.businesses;
  } catch (error) {
    throw error;
  }
};

// /**
//  * get restaurants from yelp
//  * @param {Object} params shoud be { location: string, [optional]latitude:decimal, [optional]longitde:decimal}
//  */
// export function getRestaurants(params) {
//   setParams(params);

//   // Default options are marked with *
//   return fetch(YELP_URL, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${API_Key}`,
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   }).then((response) => {
//     if (response.status === 200) {
//       return response.json();
//     } else{

//     }
//   });
// }

function setParams(url, params) {
  // location, latitude, longitude, categories (join with ',')
  Object.keys(params).forEach((key) => {
    if (params[key] != null) {
      url += `${key}=${params[key]}&`;
    }
  });
  return url.substring(0, url.length - 1);
}
