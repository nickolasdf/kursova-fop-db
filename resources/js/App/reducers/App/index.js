import { CLOSE_ALERT, RESET_DATE_CONFIG, SET_DATE_CONFIG, THROW_ALERT } from './actionTypes';
import moment from 'moment';

const initialState = {
    alert: {
        type: '',
        open: false,
        message: ''
    },
    dateConfig: {
        dateFrom: moment().startOf('month').format(),
        dateTo: moment().endOf('month').format(),
        formatBy: 'month'
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case THROW_ALERT:
            return {
                ...state,
                alert: {
                    type: action.alertType,
                    message: action.message,
                    open: true
                }
            };
        case CLOSE_ALERT:
            return {
                ...state,
                alert: initialState.alert
            };
        case SET_DATE_CONFIG:
            return {
                ...state,
                dateConfig: {
                    ...state.dateConfig,
                    ...action.config
                }
            };
        case RESET_DATE_CONFIG:
            return {
                ...state,
                dateConfig: initialState.dateConfig
            };
        default:
            return state;
    }
}
