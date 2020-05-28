import React from "react";
import "./style.scss";

const AdditionalInfoFields = ({ label = "" }) => {
    return (
        <div className="white-container__additional-info__social-links">
            <label>{label}</label>
            <div className="white-container__additional-info__input">
                <span>sdfdgg</span>
                <span>sdfdgg</span>
            </div>
            <div className="white-container__additional-info__input">
                <div>sdfdgg</div>
            </div>
            <div className="white-container__additional-info__input">
                <div>sdfdgg</div>
            </div>
            <input
                type="text"
                className="white-container__additional-info__input white-container__additional-info__add-input"
                placeholder="Додати (⌘+ENTER)"
            />
        </div>
    );
};

export default AdditionalInfoFields;
