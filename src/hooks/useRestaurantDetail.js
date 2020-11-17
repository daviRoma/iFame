import { useEffect, useState } from 'react';
import { getRestaurantDetail } from '../api/YelpApi';

export const useRestaurantDetail = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSingleResult = async () => {
    try {
      setLoading(true);
      const ris = await getRestaurantDetail(id);
      console.log(ris);
      setRestaurant(ris);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    getSingleResult();
  }, []);
  return { restaurant, loading, error };
};
