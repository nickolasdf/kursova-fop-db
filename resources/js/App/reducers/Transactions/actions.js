import * as ActionTypes from './actionTypes';
import requests from '../../requests';

export const getCurrentTransactionsData = (config = {}) => {
    return async (dispatch, getState) => {
        const { tableParams } = getState().Transactions.currentTransactions;
        const params = {
            ...tableParams,
            ...config
        };

        dispatch(setCurrentTransactionsTableConfig(config));
        dispatch(currentTransactionsLoading(true));

        requests.Transaction.getTransactions({ params })
            .then(resp => {
                dispatch(currentTransactionsSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }));
            })
            .catch(error => {
                dispatch(currentTransactionsFailure(error));
            });
    };
};

const currentTransactionsSuccess = ({ data, meta, links }) => ({
    type: ActionTypes.CURRENT_TRANSACTIONS_SUCCESS,
    data,
    meta,
    links
});

const currentTransactionsLoading = isLoading => ({
    type: ActionTypes.CURRENT_TRANSACTIONS_LOADING,
    isLoading
});

const currentTransactionsFailure = error => ({
    type: ActionTypes.CURRENT_TRANSACTIONS_FAILURE,
    error
});

const setCurrentTransactionsTableConfig = config => ({
    type: ActionTypes.SET_CURRENT_TRANSACTIONS_TABLE_CONFIG,
    config
});

export const resetCurrentTransactions = () => ({
    type: ActionTypes.RESET_CURRENT_TRANSACTIONS
});

export const getNotCurrentTransactionsData = (newParams = {}) => {
    return async (dispatch, getState) => {
        const { tableParams } = getState().Transactions.notCurrentTransactions;

        const params = {
            ...tableParams,
            ...newParams
        };

        dispatch(setNotCurrentTransactionsTableConfig(params));
        dispatch(notCurrentTransactionsLoading(true));

        requests.Transaction.getTransactions({ params })
            .then(resp => {
                dispatch(notCurrentTransactionsSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }));
            })
            .catch(error => {
                dispatch(notCurrentTransactionsFailure(error));
            });
    };
};

const notCurrentTransactionsSuccess = ({ data, meta, links }) => ({
    type: ActionTypes.NOT_CURRENT_TRANSACTIONS_SUCCESS,
    data,
    meta,
    links
});

const notCurrentTransactionsLoading = isLoading => ({
    type: ActionTypes.NOT_CURRENT_TRANSACTIONS_LOADING,
    isLoading
});

const notCurrentTransactionsFailure = error => ({
    type: ActionTypes.NOT_CURRENT_TRANSACTIONS_FAILURE,
    error
});

const setNotCurrentTransactionsTableConfig = params => ({
    type: ActionTypes.SET_NOT_CURRENT_TRANSACTIONS_TABLE_CONFIG,
    params
});

export const resetNotCurrentTransactions = () => ({
    type: ActionTypes.RESET_NOT_CURRENT_TRANSACTIONS
});
