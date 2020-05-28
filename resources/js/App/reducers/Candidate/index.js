import {
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_PENDING,
    FETCH_USER_INFO_ERROR,
    PATCH_USER_INFO_SUCCESS,
    PATCH_USER_INFO_PENDING,
    PATCH_USER_INFO_ERROR,
    SAVE_USER_INFO
} from "./actionTypes";

const initialState = {
    userInfo: {},
    pending: true,
    patchUserPending: false,
    error: null,
};


export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_USER_INFO_SUCCESS: {
            return {
                ...state,
                pending: false,
                userInfo: action.payload,
            };
        }

        case FETCH_USER_INFO_PENDING:
            return {
                ...state,
                pending: true
            };

        case FETCH_USER_INFO_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: {...action.payload}
            };

        case PATCH_USER_INFO_PENDING:
            return {
                ...state,
                patchUserPending: true
            };

        case PATCH_USER_INFO_SUCCESS:
            return {
                ...state,
                patchUserPending: false
            };

        case PATCH_USER_INFO_ERROR:
            return {
                ...state,
                patchUserPending: false,
                error: action.error
            };

        default:
            return { ...state };
    }
};
