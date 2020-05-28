import * as ActionTypes from "./actionTypes";

const initialState = {
    data: [],
    error: "",
    isLoading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SERVERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case ActionTypes.SERVERS_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case ActionTypes.SERVERS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}
