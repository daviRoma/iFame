import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { clearUserInfo, getUserInfo } from '../features/user/userSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let firstCall = true;
    const sub = auth().onIdTokenChanged((loggedUser) => {
      if (!firstCall) {
        if (loggedUser) {
          const unsubscribe = dispatch(getUserInfo());
          return unsubscribe;
        } else {
          dispatch(clearUserInfo());
        }
      }
      firstCall = false;
    });
    return sub;
  }, []);
};
