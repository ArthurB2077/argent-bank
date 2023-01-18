import { AnyAction } from 'redux'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../actions/types";

type InitialState = {
  isLoggedIn: boolean,
  user: string | null,
  message: string | null,
  error: string | null
}

let user = localStorage.getItem("user");
if (user) user = JSON.parse(user);

export const initialState: InitialState = user ? 
  (  
    { 
      isLoggedIn: true, 
      user,
      message: null,
      error: null
    } 
  )
    : 
  (  
    { 
      isLoggedIn: false,
      user: null,
      message: null,
      error: null
    }
  );

export const authReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;

    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          error: payload.error
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          message: payload.message,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          message: payload.message,
          error: payload.error,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  };