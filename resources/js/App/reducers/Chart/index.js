import { CHART_LOADING, CHART_FAILURE, CHART_SUCCESS } from "./actionTypes";

const initialState = {
    loading: true,
    data: [],
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHART_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: ""
            };
        case CHART_LOADING: {
            return {
                ...state,
                loading: action.isLoading
            };
        }
        case CHART_FAILURE: {
            return {
                ...state,
                error: action.error
            };
        }
        default:
            return {
                ...state
            };
    }
};
