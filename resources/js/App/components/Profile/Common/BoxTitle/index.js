import React from "react";
import "./style.scss";

const BoxTitle = props => {
    return (
        <div
            className={`box-title__container ${props.styleName}`}
        >
            {props.title}
        </div>
    );
};

export default BoxTitle;
