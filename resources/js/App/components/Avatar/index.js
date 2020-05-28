import React from "react";
import "./style.scss";

const Avatar = ({
    src = "http://womenpla.net/wp-content/uploads/2016/08/Women-Lies.jpg"
}) => (
    <div className="avatar-container">
        <img src={src} className="avatar-container__avatar" />
    </div>
);

export default Avatar;
