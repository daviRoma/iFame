import { useState, useEffect } from 'react';
import { getUserInfo } from '../api/FirebaseApi';

export const useEventPartecipants = (partecipantsId) => {
  const [partecipants, setPartecipants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPartInfo() {
      let info = [];
      if (partecipantsId) {
        partecipantsId.forEach(async (id) => {
          const user = await getUserInfo(id);
          info.push(user);
        });
      }
      setPartecipants(info);
    }
    setLoading(true);
    getPartInfo();
    setLoading(false);
  }, [partecipantsId]);

  return [partecipants, loading];
};
