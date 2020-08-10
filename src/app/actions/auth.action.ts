import { Action } from '@ngrx/store';
import { AuthData } from '../models/auth-data.model';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_USERID = '[Auth] Set User Id';
export const LOGIN = '[Auth] Login';
export const LOGIN_COMPLETED = '[Auth] Login Completed';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_COMPLETED = '[Auth] Logout Completed';
export const REGISTER = '[Auth] Register';
export const REGISTER_COMPLETED = '[Auth] Register Completed';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: AuthData) {}
}

export class RegisterCompleted implements Action {
  readonly type = REGISTER_COMPLETED;
  constructor(public payload: string) {}
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: AuthData) {}
}

export class LoginCompleted implements Action {
  readonly type = LOGIN_COMPLETED;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LogoutCompleted implements Action {
  readonly type = LOGOUT_COMPLETED;
}

export class SetUserId implements Action {
  readonly type = SET_USERID;
  constructor(public payload: string) {}
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | SetUserId | Login | LoginCompleted | Logout | LogoutCompleted | Register | RegisterCompleted;
