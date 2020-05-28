import React from "react";
import ArrowDown from "../ArrowDown";
import "./style.scss";

const SelectField = ({ label = "", data = ["option1", "option2"] }) => (
    <div>
        <label className="select-label">{label}</label>
        <div className="select-container">
            <select className="select-container__select">
                {data.map(option => (
                    <option key={option}>{option}</option>
                ))}
            </select>
            <div className="select-container__icon-container">
                <ArrowDown color="#e0e0e0" />
            </div>
        </div>
    </div>
);

export default SelectField;
