import React, { memo } from 'react';
import { useFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import './style.scss';

const useStyles = makeStyles({
    datePickerInput: {
        border: '1px solid #EFEFEF',
        borderRadius: '4px',
        backgroundColor: 'tomato',
        padding: '0 12px'
    }
});

const GeneralInfo = props => {
    const { user, openImageDialog, userId, image } = props;
    const classes = useStyles();

    const customStylesWhite = {
        control: (base, state) => ({
            ...base
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            padding: 0
        })
    };

    const customSelectStyles = {
        control: base => ({
            ...base,
            borderRadius: '4px'
        })
    };

    const sexOptions = [
        { label: 'мужчина', value: 1 },
        { label: 'женщина', value: 2 },
        { label: 'отсутствует', value: '' }
    ];

    const selectTheme = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            primary25: '#FFD63C',
            primary: '#FFD63C'
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: image,
            first_name: user.first_name,
            last_name: user.last_name,
            sex: user.sex,
            password: '',
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            start_work: user.dateStart
        },
        onSubmit: values =>
            requests.User.update(userId, { ...values, sex: values.sex.label })
    });

    return (
        <form className="profile-form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <label>Фото</label>
                    <div className="profile">
                        <img
                            src={formik.values.image}
                            className="profile__avatar"
                            alt="photo"
                            onClick={() => openImageDialog(true)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <label>Имя</label>
                    <div>
                        <input
                            name="first_name"
                            value={formik.values.first_name}
                            type="text"
                            className="profile-form__input"
                            placeholder="Имя"
                            onChange={formik.handleChange}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <label>Фамилия</label>
                    <div className="profile">
                        <input
                            name="last_name"
                            value={formik.values.last_name}
                            type="text"
                            className="profile-form__input"
                            placeholder={'Фамилия'}
                            onChange={formik.handleChange}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <label>Пол</label>
                    <div>
                        <Select
                            onChange={sex =>
                                formik.setFieldValue('sex', sex)
                            }
                            name="sex"
                            value={formik.values.sex}
                            styles={customSelectStyles}
                            options={sexOptions}
                            theme={selectTheme}
                            placeholder={'Пол'}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <label>Пароль</label>
                    <input
                        name="password"
                        value={formik.values.password}
                        autoComplete={'new-password'}
                        type="password"
                        className="profile-form__input"
                        placeholder={'Пароль'}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <label>
                        Електронная почта
                    </label>
                    <input
                        type="text"
                        defaultValue={formik.values.email}
                        className="profile-form__input"
                        readOnly
                    />
                </Grid>
                <Grid item xs={12}>
                    <label>
                        Номер мобильного
                    </label>
                    <div className="input-wrapper">
                        <input
                            name="phone"
                            value={formik.values.phone}
                            type="text"
                            className="profile-form__input"
                            placeholder={'Номер мобильного'}
                            onChange={formik.handleChange}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <label>Дата рождения</label>
                    <DatePicker
                        onChange={date =>
                            formik.setFieldValue('birthday', moment(date))
                        }
                        name="birthday"
                        disableToolbar
                        variant="inline"
                        format="DD.MM.YYYY"
                        margin="normal"
                        id="date-picker-inline-birtday"
                        value={formik.values.birthday}
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                input: classes.datePickerInput
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <label>Дата начала роботы</label>

                    <DatePicker
                        onChange={date =>
                            formik.setFieldValue('start_work', moment(date))
                        }
                        name="start_work"
                        disableToolbar
                        variant="inline"
                        format="DD.MM.YYYY"
                        margin="normal"
                        id="date-picker-inline-start_work"
                        value={formik.values.start_work}
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                input: classes.datePickerInput
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(memo(GeneralInfo));
