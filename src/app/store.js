import { configureStore } from '@reduxjs/toolkit';
import appReducer from './rootReducer';

export default configureStore({
  reducer: appReducer,
});
