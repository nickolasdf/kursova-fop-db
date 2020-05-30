import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/Auth/actions";
import "./style.scss";

const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated)

    const logOutUser = () => {
        dispatch(logOut());
    };

    return (
        <header className="header">
            <div>
                <h1>База даних ФОПа</h1>
            </div>
            {
                isAuthenticated &&
                <div>
                    <Button variant="outlined" color="primary" onClick={logOutUser}>Вийти</Button>
                </div>
            }
        </header>
    )
};

export default Header;
