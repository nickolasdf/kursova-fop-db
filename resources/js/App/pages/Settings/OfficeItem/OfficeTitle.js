import React, { useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './OfficeTitle.scss';
import requests from '../../../requests';
import { useDispatch } from 'react-redux';
import { throwAlert } from '../../../reducers/App/actions';
import { SUCCESS } from '../../../config/alertVariants';

const OfficeTitle = ({ value, id, onSubmit }) => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleChange = event => {
        setTitle(event.target.value);
    };

    const toggleEdit = () => {
        setEdit(!edit);
    };

    const submitForm = event => {
        event.preventDefault();

        if (title !== value) {
            requests.Office.updateFields(id, { name: title })
                .then(() => {
                    setEdit(false);
                    setTitle('');
                    dispatch(throwAlert(SUCCESS, 'Название офиса обновлено'));
                })
                .then(() => {
                    if (onSubmit && typeof onSubmit === 'function') {
                        onSubmit();
                    }
                });
        }
    };

    return (
        <div className="office-title">
            <div className="office-title__mg">
                <span>Офис</span>
            </div>
            {
                edit ?
                    <form onSubmit={submitForm} className="office-title__form">
                        <span className="office-title__mg">
                            <TextField
                                autoFocus={true}
                                defaultValue={value}
                                onChange={handleChange}
                            />
                        </span>
                        <IconButton type="submit">
                            <CheckIcon fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={toggleEdit}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </form> :
                    <div className="office-title__name-wrapper">
                        <div className="office-title__mg"><span>{value}</span></div>
                        <IconButton onClick={toggleEdit}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </div>

            }
        </div>
    );
};

export default OfficeTitle;
