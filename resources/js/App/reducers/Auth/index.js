import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER } from "./actionTypes";
import userRoles from "../../config/userRoles"

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    userRoles: userRoles
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.accessToken,
                refreshToken: action.accessToken
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case LOGOUT:
            return {};
        default:
            return state;
    }
}
