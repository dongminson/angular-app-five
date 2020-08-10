import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USERID, LOGIN_COMPLETED, LOGIN, LOGOUT, LOGOUT_COMPLETED, REGISTER, REGISTER_COMPLETED, } from '../actions/auth.action';

export interface State {
  isAuthenticated: boolean;
  userId: string;
}

const initialState: State = {
  isAuthenticated: false,
  userId: '',
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGOUT_COMPLETED:
      return {
        ...state
      }
    case LOGIN_COMPLETED:
    case REGISTER_COMPLETED:
      return {
        ...state
      }
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGOUT:
      return {
        userId: null,
        isAuthenticated: false
      }
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    case SET_USERID:
      return {
        ...state,
        userId: action.payload
      };
    default: {
      return state;
    }
  }
}

export const selectIsAuth = (state: State) => state.isAuthenticated;
export const selectUserId = (state: State) => state.userId;