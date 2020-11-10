import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
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
    loginSuccess(state, { payload }) {
      state.loading = false;
      state.user = payload.user;
    },
    loginFail(state, { payload }) {
      state.loading = false;
      state.user = payload.user;
    },
  },
});

export default authSlice.reducer;
