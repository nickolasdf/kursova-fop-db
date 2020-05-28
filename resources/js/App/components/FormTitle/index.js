import React from "react";
import "./style.scss";

const FormTitle = ({ children, size, ...rest }) => (
    <h1 className="form_title" style={{ fontSize: size }} { ...rest }>
        {
            children
        }
    </h1>
);

export default FormTitle;
