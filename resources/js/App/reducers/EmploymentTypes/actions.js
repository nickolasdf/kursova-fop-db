import {
    FETCH_EMPLOYMENT_TYPES_PENDING,
    FETCH_EMPLOYMENT_TYPES_SUCCESS,
    FETCH_EMPLOYMENT_TYPES_ERROR
} from "./actionTypes";
import requests from "../../requests";

export const fetchEmploymentTypes = () => dispatch => {
    dispatch({ type: FETCH_EMPLOYMENT_TYPES_PENDING });

    requests.Enum.get({ types: ["type_of_employment"] })
        .then(res => {
            dispatch({
                type: FETCH_EMPLOYMENT_TYPES_SUCCESS,
                data: res.data.data.type_of_employment
            });
        })
        .catch(error => {
            dispatch({
                type: FETCH_EMPLOYMENT_TYPES_ERROR,
                error: error.message
            });
        });
};
