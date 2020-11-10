import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

const initialState = {
  isLogged: false,
  loading: false,
  error: null,
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
  },
});

export const { loginStart, loginSuccess, loginFail } = authSlice.actions;

export const loginUser = ({ email, password }) => {
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
