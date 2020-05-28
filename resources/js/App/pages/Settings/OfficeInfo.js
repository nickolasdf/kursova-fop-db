import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import './OfficeInfo.scss';
import FormActionGroup from '../../components/FormActionGroup';
import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    actions: {
        padding: '16px',
        borderBottom: '1px solid #efefef'
    }
});

const OfficeInfo = ({ office, isEdit, cancelEdit, onSubmit }) => {
    const [form, setForm] = useState({
        phone: '',
        email: '',
        site: '',
        index: '',
        city: '',
        address: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        setForm({
            phone: office.phone ? office.phone : '',
            email: office.email ? office.email : '',
            site: office.site ? office.site : '',
            index: office.index ? office.index : '',
            city: office.city ? office.city : '',
            address: office.address ? office.address : ''
        });
    }, [office]);

    const handleChange = field => event => {
        setForm({
            ...form,
            [field]: event.target.value
        });
    };

    const renderInput = (value, field) => {
        if (isEdit) {
            return (
                <TextField fullWidth={true} value={value} onChange={handleChange(field)}/>
            );
        } else {
            return (
                <span>{value}</span>
            );
        }
    };

    const submitForm = event => {
        event.preventDefault();
        setSubmitting(true);
        requests.Office.updateFields(office.id, form).then(() => {
            setSubmitting(false);
            cancelEdit();
            dispatch(throwAlert(SUCCESS, 'Офис обновлен'));
            onSubmit();
        }).catch(() => setSubmitting(false));
    };

    return (
        <form className="edit-office-form" onSubmit={submitForm}>
            <div className="office_info_block">
                <Grid container>
                    <Grid item xs={6}>
                        <div className="office_info_item_wrapper">
                            <Grid container alignItems="flex-end">
                                <Grid item xs={4}><span className="office_info_item_name">Телефон</span></Grid>
                                <Grid item xs={8}>{renderInput(form.phone, 'phone')}</Grid>
                            </Grid>
                        </div>
                        <div className="office_info_item_wrapper">
                            <Grid container alignItems="flex-end">
                                <Grid item xs={4}><span className="office_info_item_name">Почта</span></Grid>
                                <Grid item xs={8}>{renderInput(form.email, 'email')}</Grid>
                            </Grid>
                        </div>
                        <div className="office_info_item_wrapper">
                            <Grid container alignItems="flex-end">
                                <Grid item xs={4}><span className="office_info_item_name">Сайт</span></Grid>
                                <Grid item xs={8}>{renderInput(form.site, 'site')}</Grid>
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className="office_info_item_wrapper">
                            <Grid container alignItems="flex-end">
                                <Grid item xs={4}><span className="office_info_item_name">Индекс</span></Grid>
                                <Grid item xs={8}>{renderInput(form.index, 'index')}</Grid>
                            </Grid>
                        </div>
                        <div className="office_info_item_wrapper">
                            <Grid container alignItems="flex-end">
                                <Grid item xs={4}><span className="office_info_item_name">Город</span></Grid>
                                <Grid item xs={8}>{renderInput(form.city, 'city')}</Grid>
                            </Grid>
                        </div>
                        <div className="office_info_item_wrapper">
                            <Grid container alignItems="flex-end">
                                <Grid item xs={4}><span className="office_info_item_name">Адрес</span></Grid>
                                <Grid item xs={8}>{renderInput(form.address, 'address')}</Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {
                isEdit &&
                <div>
                    <FormActionGroup
                        onClose={cancelEdit}
                        className={classes.actions}
                        isSubmitting={submitting}
                    />
                </div>
            }
        </form>
    );
};

export default OfficeInfo;
