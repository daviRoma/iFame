import axios from 'axios';

/**
 * Yelp Api
 */

const YELP_URL = 'https://api.yelp.com/v3/businesses';
const API_Key =
  'AtCIj9fCI8cY2INrBtaomeGO1zk0_A6KROHfbPhTrD8jU1ZlWvAcgT8Lr4ONyiCgCTTzTbo404OaSJo2YrDiNuD4E0e1BRwau-1IA0VMD6lQRiuvZNmoahx8jVutX3Yx';

const basePath = axios.create({
  baseURL: YELP_URL,
  headers: {
    Authorization: `Bearer ${API_Key}`,
  },
});

export const searchRestaurants = async (params) => {
  const url = setParams('/search?', params);
  console.log(url);
  try {
    const result = await basePath.get(url);
    return result.data.businesses;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantDetail = async (id) => {
  try {
    const result = await basePath.get(`/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

function setParams(url, params) {
  // location, latitude, longitude, categories (join with ',')
  Object.keys(params).forEach((key) => {
    if (params[key] != null) {
      url += `${key}=${params[key]}&`;
    }
  });
  return url.substring(0, url.length - 1);
}
