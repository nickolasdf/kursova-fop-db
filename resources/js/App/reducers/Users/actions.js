import requests from "../../requests";
import * as ActionTypes from "./actionTypes";

export const getUsers = (params = {}) => {
    return (dispatch, getState) => {
        const { tableParams } = getState().Users;

        dispatch(usersParams(params));
        dispatch(usersLoading(true));

        requests.User.get({ params: { ...tableParams, ...params } })
            .then(resp => {
                dispatch(usersSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }))
            })
            .catch(error => {
                dispatch(usersFailure(error))
            })
    }
};

const usersSuccess = ({ data, meta, links }) => {
    return {
        type: ActionTypes.USERS_SUCCESS,
        data: data,
        meta: meta,
        links: links
    }
};

const usersFailure = (error) => ({
    type: ActionTypes.USERS_FAILURE,
    error
});

const usersLoading = isLoading => ({
    type: ActionTypes.USERS_LOADING,
    isLoading
});

const usersParams = (params) => ({
    type: ActionTypes.USERS_PARAMS,
    params
});

export const usersReset = () => ({
    type: ActionTypes.USERS_RESET
});
