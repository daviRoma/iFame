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
      state.error = action.payload.error;
    },
  },
});

export const { loginStart, loginSuccess, loginFail } = authSlice.actions;

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log(auth().currentUser);
      dispatch(loginSuccess());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

const handleError = (error, dispatch) => {
  dispatch(loginFail(error.message));
};

export default authSlice.reducer;
