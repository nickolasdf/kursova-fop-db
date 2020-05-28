import { CHART_FAILURE, CHART_LOADING, CHART_SUCCESS } from './actionTypes';
import moment from 'moment';
import requests from '../../requests';

export const getChartData = () => {
    return (dispatch, getState) => {
        const { dateConfig } = getState().App;

        const params = {
            period_from: moment(dateConfig.dateFrom).format('YYYY-MM-DD'),
            period_to: moment(dateConfig.dateTo).format('YYYY-MM-DD'),
            period_type: dateConfig.formatBy
        };

        dispatch(chartLoading(true));

        requests.Dashboard.getChart({ params })
            .then(res => {
                dispatch(chartSuccess(res.data));
            })
            .catch(error => {
                dispatch(chartFailure(error));
            });
    };
};

/**
 * Get chart data based on a certain data range
 */
export const getChartRangeData = range => {
    return (dispatch) => {
        console.log('range', range);

        const params = range;

        dispatch(chartLoading(true));

        requests.Dashboard.getChart({ params })
            .then(res => dispatch(chartSuccess(res.data)))
            .catch(error => dispatch(chartFailure(error)));
    };
};

const chartSuccess = data => ({
    type: CHART_SUCCESS,
    data
});

const chartLoading = isLoading => ({
    type: CHART_LOADING,
    isLoading
});

const chartFailure = error => ({
    type: CHART_FAILURE,
    error
});
