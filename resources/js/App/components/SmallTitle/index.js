import React from "react";
import "./style.scss";

const SmallTitle = ({ title = "title" }) => (
    <h3 className="small-title">{title}</h3>
);

export default SmallTitle;
