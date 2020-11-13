import auth from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../common/firestore';
import * as Routes from '../../routes';
import { clearUserInfo } from '../user/userSlice';

const initialState = {
  isLogged: false,
  loading: false,
  error: null,
  isRegistered: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingStart(state) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.loading = false;
      state.error = null;
      state.isRegistered = false;
      state.isLogged = true;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cleanErrors(state) {
      state.error = null;
    },
    registrationSuccess(state) {
      state.loading = false;
      state.isRegistered = true;
      state.error = null;
    },
    clearRegistrationMessage(state) {
      state.isRegistered = false;
    },
    logout(state) {
      state.loading = false;
      state.isLogged = false;
      state.error = null;
    },
  },
});

export const {
  loadingStart,
  loginSuccess,
  loginFail,
  cleanErrors,
  registrationSuccess,
  clearRegistrationMessage,
  logout,
} = authSlice.actions;

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(loginSuccess());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const signUpUser = (email, password, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const newUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await users.doc(newUser.user.uid).set({
        email: newUser.user.email,
        preferencies: [],
      });
      dispatch(registrationSuccess());
      navigation.navigate(Routes.LOGIN);
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      await auth().signOut();
      dispatch(logout());
      dispatch(clearUserInfo());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

const handleError = (error, dispatch) => {
  const code = error.code;
  switch (code) {
    case 'auth/email-already-in-use':
      dispatch(loginFail('Email already in use'));
      break;
    case 'auth/invalid-email':
      dispatch(loginFail('Email not valid'));
      break;
    case 'auth/weak-password':
      dispatch(loginFail('The password is too weak'));
      break;
    default:
      dispatch(loginFail('Wrong credentials'));
      break;
  }
  console.log(error.message);
};

export default authSlice.reducer;
