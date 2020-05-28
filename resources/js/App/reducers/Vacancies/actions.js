import requests from '../../requests';
import * as ActionTypes from './actionTypes';

export const getVacancies = (params = {}) => {
    return (dispatch, getState) => {
        const { tableParams } = getState().Customers;

        dispatch(vacanciesParams(params));
        dispatch(vacanciesLoading(true));

        requests.Vacancies.getAll({ params: { ...tableParams, ...params } })
            .then(resp => {
                dispatch(vacanciesSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }));
            })
            .catch(error => {
                dispatch(vacanciesFailure(error));
            });
    };
};

const vacanciesSuccess = ({ data, meta, links }) => {
    return {
        type: ActionTypes.VACANCIES_SUCCESS,
        data: data,
        meta: meta,
        links: links
    };
};

const vacanciesFailure = (error) => ({
    type: ActionTypes.VACANCIES_FAILURE,
    error
});

const vacanciesLoading = isLoading => ({
    type: ActionTypes.VACANCIES_LOADING,
    isLoading
});

const vacanciesParams = (params) => ({
    type: ActionTypes.VACANCIES_PARAMS,
    params
});

export const vacanciesReset = () => ({
    type: ActionTypes.VACANCIES_RESET
});
