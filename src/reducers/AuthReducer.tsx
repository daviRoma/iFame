/* eslint-disable prettier/prettier */
import { AuthActionTypes } from '../actions/AuthAction';

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: false
};

export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                loading: true
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: true
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                error: false
            };
        default:
            return state;
    }
}
