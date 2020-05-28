import requests from "../../requests";
import {
    ACCOUNT_ITEMS_FAILURE,
    ACCOUNT_ITEMS_LOADING,
    ACCOUNT_ITEMS_PARAMS, ACCOUNT_ITEMS_RESET,
    ACCOUNT_ITEMS_SUCCESS
} from "./actionsTypes";

export const getAccountItems = (params = {}) => {
    return (dispatch, getState) => {
        const { tableParams } = getState().AccountItems;

        dispatch(accountItemsParams(params));
        dispatch(accountItemsLoading(true));

        requests.AccountItem.get({ params: { ...tableParams, ...params } })
            .then(resp => {
                dispatch(accountItemsSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }))
            })
            .catch(error => {
                dispatch(accountItemsFailure(error))
            })
    }
};

const accountItemsSuccess = ({ data, meta, links }) => ({
    type: ACCOUNT_ITEMS_SUCCESS,
    data,
    meta,
    links
});

const accountItemsFailure = (error) => ({
    type: ACCOUNT_ITEMS_FAILURE,
    error
});

const accountItemsLoading = isLoading => ({
    type: ACCOUNT_ITEMS_LOADING,
    isLoading
});

const accountItemsParams = (params) => ({
    type: ACCOUNT_ITEMS_PARAMS,
    params
});

const accountItemsReset = () => ({
    type: ACCOUNT_ITEMS_RESET
});
