import React, { useState } from 'react';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import FormWrapper from '../FormWrapper';
import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import { getFops } from '../../reducers/FopList/actions';
import "./index.scss";

const FopForm = ({ onClose }) => {
    const [form, setForm] = useState({
        name: '',
        address: '',
        activities: [],
        registrationNumber: '',
        registerLocation: '',
        registrationDate: new Date(),
        phone: '',
        email: '',
        taxNumber: ''
    });

    const dispatch = useDispatch();

    const handleChange = field => event => {
        setForm({
            ...form,
            [field]: event.target.value
        });
    };

    const handleSelect = event => {
        setForm({
            ...form,
            activities: event.target.value
        });
    };

    const handleDateChange = value => {
        setForm({
            ...form,
            registrationDate: value.format()
        });
    };

    const submitForm = event => {
        event.preventDefault();
        requests.Fop.create(form).then(resp => {
            onClose();
            dispatch(throwAlert(SUCCESS, 'ФОП успішно створений'));
            dispatch(getFops());
        });
    };

    return (
        <form className="fop-form" onSubmit={submitForm}>
            <FormWrapper onClose={onClose}>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">ПІБ</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('name')}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Адреса</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('address')}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">КВЕДи</label></Grid>
                        <Grid item xs={8}>
                            <Select
                                style={{ width: '100%' }}
                                value={form.activities}
                                multiple={true}
                                onChange={handleSelect}
                            >
                                <MenuItem value="kved65">КВЕД 65</MenuItem>
                                <MenuItem value="kved67">КВЕД 67</MenuItem>
                                <MenuItem value="kved68">КВЕД 68</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Реєстраційний номер</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('registrationNumber')}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Місце реєстрації</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('registerLocation')}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Дата реєстрації</label></Grid>
                        <Grid item xs={8}>
                            <DatePicker
                                style={{ width: '100%' }}
                                variant="inline"
                                autoOk
                                onChange={handleDateChange}
                                value={form.registrationDate}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Номер телефону</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('phone')}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Електронна пошта</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('email')}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Податковий номер</label></Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth={true} onChange={handleChange('taxNumber')}/>
                        </Grid>
                    </Grid>
                </div>
            </FormWrapper>
        </form>
    );
};

export default FopForm;
