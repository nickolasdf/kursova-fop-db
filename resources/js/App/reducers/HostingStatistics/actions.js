import * as ActionTypes from "./actionTypes";
import requests from "../../requests";

export const getHostingStatistics = () => {
    return dispatch => {

        dispatch(hostingStatisticsLoading(true));

        requests.Hostings.getStatistics()
            .then(resp => {
                dispatch(hostingStatisticsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(hostingStatisticsFailure(error))
            })
    }
};

const hostingStatisticsSuccess = data => ({
    type: ActionTypes.HOSTING_STATISTICS_SUCCESS,
    data
});

const hostingStatisticsFailure = error => ({
    type: ActionTypes.HOSTING_STATISTICS_FAILURE,
    error
});

const hostingStatisticsLoading = isLoading => ({
    type: ActionTypes.HOSTING_STATISTICS_LOADING,
    isLoading
});

