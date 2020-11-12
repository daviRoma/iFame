import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import * as Routes from '../routes';
import { users } from '../common/firestore';

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

const userSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    storeInformationStart(state) {
      state.loading = true;
    },
    storeInformation(state, { payload }) {
      state.user = payload;
      state.loading = false;
      state.errors = null;
    },
    storeInformationFail(state, { payload }) {
      state.errors = payload;
      state.loading = false;
    },
    clearUserInfo(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const {
  storeInformationStart,
  storeInformation,
  storeInformationFail,
  clearUserInfo,
} = userSlice.actions;

export const getUserInfo = (navigator) => {
  return async (dispatch) => {
    const user = auth().currentUser;
    if (!user) {
      navigator.navigate(Routes.LOGIN);
    }
    dispatch(storeInformationStart());
    const unsubscribe = users.doc(user.email).onSnapshot({
      error: (e) => dispatch(storeInformationFail(e.message)),
      next: (snapshot) => {
        dispatch(storeInformation(snapshot.data()));
      },
    });
    return unsubscribe;
  };
};

export const loadFoodPref = (foodPref) => {
  return async (dispatch) => {
    if (foodPref.length > 0) {
      dispatch(storeInformationStart);
      await users.doc(auth().currentUser.email).set({ preferencies: foodPref });
    }
  };
};

export default userSlice.reducer;
