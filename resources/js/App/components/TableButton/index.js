import React from "react";
import "./style.scss";

const TableButton = ({ type = "accept", icon = "", title = "Title" }) => (
    <button className={`t-body__btn btn--${type}`}>
        {icon}
        <span className="t-body__btn__title">{title}</span>
    </button>
);

export default TableButton;
