import {
    FETCH_CURRENCIES_PENDING,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR
} from "./actionTypes";

const initialState = {
    loading: false,
    data: [],
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_PENDING: {
            return {
                ...state,
                loading: true
            };
        }
        case FETCH_CURRENCIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.data
            };
        }
        case FETCH_CURRENCIES_ERROR: {
            return {
                ...state,
                error: action.error
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
