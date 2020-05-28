import {
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_PENDING,
    FETCH_PROJECTS_ERROR,

    ADD_PROJECTS_SUCCESS,
    ADD_PROJECTS_PENDING,
    ADD_PROJECTS_ERROR,

    PATCH_PROJECTS_SUCCESS,
    PATCH_PROJECTS_PENDING,
    PATCH_PROJECTS_ERROR,

    DELETE_PROJECTS_SUCCESS,
    DELETE_PROJECTS_PENDING,
    DELETE_PROJECTS_ERROR,


} from "./actionTypes";

import axios from "axios";

export const fetchProjectsList = (params) => dispatch => {

    dispatch({
        type: FETCH_PROJECTS_PENDING,
    });

    axios
        .get(`/api/project`,{
            params: {
                order_field: params.orderBy,
                order_type: params.order,
                page: params.page,
                per_page: params.per_page,
            },
        })
        .then(res => {
            dispatch({type: FETCH_PROJECTS_SUCCESS, payload: res.data});
        })
        .catch(error => {
            dispatch({
                type: FETCH_PROJECTS_ERROR,
                error: error
            });
        });
};

export const addProject = (data) => dispatch => {

    dispatch({
        type: ADD_PROJECTS_PENDING,
    });

    axios
        .post(`/api/project`,{
            title: data.title,
            customer_ids: data.customer_ids,
            user_ids: data.user_ids
        })
        .then(res => {
            dispatch({
                type: ADD_PROJECTS_SUCCESS,
                project: res.data.data
            });
        })
        .catch(error => {
            dispatch({
                type: ADD_PROJECTS_ERROR,
                error: error
            });
        });
};

export const editProject = (data) => dispatch => {
    dispatch({
        type: PATCH_PROJECTS_PENDING,
    });

     axios
        .put(`/api/project/${data.id}`,{
            title: data.title,
            customer_ids: data.customer_ids,
            user_ids: data.user_ids,
        })
        .then(res => {
            dispatch({
                type: PATCH_PROJECTS_SUCCESS,
            });
        })
        .catch(error => {
            dispatch({
                type: PATCH_PROJECTS_ERROR,
                error: error
            });
        });
};

export const deleteProject = (data) => dispatch => {
    dispatch({
        type: DELETE_PROJECTS_PENDING,
    });

    axios
        .delete(`/api/project/${data.id}`,{
            title: data.title,
        })
        .then(res => {

            let event = new Event("projectDeleted");
            document.dispatchEvent(event);

            dispatch({
                type: DELETE_PROJECTS_SUCCESS,
            });
        })
        .catch(error => {
            dispatch({
                type: DELETE_PROJECTS_ERROR,
                error: error
            });
        });
};

