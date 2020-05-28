import { CLOSE_ALERT, RESET_DATE_CONFIG, SET_DATE_CONFIG, THROW_ALERT } from './actionTypes';

export const throwAlert = (alertType, message) => ({ type: THROW_ALERT, alertType, message });
export const closeAlert = () => ({ type: CLOSE_ALERT });
export const setDateConfig = config => ({ type: SET_DATE_CONFIG, config });
export const resetDateConfig = () => ({ type: RESET_DATE_CONFIG });
