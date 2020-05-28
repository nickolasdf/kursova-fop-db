import React from 'react';
import './style.scss';

/**
 * Component for switching user invite form
 */
const FormSwitcher = ({ currentType, typeHandler }) => {

    const applyActive = type => {
        if (type === currentType) {
            return 'form-switch__active';
        } else {
            return null;
        }
    };

    const changeForm = type => {
        typeHandler(type);
    };

    return (
        <div className="form-switch">
            <div
                className={`form-switch__section ${applyActive('crm')}`}
                onClick={() => changeForm('crm')}
            >
                Через CRM
            </div>
            <div
                className={`form-switch__section ${applyActive('email')}`}
                onClick={() => changeForm('email')}
            >
                Через EMAIL
            </div>
        </div>
    );
};

export default FormSwitcher;
