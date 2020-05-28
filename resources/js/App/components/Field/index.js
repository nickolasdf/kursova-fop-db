import React from "react";
import "./style.scss";

const Field = ({ label = null, type = "text", margin = false }) => (
    <div>
        { label ||
            <label className="field-label">{label}</label>
        }
        <input type={type} className={"field-input " + (!margin ? "" : "no-margin")} />
    </div>
);

export default Field;
