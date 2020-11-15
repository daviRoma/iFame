import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import * as Routes from '../../routes';
import { users } from '../../common/firestore';

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
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const {
  storeInformationStart,
  storeInformation,
  storeInformationFail,
  clearUserInfo,
  stopLoading,
} = userSlice.actions;

export const getUserInfo = (navigator) => {
  return async (dispatch) => {
    const user = auth().currentUser;
    if (!user) {
      navigator.navigate(Routes.LOGIN);
    }
    dispatch(storeInformationStart());
    const unsubscribe = users.doc(user.uid).onSnapshot({
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
    dispatch(storeInformationStart());
    await users.doc(auth().currentUser.uid).update({ preferencies: foodPref });
    dispatch(stopLoading());
  };
};

export const updateUser = (userData) => {
  return async (dispatch) => {
    dispatch(storeInformationStart());
    if (userData.email !== auth().currentUser.email) {
      try {
        await auth().currentUser.updateEmail(userData.email);
      } catch (error) {
        dispatch(storeInformationFail(error.message));
      }
    }
    await users.doc(auth().currentUser.uid).update(userData);
    dispatch(stopLoading());
  };
};

export default userSlice.reducer;
