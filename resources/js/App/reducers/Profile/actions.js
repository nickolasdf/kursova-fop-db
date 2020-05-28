import {
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_PENDING,
    FETCH_USER_INFO_ERROR,
    PATCH_USER_INFO_SUCCESS,
    PATCH_USER_INFO_PENDING,
    PATCH_USER_INFO_ERROR,
    SAVE_USER_INFO,
    SET_USER_COMMENTS,
    ADD_USER_LANGUAGE,
    EDIT_USER_LANGUAGE,
    DELETE_USER_LANGUAGE,
} from "./actionTypes";

import axios from "axios";
import store from '../../store';

export const fetchUserInfo = () => dispatch => {

    const state = store.getState();
    const user = state.Auth.user;

    dispatch({
        type: FETCH_USER_INFO_PENDING,
    });

    axios
        .get(`/api/user/${user.id}`)
        .then(res => {
            dispatch({type: FETCH_USER_INFO_SUCCESS, payload: res.data});
            // console.log("user", res.data);
        })
        .catch(error => {
            dispatch({
                type: FETCH_USER_INFO_ERROR,
                error: error
            });
            // console.log(error);
        });
};

export const setUserComments = data => dispatch => {
    dispatch({
        type: SET_USER_COMMENTS,
        data
    });
};
export const saveUserInfo = (data) => dispatch => {

    dispatch({
        type: SAVE_USER_INFO,
        payload: data
    });
};

export const editProfileUserInfo = (data) => dispatch => {

    const state = store.getState();
    const user = state.Auth.user;

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .put(`/api/user/${user.id}`,{
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password,
            phone: data.phone,
            sex: data.sex,
            start_work: data.start_work,
            birthday: data.birthday,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.user.firstName = data.firstName;
            userInfo.user.lastName = data.lastName;
            userInfo.user.password = data.password;
            userInfo.user.phone = data.phone;
            userInfo.user.sex = data.sex;
            userInfo.user.start_work = data.start_work;
            userInfo.user.birthday = data.birthday;

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("edit user", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

//Social network


export const UpdateSocialNetwork = (data) => dispatch => {

    const state = store.getState();
    const user = state.Auth.user;

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .patch(`/api/user/${user.id}`,{
            social_network: data.social_network,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.user.social_network = data.social_network;

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
        });
};


//Language CRUD

export const addUserLanguage = (data) => dispatch => {

    const state = store.getState();
    const user = state.Auth.user;

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .patch(`/api/user/${user.id}/language`,{
            language_id: data.language_id,
            language_level_id: data.language_level_id,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.languages.push(res.data.data);

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("add", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const editUserLanguage = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .patch(`/api/user/language/${data.id}`,{
            language_id: data.language_id,
            language_level_id: data.language_level_id,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.languages[data.key].level = data.item.label;
            userInfo.languages[data.key].language_level_id = data.item.value;

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("edit", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const deleteUserLanguage = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .delete(`/api/user/language/${data.id}`)
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.languages.splice(data.key, 1);

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("delete", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};


//Skill CRUD

export const addUserSkill = (data) => dispatch => {

    const state = store.getState();
    const user = state.Auth.user;

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .patch(`/api/user/${user.id}/skill`,{
            skill_id: data.skill_id,
            skill_level_id: data.skill_level_id,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.skills.push(res.data.data);

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("add", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const editUserSkill = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .patch(`/api/user/skill/${data.id}`,{
            skill_id: data.skill_id,
            skill_level_id: data.skill_level_id,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.skills[data.key].level = data.item.label;
            userInfo.skills[data.key].skill_level_id = data.item.value;

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("edit", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const deleteUserSkill = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .delete(`/api/user/skill/${data.id}`)
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.skills.splice(data.key, 1);

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("delete", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

//Upload image

export const uploadUserImage = (data) => dispatch => {

    const state = store.getState();
    const user = state.Auth.user;

    dispatch({
        type: PATCH_USER_INFO_PENDING,
    });

    axios
        .patch(`/api/user/${user.id}/image`,{
            image: data.image,
        })
        .then(res => {

            let userInfo = Object.assign({}, state.Profile.userInfo);
            userInfo.user.image = res.data.data.image;

            dispatch({
                type: SAVE_USER_INFO,
                payload: userInfo
            });

            dispatch({
                type: PATCH_USER_INFO_SUCCESS,
            });

            console.log("add", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_USER_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};
