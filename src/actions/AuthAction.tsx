/* eslint-disable prettier/prettier */
import { User } from '../models/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTRATION = '[Auth] Registration',
  REGISTRATION_SUCCESS = '[Auth] Registration Success',
  REGISTRATION_FAILURE = '[Auth] Registration Failure',
  LOGOUT = '[Auth] Logout',
}

export const authLogin = (user: User) => {
  return {
    type: AuthActionTypes.LOGIN,
    payload: { user },
  };
};

export const authLogout = function () {
  return {
    type: AuthActionTypes.LOGOUT,
  };
};
