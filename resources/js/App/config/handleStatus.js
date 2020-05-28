import { store } from "../store";
import { logOut } from "../reducers/Auth/actions";
import { throwAlert } from "../reducers/App/actions";
import { ERROR } from "./alertVariants";

export const handleStatus = (status) => {
    if(status === 401) {
        store.dispatch(throwAlert(ERROR, "Не авторизований користувач"));
        store.dispatch(logOut())
    }
    if(status === 500) {
        store.dispatch(throwAlert(ERROR, "Помилка сервера"));
    }
    if(status === 404) {
        store.dispatch(throwAlert(ERROR, "По даному запиту нічого не знайдено"));
    }
    if(status === 422) {
        store.dispatch(throwAlert(ERROR, "Не коректні дані"));
    }
};
