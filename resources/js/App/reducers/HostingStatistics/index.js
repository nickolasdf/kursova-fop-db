import * as ActionTypes from "./actionTypes";

const initialState = {
    data: {},
    error: "",
    isLoading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.HOSTING_STATISTICS_SUCCESS:
            return {
                data: action.data,
                error: "",
                isLoading: false
            };
        case ActionTypes.HOSTING_STATISTICS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case ActionTypes.HOSTING_STATISTICS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}
