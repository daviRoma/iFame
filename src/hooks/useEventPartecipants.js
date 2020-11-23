import { useState, useEffect } from 'react';
import { getUserInfo } from '../api/FirebaseApi';

export const useEventPartecipants = (event) => {
  const [partecipants, setPartecipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPartecipants = async (parts) => {
    let info = [];
    if (parts && parts.length) {
      setLoading(true);
      await parts.forEach(async (id) => {
        const user = await getUserInfo(id);
        info.push(user);
        setPartecipants(info);
      });
      setLoading(false);
    } else {
      setPartecipants([]);
    }
  };

  useEffect(() => {
    getPartecipants(event.currentPartecipants);
  }, [event.currentPartecipants]);

  return [partecipants, loading];
};
