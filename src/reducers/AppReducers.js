import { IN_LOADING, LOADING_END } from '../stores/ActionTypes';

const INITIAL_STATE = {
  loading: true,
  logged: false,
  loadingSeconds: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IN_LOADING:
      return {
        ...state,
        loadingSeconds: state.loadingSeconds + 1,
      };
    case LOADING_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
