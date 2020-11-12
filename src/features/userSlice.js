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
    storeFoodPreferencies(state, { payload }) {
      state.errors = null;
      state.loading = false;
      state.foodPreferencies = payload;
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
    const userInfo = (await users.doc(user.email).get()).data();
    dispatch(storeInformation(userInfo));
  };
};

export const loadFoodPref = (foodPref) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    console.log(user);
  };
};

export default userSlice.reducer;
