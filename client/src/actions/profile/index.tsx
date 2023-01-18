import { RETRIEVE_PROFILE_SUCCESS, RETRIEVE_PROFILE_LOADING, RETRIEVE_PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_ERROR } from "../../actions/types";
import { getProfile, updateProfile } from "../../utils/profile";

interface ResponseToJSON {
    body:
        {  
            createdAt: string,
            email: string,
            firstName: string,
            id: string,
            lastName: string,
            updatedAt: string,
        },
    message: string,
    status: number
}

export const retrieve: Function = (token: string) => (dispatch: Function): void => {
    dispatch({type: RETRIEVE_PROFILE_LOADING});
    return(
        getProfile(token)
        .then((res: Response) => (res.json()))
        .then((response: ResponseToJSON) => {
            if(response.status === 200){
                dispatch({type: RETRIEVE_PROFILE_SUCCESS, payload: {
                    body: response.body,
                    message: response.message
                }});
            } else {
                dispatch({type: RETRIEVE_PROFILE_ERROR, payload: {
                    message: response.message
                }});
            }
        })
        .catch((err: Error) => {
            dispatch({type: RETRIEVE_PROFILE_ERROR, payload: {
                error: err.message
            }})
        })
    );
};

export const update: Function = (token: string, firstName: string, lastName: string) => (dispatch: Function): void => {
    dispatch({ type: UPDATE_PROFILE_LOADING });
    return(
        updateProfile(token, firstName, lastName)
        .then((response: Response) => {
            if(response.status === 200){
                dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: {
                    firstName: firstName,
                    lastName: lastName,
                    updatedAt: new Date().toISOString()
                }});
            }
        })
        .catch((error: Error) => {
            dispatch({ type: UPDATE_PROFILE_ERROR, payload: {
                error: error.message
            }});
        })
    );
}