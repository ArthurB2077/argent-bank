import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, RESET_PROFILE } from "../types";
import {signIn, signUp} from '../../utils/auth';

interface ResponseToJSON {
    body: {
        token: string
    }
    message: string,
    status: number
};

interface User {
    email: string,
    password: string,
    token: string
};

export const register: Function = (email: string, password: string, firstName: string, lastName: string): Function => (dispatch: Function): void => {
    return (
        signUp(email, password, firstName, lastName)
        .then((response: Response) => {
            if (response.status === 200) {
                dispatch({
                    type: REGISTER_SUCCESS,
                });
            }
        })
        .catch((error: Error) => {
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.message
                }
            })
        })
    );
};

export const login: Function = (email: string, password: string): Function => (dispatch: Function): void => {
    return (
        signIn(email, password)
        .then((res: Response) => {
            return res.json();
        })
        .then((response: ResponseToJSON) => {
            const user: User = {
                email: email,
                password: password,
                token: response.body.token
            };
            if (response.status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        user: user,
                        message: response.message,
                    }
                });
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: {
                        message: response.message
                    }
                });
            };
        })
        .catch((error: Error) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    error: error.message
                }
            })
        })
    );
};
  
export const logout: Function = (): Function => (dispatch: Function): void => {
    dispatch({
        type: LOGOUT,
    });
    dispatch({
        type: RESET_PROFILE,
    })
    localStorage.setItem("user", 'null');
};