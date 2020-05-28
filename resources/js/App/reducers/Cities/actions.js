import {
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_PENDING,
    FETCH_CITIES_ERROR
} from "./actionTypes";
import requests from "../../requests";

export const fetchCities = () => dispatch => {
    dispatch({ type: FETCH_CITIES_PENDING });

    requests.Cities.getAll()
        .then(resp => {
            dispatch({ type: FETCH_CITIES_SUCCESS, data: resp.data });
        })
        .catch(error => {
            dispatch({ type: FETCH_CITIES_ERROR, error: error.message });
        });
};
