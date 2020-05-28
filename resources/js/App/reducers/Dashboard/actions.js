import {
    DASHBOARD_SUCCESS,
    DASHBOARD_LOADING,
    DASHBOARD_FAILURE
} from "./actionTypes";
import requests from "../../requests";
import moment from "moment";

export const getDashboardData = () => {
    return (dispatch, getState) => {
        const { dateConfig } = getState().App;

        const params = {
            period_from: moment(dateConfig.dateFrom).format("YYYY-MM-DD"),
            period_to: moment(dateConfig.dateTo).format("YYYY-MM-DD")
        };

        dispatch(dashboardLoading(true));

        requests.Dashboard.getFinanceInfo({ params })
            .then(resp => {
                dispatch(dashboardSuccess(resp.data))
            })
            .catch(error => {
                dispatch(dashboardFailure(error))
            })
    }
};

const dashboardSuccess = data => ({
    type: DASHBOARD_SUCCESS,
    data
});

const dashboardLoading = isLoading => ({
    type: DASHBOARD_LOADING,
    isLoading
});

const dashboardFailure = error => ({
    type: DASHBOARD_FAILURE,
    error
});


