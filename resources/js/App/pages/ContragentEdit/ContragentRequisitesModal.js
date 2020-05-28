import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Input from '../../components/custom/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';

import './index.scss';
import FormActionGroup from '../../components/FormActionGroup';
import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';

/**
 * Modal for creating data about contragent's requisites
 * @param {object} props - component props.
 * @param {function} props.onClose - modal close handler.
 */
const ContragentRequisitesModal = ({ onClose, customerId, onSubmit, defaultData }) => {
    const [initialValues, setInitialValues] = useState({
        bank_title: '',
        bank_number: '',
        bank_beneficiary: '',
        bank_beneficiary_address_1: '',
        bank_beneficiary_address_2: '',
        bank_beneficiary_swift: '',
        bank_intermediary: '',
        bank_intermediary_address_1: '',
        bank_intermediary_address_2: '',
        bank_intermediary_swift: '',
        account_number: '',
        bic: '',
        iban: ''
    });

    useEffect(() => {
        if (defaultData) {
            setInitialValues({
                bank_title: defaultData.bankTitle,
                bank_number: defaultData.bankNumber,
                bank_beneficiary: defaultData.bankBeneficiary,
                bank_beneficiary_address_1: defaultData.bankBeneficiaryAddress1,
                bank_beneficiary_address_2: defaultData.bankBeneficiaryAddress2,
                bank_beneficiary_swift: defaultData.bankBeneficiarySwift,
                bank_intermediary: defaultData.bankIntermediary,
                bank_intermediary_address_1: defaultData.bankIntermediaryAddress1,
                bank_intermediary_address_2: defaultData.bankIntermediaryAddress2,
                bank_intermediary_swift: defaultData.bankIntermediarySwift,
                account_number: defaultData.accountNumber,
                bic: defaultData.bic,
                iban: defaultData.iban
            });
        }
    }, [defaultData]);

    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        bank_title: Yup.string().required('Обязательное поле'),
        bank_number: Yup.string().required('Обязательное поле'),
        bank_beneficiary: Yup.string().required('Обязательное поле'),
        bank_beneficiary_address_1: Yup.string().required('Обязательное поле'),
        bank_beneficiary_address_2: Yup.string().required('Обязательное поле'),
        bank_beneficiary_swift: Yup.string().required('Обязательное поле'),
        bank_intermediary: Yup.string().required('Обязательное поле'),
        bank_intermediary_address_1: Yup.string().required('Обязательное поле'),
        bank_intermediary_address_2: Yup.string().required('Обязательное поле'),
        bank_intermediary_swift: Yup.string().required('Обязательное поле'),
        account_number: Yup.string().required('Обязательное поле'),
        bic: Yup.string().required('Обязательное поле'),
        iban: Yup.string().required('Обязательное поле')
    });

    const closeModal = event => {
        event.preventDefault();
        onClose();
    };

    const submitForm = values => {
        setSubmitting(true);
        if (!defaultData) {
            requests.Customer.addBankDetail(customerId, values)
                .then(resp => {
                    if (onSubmit && typeof onSubmit === 'function') {
                        onSubmit(resp.data.details);
                    }
                    dispatch(throwAlert(SUCCESS, 'Банковские данные созданы'));
                    setSubmitting(false);
                    onClose();
                })
                .catch(() => setSubmitting(false));
        } else {
            requests.BankDetail.edit(defaultData.id, values)
                .then(resp => {
                    if (onSubmit && typeof onSubmit === 'function') {
                        onSubmit(resp.data);
                    }
                    dispatch(throwAlert(SUCCESS, 'Банковские данные обновлены'));
                    setSubmitting(false);
                    onClose();
                })
                .catch(() => setSubmitting(false));
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitForm}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
        >
            {
                ({
                    values,
                    handleSubmit,
                    handleChange,
                    errors
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form_wrapper">
                                <div className="form_title">Банковские данные</div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Название банка</span>
                                        </Grid>

                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_title}
                                                className="border-round-top"
                                                placeholder="DEUTSCHE BANK AG"
                                                onChange={handleChange('bank_title')}
                                                isError={Boolean(errors.bank_title)}
                                                errorMessage={errors.bank_title}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Номер банка</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_number}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_number')}
                                                isError={Boolean(errors.bank_number)}
                                                errorMessage={errors.bank_number}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank beneficiary</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_beneficiary}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_beneficiary')}
                                                isError={Boolean(errors.bank_beneficiary)}
                                                errorMessage={errors.bank_beneficiary}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank beneficiary address 1</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_beneficiary_address_1}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_beneficiary_address_1')}
                                                isError={Boolean(errors.bank_beneficiary_address_1)}
                                                errorMessage={errors.bank_beneficiary_address_1}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank beneficiary address 2</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_beneficiary_address_2}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_beneficiary_address_2')}
                                                isError={Boolean(errors.bank_beneficiary_address_2)}
                                                errorMessage={errors.bank_beneficiary_address_2}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank beneficiary swift</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_beneficiary_swift}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_beneficiary_swift')}
                                                isError={Boolean(errors.bank_beneficiary_swift)}
                                                errorMessage={errors.bank_beneficiary_swift}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank intermediary</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_intermediary}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_intermediary')}
                                                isError={Boolean(errors.bank_intermediary)}
                                                errorMessage={errors.bank_intermediary}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank intermediary address 1</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_intermediary_address_1}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_intermediary_address_1')}
                                                isError={Boolean(errors.bank_intermediary_address_1)}
                                                errorMessage={errors.bank_intermediary_address_1}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank intermediary address 2</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_intermediary_address_2}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_intermediary_address_2')}
                                                isError={Boolean(errors.bank_intermediary_address_2)}
                                                errorMessage={errors.bank_intermediary_address_2}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Bank intermediary swift</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bank_intermediary_swift}
                                                placeholder="321321321"
                                                onChange={handleChange('bank_intermediary_swift')}
                                                isError={Boolean(errors.bank_intermediary_swift)}
                                                errorMessage={errors.bank_intermediary_swift}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Номер счета</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.account_number}
                                                placeholder="456456456"
                                                onChange={handleChange('account_number')}
                                                isError={Boolean(errors.account_number)}
                                                errorMessage={errors.account_number}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>BIC</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.bic}
                                                placeholder="DEUTDEBBXX1"
                                                onChange={handleChange('bic')}
                                                isError={Boolean(errors.bic)}
                                                errorMessage={errors.bic}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>IBAN</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.iban}
                                                className="border-round-bottom"
                                                placeholder="DE123321123321123"
                                                onChange={handleChange('iban')}
                                                isError={Boolean(errors.iban)}
                                                errorMessage={errors.iban}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <FormActionGroup
                                onClose={closeModal}
                                isSubmitting={submitting}
                                buttonDisabled={submitting}
                            />
                        </form>
                    );
                }
            }
        </Formik>
    );
};

export default ContragentRequisitesModal;
