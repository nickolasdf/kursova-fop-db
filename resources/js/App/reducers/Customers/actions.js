import requests from "../../requests";
import * as ActionTypes from "./actionTypes";

export const getCustomers = (params = {}) => {
    return (dispatch, getState) => {
        const { tableParams } = getState().Customers;

        dispatch(customersParams(params));
        dispatch(customersLoading(true));

        requests.Customer.get({ params: { ...tableParams, ...params } })
            .then(resp => {
                dispatch(customersSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }))
            })
            .catch(error => {
                dispatch(customersFailure(error))
            })
    }
};

const customersSuccess = ({ data, meta, links }) => {
    return {
        type: ActionTypes.CUSTOMERS_SUCCESS,
        data: data,
        meta: meta,
        links: links
    }
};

const customersFailure = (error) => ({
    type: ActionTypes.CUSTOMERS_FAILURE,
    error
});

const customersLoading = isLoading => ({
    type: ActionTypes.CUSTOMERS_LOADING,
    isLoading
});

const customersParams = (params) => ({
    type: ActionTypes.CUSTOMERS_PARAMS,
    params
});

export const customersReset = () => ({
    type: ActionTypes.CUSTOMERS_RESET
});


