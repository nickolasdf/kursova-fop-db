import * as ActionTypes from "./actionTypes";

const initialState = {
    data: [],
    tableParams: {
        order_field: "name",
        order_type: "ASC",
        per_page: 20,
        page: 1
    },
    meta: "",
    links: "",
    error: "",
    isLoading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.USERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                meta: action.meta,
                links: action.links,
                isLoading: false
            };
        case ActionTypes.USERS_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case ActionTypes.USERS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case ActionTypes.USERS_PARAMS:
            return {
                ...state,
                tableParams: {
                    ...state.tableParams,
                    ...action.params
                }
            };
        case ActionTypes.USERS_RESET:
            return initialState;
        default:
            return state;
    }
}
