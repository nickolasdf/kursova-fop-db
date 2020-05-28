import React from 'react';
import { Grid } from '@material-ui/core';
import Input from '../../custom/Input';
import FormActionGroup from '../../FormActionGroup';
import DeleteContragentButton from '../../../pages/ContragentEdit/DeleteContragentButton';
import MaskedInput from 'react-text-mask/dist/reactTextMask';
import { convertPhoneMask, phoneMask } from '../../../config/constants';
import { conformToMask } from 'react-text-mask';

const WrappedCustomerForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    closeModal,
    submitting,
    setFieldValue,
    data
}) => {
    const handleChangePhone = event => {
        const convertedValue = convertPhoneMask(event.target.value);
        setFieldValue('phone', convertedValue);
    };

    const conformedPhoneValue = (value) => {
        return conformToMask(value.replace('+380', ''), phoneMask).conformedValue;
    };

    return (
        <form className="contragents_edit_form" onSubmit={handleSubmit}>
            <div className="contragents-form-fields">
                <div className="form_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Ф.И.О.</span>
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                className="border-round-top"
                                placeholder="Ф.И.О."
                                value={values.name}
                                onChange={handleChange('name')}
                                isError={errors.name && touched.name}
                                errorMessage={errors.name}
                                onBlur={handleBlur('name')}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="form_row textarea-margin">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Описание</span>
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                type="textarea"
                                placeholder="Описание"
                                className="border-round-bottom"
                                rows={4}
                                value={values.description}
                                onChange={handleChange('description')}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="form_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Контакт</span>
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                className="border-round-top"
                                type="text"
                                value={values.contact}
                                onChange={handleChange('contact')}
                                placeholder="не обязательно"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="form_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Телефон</span>
                        </Grid>
                        <Grid item xs={8}>
                            <MaskedInput
                                mask={phoneMask}
                                onChange={handleChangePhone}
                                placeholder="+380"
                                onBlur={handleBlur('phone')}
                                isError={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                                value={conformedPhoneValue(values.phone)}
                                showMask
                                render={(ref, other) => {
                                    return (
                                        <Input
                                            ref={input => ref(input)}
                                            {...other}
                                        />
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="form_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Почта</span>
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                className="border-round-bottom"
                                type="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                placeholder="example@gmail.com"
                                onBlur={handleBlur('email')}
                                isError={errors.email && touched.email}
                                errorMessage={errors.email}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <FormActionGroup
                onClose={closeModal}
                deleteButton={data.id ? <DeleteContragentButton id={data.id}/> : null}
                isSubmitting={submitting}
            />
        </form>
    );
};

export default WrappedCustomerForm;
