import React from "react";
import { connect } from "react-redux";
import "./ShortUserInfo.scss";

const ShortUserInfo = ({ user }) => {
    return (
        <div className="short_user_info_wrapper">
            <span><img className="user_image" alt="user_image" src={user.image}/></span>
            <span className="user_name">{user.name}</span>
        </div>
    )
};

const mapStateToProps = ({ Auth }) => ({
    user: Auth.user
});

export default connect(mapStateToProps)(ShortUserInfo);
