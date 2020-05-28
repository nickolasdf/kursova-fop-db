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

const initialState = {
    candidatesList: {},
    pending: true,
    successDeleteCandidateId: null,
    addCandidateSuccess: false,
    addCandidatePending: false,
    error: null,
};


export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_CANDIDATES_SUCCESS: {
            return {
                ...state,
                pending: false,
                candidatesList: action.payload,
            };
        }

        case FETCH_CANDIDATES_PENDING:
            return {
                ...state,
                pending: true,
            };

        case FETCH_CANDIDATES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        case ADD_CANDIDATE_SUCCESS: {
            return {
                ...state,
                pending: false,
                addCandidateSuccess: true,
                addCandidatePending: false,
            };
        }

        case ADD_CANDIDATE_PENDING:
            return {
                ...state,
                pending: true,
                addCandidatePending: false,
            };

        case ADD_CANDIDATE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                addCandidatePending: false
            };

        case PATCH_CANDIDATE_SUCCESS: {
            return {
                ...state,
                pending: false,
            };
        }

        case PATCH_CANDIDATE_PENDING:
            return {
                ...state,
                pending: true
            };

        case PATCH_CANDIDATE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        case DELETE_CANDIDATE_SUCCESS: {
            return {
                ...state,
                pending: false,
                successDeleteCandidateId: action.payload,
            };
        }

        case DELETE_CANDIDATE_PENDING:
            return {
                ...state,
                pending: true,
                successDeleteCandidateId: null,
            };

        case DELETE_CANDIDATE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        default:
            return { ...state };
    }
};
