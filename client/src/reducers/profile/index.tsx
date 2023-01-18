import { AnyAction } from 'redux'
import { RETRIEVE_PROFILE_SUCCESS, RETRIEVE_PROFILE_LOADING, RETRIEVE_PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_ERROR, RESET_PROFILE } from "../../actions/types";

interface Profile {  
    createdAt: string | null,
    email: string | null,
    firstName: string | null,
    id: string | null,
    lastName: string | null,
    updatedAt: string | null,
};

interface ProfileState {
    loading: boolean,
    error: string | null,
    data: Profile | null,
    message: string | null,
}

const initialState: ProfileState = {
    loading: false,
    error: null,
    data: {
        createdAt: null,
        email: null,
        firstName: null,
        id: null,
        lastName: null,
        updatedAt: null,
    },
    message: null,
};

export const profileReducer = (state = initialState, action: AnyAction): ProfileState => {
    switch (action.type) {
        case RETRIEVE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload.body,
                message: action.payload.message,
            };
        case RETRIEVE_PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case RETRIEVE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    createdAt: state.data ? state.data.createdAt : null,
                    email: state.data ? state.data.email : null,
                    firstName: action.payload.firstName,
                    id: state.data ? state.data.id : null,
                    lastName: action.payload.lastName,
                    updatedAt: action.updatedAt,
                }
            };
        case UPDATE_PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case RESET_PROFILE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}