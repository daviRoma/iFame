import { useState, useEffect } from 'react';
import { getUserInfo } from '../api/FirebaseApi';

export const useSingleUser = (user_id) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const getUser = async (id) => {
    setUserLoading(true);
    const user = await getUserInfo(id);
    setUser(user);
    setUserLoading(false);
  };

  useEffect(() => {
    getUser(user_id);
  }, [user_id]);

  return [user, userLoading];
};
