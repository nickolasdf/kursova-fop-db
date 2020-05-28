import { LOGIN_SUCCESS, LOGIN_FAILURE, SET_USER, LOGOUT} from "./actionTypes";

export const logInSuccess = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    return { type: LOGIN_SUCCESS, accessToken, refreshToken };
};
export const setUser = user => ({ type: SET_USER, user});
export const logInFailure = () => ({ type: LOGIN_FAILURE });
export const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return { type: LOGOUT };
};
