import {
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_PENDING,
    FETCH_CITIES_ERROR
} from "./actionTypes";

const initialState = {
    loading: false,
    data: [],
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITIES_PENDING: {
            return {
                ...state,
                loading: true
            };
        }
        case FETCH_CITIES_SUCCESS: {
            return {
                ...state,
                data: action.data,
                loading: false
            };
        }
        case FETCH_CITIES_ERROR: {
            return {
                ...state,
                error: action.error
            };
        }
        default: {
            return { ...state };
        }
    }
};
