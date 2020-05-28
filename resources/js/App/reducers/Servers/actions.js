import requests from "../../requests";
import {
    SERVERS_FAILURE,
    SERVERS_LOADING,
    SERVERS_SUCCESS
} from "./actionTypes";

export const getServers = () => {
    return dispatch => {

        dispatch(serversLoading(true));

        requests.Servers.get()
            .then(resp => {
                dispatch(serversSuccess(resp.data))
            })
            .catch(error => {
                dispatch(serversFailure(error))
            })
    }
};

const serversSuccess = (data) => ({
    type: SERVERS_SUCCESS,
    data
});

const serversFailure = (error) => ({
    type: SERVERS_FAILURE,
    error
});

const serversLoading = isLoading => ({
    type: SERVERS_LOADING,
    isLoading
});
