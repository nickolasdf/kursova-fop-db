import React from "react";
import clsx from "clsx";
import "./style.scss";

const Button = ({ className, ...rest }) => (
    <button className={clsx("btn", className)} {...rest}>
        {rest.icon && <div className="btn__icon">{rest.icon}</div>}
        {rest.title}
    </button>
);

export default Button;
