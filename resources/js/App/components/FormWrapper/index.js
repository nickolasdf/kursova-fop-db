import React from 'react';
import { Button } from '@material-ui/core';
import './index.scss';

const FormWrapper = ({ onClose, children, title }) => {
    return (
        <div className="form-wrapper">
            <h3>{title}</h3>
            <br />
            {children}
            <div className="form-wrapper__actions">
                <div className="form-wrapper__actions__item">
                    <Button variant="contained" color="primary" type="submit">Зберегти</Button>
                </div>
                <div className="form-wrapper__actions__item">
                    <Button variant="outlined" color="primary" type="button" onClick={onClose}>Відмінити</Button>
                </div>
            </div>
        </div>
    );
};
export default FormWrapper;
