import {
    FETCH_CANDIDATE_INFO_SUCCESS,
    FETCH_CANDIDATE_INFO_PENDING,
    FETCH_CANDIDATE_INFO_ERROR,
    PATCH_CANDIDATE_INFO_SUCCESS,
    PATCH_CANDIDATE_INFO_PENDING,
    PATCH_CANDIDATE_INFO_ERROR,
    SAVE_CANDIDATE_INFO
} from "./actionTypes";

const initialState = {
    candidateInfo: {},
    pending: true,
    errorFetchCandidateId: null,
    patchCandidatePending: false,
    error: null,
};


export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_CANDIDATE_INFO_SUCCESS: {
            return {
                ...state,
                pending: false,
                candidateInfo: action.payload,
                errorFetchCandidateId: null,
            };
        }

        case FETCH_CANDIDATE_INFO_PENDING:
            return {
                ...state,
                pending: true,
                errorFetchCandidateId: null,
            };

        case FETCH_CANDIDATE_INFO_ERROR:
            return {
                ...state,
                pending: false,
                errorFetchCandidateId: action.payload,
                error: action.error
            };

        case SAVE_CANDIDATE_INFO:
            return {
                ...state,
                candidateInfo: {...action.payload}
            };

        case PATCH_CANDIDATE_INFO_PENDING:
            return {
                ...state,
                patchCandidatePending: true
            };

        case PATCH_CANDIDATE_INFO_SUCCESS:
            return {
                ...state,
                patchCandidatePending: false
            };

        case PATCH_CANDIDATE_INFO_ERROR:
            return {
                ...state,
                patchCandidatePending: false,
                error: action.error
            };

        default:
            return { ...state };
    }
};
