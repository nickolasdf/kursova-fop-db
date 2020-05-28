import requests from "../../requests";
import {
    HOSTINGS_FAILURE,
    HOSTINGS_LOADING,
    HOSTINGS_PARAMS,
    HOSTINGS_RESET,
    HOSTINGS_SUCCESS
} from "./actionTypes";

export const getHostings = (params = {}) => {
    return (dispatch, getState) => {
        const { tableParams } = getState().Hostings;

        dispatch(hostingsParams(params));
        dispatch(hostingsLoading(true));

        requests.Hostings.get({ params: { ...tableParams, ...params } })
            .then(resp => {
                dispatch(hostingsSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }))
            })
            .catch(error => {
                dispatch(hostingsFailure(error))
            })
    }
};

const hostingsSuccess = ({ data, meta, links }) => {
    return {
        type: HOSTINGS_SUCCESS,
        data: data,
        meta: meta,
        links: links
    }
};

const hostingsFailure = (error) => ({
    type: HOSTINGS_FAILURE,
    error
});

const hostingsLoading = isLoading => ({
    type: HOSTINGS_LOADING,
    isLoading
});

const hostingsParams = (params) => ({
    type: HOSTINGS_PARAMS,
    params
});

export const hostingsReset = () => ({
    type: HOSTINGS_RESET
});
