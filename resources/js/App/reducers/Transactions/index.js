import * as ActionTypes from './actionTypes';

const initialState = {
    currentTransactions: {
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
    },
    notCurrentTransactions: {
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
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

        // Current transactions

        case ActionTypes.CURRENT_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                currentTransactions: {
                    ...state.currentTransactions,
                    data: action.data,
                    meta: action.meta,
                    links: action.links,
                    isLoading: false
                }
            };
        case ActionTypes.CURRENT_TRANSACTIONS_FAILURE:
            return {
                ...state,
                currentTransactions: {
                    ...state.currentTransactions,
                    error: action.error,
                    isLoading: false
                }
            };
        case ActionTypes.CURRENT_TRANSACTIONS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case ActionTypes.RESET_CURRENT_TRANSACTIONS:
            return {
                ...state,
                currentTransactions: initialState.currentTransactions
            };
        case ActionTypes.SET_CURRENT_TRANSACTIONS_TABLE_CONFIG:
            return {
                ...state,
                currentTransactions: {
                    ...state.currentTransactions,
                    tableParams: {
                        ...state.currentTransactions.tableParams,
                        ...action.config
                    }
                }
            };

        // Not current transactions

        case ActionTypes.NOT_CURRENT_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                notCurrentTransactions: {
                    ...state.notCurrentTransactions,
                    data: action.data,
                    meta: action.meta,
                    links: action.links,
                    isLoading: false
                }
            };
        case ActionTypes.NOT_CURRENT_TRANSACTIONS_FAILURE:
            return {
                ...state,
                notCurrentTransactions: {
                    ...state.notCurrentTransactions,
                    error: action.error,
                    isLoading: false
                }
            };
        case ActionTypes.NOT_CURRENT_TRANSACTIONS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case ActionTypes.RESET_NOT_CURRENT_TRANSACTIONS:
            return {
                ...state,
                notCurrentTransactions: initialState.notCurrentTransactions
            };
        case ActionTypes.SET_NOT_CURRENT_TRANSACTIONS_TABLE_CONFIG:
            return {
                ...state,
                notCurrentTransactions: {
                    ...state.notCurrentTransactions,
                    tableParams: {
                        ...state.notCurrentTransactions.tableParams,
                        ...action.params
                    }
                }
            };

        default:
            return {
                ...state
            };
    }
};
