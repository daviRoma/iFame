import auth from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import * as Routes from '../routes';

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
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.loading = false;
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
    },
    clearRegistrationMessage(state) {
      state.isRegistered = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  cleanErrors,
  registrationSuccess,
  clearRegistrationMessage,
} = authSlice.actions;

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginStart());
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
      dispatch(loginStart());
      await auth().createUserWithEmailAndPassword(email, password);
      dispatch(registrationSuccess());
      navigation.navigate(Routes.LOGIN);
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
