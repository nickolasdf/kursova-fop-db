import React from "react";
import requests from "../../requests";
import { connect } from "react-redux";
import { logOut } from "../../reducers/Auth/actions";
import "./style.scss";

const LogOutButton = props => {
    const onClickHandler = () => {
        requests.Auth.logout()
            .then(resp => {
                props.logOut();
            })
            .catch(error => {
                alert("Token not valid!");
            });
    };

    return (
        <div className="logout_btn" onClick={onClickHandler}>
            LogOut
        </div>
    );
};

const mapDispatchToProps = {
    logOut
};

export default connect(
    null,
    mapDispatchToProps
)(LogOutButton);
