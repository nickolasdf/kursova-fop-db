import {
    FETCH_EMPLOYMENT_TYPES_PENDING,
    FETCH_EMPLOYMENT_TYPES_SUCCESS,
    FETCH_EMPLOYMENT_TYPES_ERROR
} from "./actionTypes";

const initialState = {
    loading: false,
    data: [],
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYMENT_TYPES_PENDING: {
            return {
                ...state,
                loading: true
            };
        }
        case FETCH_EMPLOYMENT_TYPES_SUCCESS: {
            return {
                ...state,
                data: action.data,
                loading: false
            };
        }
        case FETCH_EMPLOYMENT_TYPES_ERROR: {
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
