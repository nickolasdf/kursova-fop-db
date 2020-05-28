import {
    DASHBOARD_SUCCESS,
    DASHBOARD_FAILURE,
    DASHBOARD_LOADING,
} from "./actionTypes";


const initialState = {
    loading: false,
    data: [],
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: ""
            };
        case DASHBOARD_LOADING: {
            return {
                ...state,
                loading: action.isLoading
            };
        }
        case DASHBOARD_FAILURE: {
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
