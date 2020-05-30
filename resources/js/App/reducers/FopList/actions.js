import requests from '../../requests';
import * as ActionTypes from './actionTypes';

export const getFops = (params = {}) => {
    return dispatch => {
        dispatch(fopsLoading(true));

        requests.Fop.getAll()
            .then(resp => {
                dispatch(fopsSuccess({
                    data: resp.data.data,
                    meta: resp.data.meta,
                    links: resp.data.links
                }));
            })
            .catch(error => {
                dispatch(fopsFailure(error));
            });
    };
};

const fopsSuccess = ({ data, meta, links }) => {
    return {
        type: ActionTypes.FOPS_SUCCESS,
        data: data,
        meta: meta,
        links: links
    };
};

const fopsFailure = (error) => ({
    type: ActionTypes.FOPS_FAILURE,
    error
});

const fopsLoading = isLoading => ({
    type: ActionTypes.FOPS_LOADING,
    isLoading
});

export const fopsReset = () => ({
    type: ActionTypes.FOPS_RESET
});


