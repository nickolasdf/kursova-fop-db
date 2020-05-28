import {
    FETCH_CANDIDATES_SUCCESS,
    FETCH_CANDIDATES_PENDING,
    FETCH_CANDIDATES_ERROR,

    ADD_CANDIDATE_SUCCESS,
    ADD_CANDIDATE_PENDING,
    ADD_CANDIDATE_ERROR,

    PATCH_CANDIDATE_SUCCESS,
    PATCH_CANDIDATE_PENDING,
    PATCH_CANDIDATE_ERROR,

    DELETE_CANDIDATE_SUCCESS,
    DELETE_CANDIDATE_PENDING,
    DELETE_CANDIDATE_ERROR,

} from "./actionTypes";

import axios from "axios";
import {throwAlert} from "../App/actions";
import {SUCCESS} from "../../config/alertVariants";

export const fetchCandidateList = (params) => dispatch => {

    dispatch({
        type: FETCH_CANDIDATES_PENDING,
    });

    axios
        .get(`/api/candidate`,{
            params: {
                order_field: params.orderBy,
                order_type: params.order,
                page: params.page,
                per_page: params.per_page,
            },
        })
        .then(res => {
            dispatch({type: FETCH_CANDIDATES_SUCCESS, payload: res.data});
            console.log("candidate", res.data);
        })
        .catch(error => {
            dispatch({
                type: FETCH_CANDIDATES_ERROR,
                error: error
            });
            // console.log(error);
        });
};

export const addCandidate = (data) => dispatch => {

    dispatch({
        type: ADD_CANDIDATE_PENDING,
    });

    axios
        .post(`/api/candidate`,{
            image: data.image,
            skills:  data.skills,
            languages:  data.languages,
            social_network:  data.social_network,
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

            let event = new Event("candidateAdded");
            document.dispatchEvent(event);

            dispatch({
                type: ADD_CANDIDATE_SUCCESS,
            });

            console.log("add candidate", res.data);

            dispatch(throwAlert(SUCCESS, "Кандидат создан"));
        })
        .catch(error => {
            dispatch({
                type: ADD_CANDIDATE_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const editCandidate = (data) => dispatch => {

    dispatch({
        type: PATCH_CANDIDATE_PENDING,
    });

    axios
        .put(`/api/candidate/${data.id}`,{
            title: data.title,
        })
        .then(res => {

            let event = new Event("candidateEdited");
            document.dispatchEvent(event);

            dispatch({
                type: PATCH_CANDIDATE_SUCCESS,
            });

            console.log("edit candidate", res.data);
        })
        .catch(error => {
            dispatch({
                type: PATCH_CANDIDATE_ERROR,
                error: error
            });
            console.log(error);
        });
};

export const deleteCandidate = (data) => dispatch => {

    dispatch({
        type: DELETE_CANDIDATE_PENDING,
    });

    axios
        .delete(`/api/candidate/${data.id}`,{
            title: data.title,
        })
        .then(res => {

            let event = new Event("candidateDeleted");
            document.dispatchEvent(event);

            dispatch({
                type: DELETE_CANDIDATE_SUCCESS,
                payload: data.id
            });

            dispatch(throwAlert(SUCCESS, "Кандидат удален"));

            console.log("delete candidate", res.data);
        })
        .catch(error => {
            dispatch({
                type: DELETE_CANDIDATE_ERROR,
                error: error
            });
            console.log(error);
        });
};
