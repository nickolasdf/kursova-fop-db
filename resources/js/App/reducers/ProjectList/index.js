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

const initialState = {
    projectsList: [],
    pending: true,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_SUCCESS: {
            return {
                ...state,
                pending: false,
                projectsList: action.payload,
            };
        }

        case FETCH_PROJECTS_PENDING:
            return {
                ...state,
                pending: true
            };

        case FETCH_PROJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        case ADD_PROJECTS_SUCCESS: {
            let newData = [action.project].concat(state.projectsList.data);
            const { per_page } = state.projectsList.meta;
            if(newData.length > per_page) {
                newData.pop();
            }
            return {
                ...state,
                pending: false,
                projectsList: {
                    ...state.projectsList,
                    data: newData
                }
            };
        }

        case ADD_PROJECTS_PENDING:
            return {
                ...state,
                pending: true
            };

        case ADD_PROJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        case PATCH_PROJECTS_SUCCESS: {
            return {
                ...state,
                pending: false,
            };
        }

        case PATCH_PROJECTS_PENDING:
            return {
                ...state,
                pending: true
            };

        case PATCH_PROJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        case DELETE_PROJECTS_SUCCESS: {
            return {
                ...state,
                pending: false,
            };
        }

        case DELETE_PROJECTS_PENDING:
            return {
                ...state,
                pending: true
            };

        case DELETE_PROJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };

        default:
            return { ...state };
    }
};
