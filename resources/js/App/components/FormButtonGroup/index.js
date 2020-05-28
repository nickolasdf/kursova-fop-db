import React from "react";
import "./style.scss";

const FormButtonGroup = ({ onClose, ...rest }) => (
    <div className="form_button_group" { ...rest }>
        <button type="submit" className="action_btn">СОХРАНИТЬ</button>
        <button type="button" className="action_btn" onClick={onClose}>ОТМЕНИТЬ</button>
    </div>
);

export default FormButtonGroup;
