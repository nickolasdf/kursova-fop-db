import {
    FETCH_CANDIDATE_INFO_SUCCESS,
    FETCH_CANDIDATE_INFO_PENDING,
    FETCH_CANDIDATE_INFO_ERROR,
    PATCH_CANDIDATE_INFO_SUCCESS,
    PATCH_CANDIDATE_INFO_PENDING,
    PATCH_CANDIDATE_INFO_ERROR,
    SAVE_CANDIDATE_INFO,
} from "./actionTypes";

import { SUCCESS } from "../../config/alertVariants";
import {throwAlert} from "../App/actions";

import axios from "axios";
import store from '../../store';

export const fetchCandidateInfo = (id) => dispatch => {

    dispatch({
        type: FETCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .get(`/api/candidate/${id}`)
        .then(res => {
            dispatch({type: FETCH_CANDIDATE_INFO_SUCCESS, payload: res.data});
            // console.log("user", res.data);
        })
        .catch(error => {
            dispatch({
                type: FETCH_CANDIDATE_INFO_ERROR,
                error: error.response,
                payload: id
            });
            // console.log(error.response);
        });
};

export const saveCandidateInfo = (data) => dispatch => {

    dispatch({
        type: SAVE_CANDIDATE_INFO,
        payload: data
    });
};

export const editProfileCandidateInfo = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .put(`/api/candidate/${data.id}`,{
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            email: data.email,
            phone: data.phone,
            sex: data.sex,
            marital_status_id: data.marital_status,
            city_id: data.city,
            city_transfer_id: data.city_transfer,
            education_id: data.education,
            education_profile_id: data.education_profile,
            birthday: data.birthday,
            career_objective: data.career_objective,
            desired_salary: data.desired_salary,
            currency_id: data.currency,
            experience_id: data.experience,
            type_of_employment_id: data.type_of_employment,
            current_work: data.current_work,
            current_position: data.current_position,
            other_skills: data.other_skills,
            description: data.description,
        })
        .then(res => {

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            dispatch(throwAlert(SUCCESS, "Изменения сохранены"));

            console.log("edit user", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

//Social network


export const UpdateSocialNetwork = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .patch(`/api/candidate/${data.id}`,{
            social_network: data.social_network,
        })
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.user.social_network = data.social_network;

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("add", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};


//Language CRUD

export const addCandidateLanguage = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .patch(`/api/candidate/${data.id}/language`,{
            language_id: data.language_id,
            language_level_id: data.language_level_id,
        })
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.languages.push(res.data.data);

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("add", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const editCandidateLanguage = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .patch(`/api/candidate/language/${data.id}`,{
            language_id: data.language_id,
            language_level_id: data.language_level_id,
        })
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.languages[data.key].level = data.item.label;
            CandidateInfo.languages[data.key].language_level_id = data.item.value;

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("edit", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const deleteCandidateLanguage = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .delete(`/api/candidate/language/${data.id}`)
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.languages.splice(data.key, 1);

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("delete", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};


//Skill CRUD

export const addCandidateSkill = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .patch(`/api/candidate/${data.id}/skill`,{
            skill_id: data.skill_id,
            skill_level_id: data.skill_level_id,
        })
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.skills.push(res.data.data);

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("add", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const editCandidateSkill = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .patch(`/api/candidate/skill/${data.id}`,{
            skill_id: data.skill_id,
            skill_level_id: data.skill_level_id,
        })
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.skills[data.key].level = data.item.label;
            CandidateInfo.skills[data.key].skill_level_id = data.item.value;

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("edit", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const deleteCandidateSkill = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .delete(`/api/candidate/skill/${data.id}`)
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.skills.splice(data.key, 1);

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("delete", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};

//Upload image

export const uploadCandidateImage = (data) => dispatch => {

    const state = store.getState();

    dispatch({
        type: PATCH_CANDIDATE_INFO_PENDING,
    });

    axios
        .patch(`/api/candidate/${data.id}/image`,{
            image: data.image,
        })
        .then(res => {

            let CandidateInfo = Object.assign({}, state.CandidateEdit.candidateInfo);
            CandidateInfo.user.image = res.data.data.image;

            dispatch({
                type: SAVE_CANDIDATE_INFO,
                payload: CandidateInfo
            });

            dispatch({
                type: PATCH_CANDIDATE_INFO_SUCCESS,
            });

            console.log("add", res.data.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_INFO_ERROR,
                error: error
            });
            console.log(error);
        });
};
