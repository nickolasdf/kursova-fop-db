import * as ActionTypes from './actionTypes';

const initialState = {
    data: [],
    tableParams: {
        order_field: 'name',
        order_type: 'ASC',
        per_page: 20,
        page: 1
    },
    meta: '',
    links: '',
    error: '',
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FOPS_SUCCESS:
            return {
                ...state,
                data: action.data,
                meta: action.meta,
                links: action.links,
                isLoading: false
            };
        case ActionTypes.FOPS_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case ActionTypes.FOPS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case ActionTypes.FOPS_RESET:
            return initialState;
        default:
            return state;
    }
};
