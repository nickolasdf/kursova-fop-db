import {
    FETCH_CURRENCIES_PENDING,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR
} from "./actionTypes";
import requests from "../../requests";

export const fetchCurrencies = () => dispatch => {
    dispatch({ type: FETCH_CURRENCIES_PENDING });

    requests.Enum.get({ types: ["currency"] })
        .then(res => {
            dispatch({
                type: FETCH_CURRENCIES_SUCCESS,
                data: res.data.data.currency
            });
        })
        .catch(error => {
            dispatch({ type: FETCH_CURRENCIES_ERROR, error: error.message });
        });
};
