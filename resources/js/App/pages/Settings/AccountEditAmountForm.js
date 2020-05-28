import React, { useEffect, useState } from 'react';
import './AccountEditAmountForm.scss';
import FormActionGroup from '../../components/FormActionGroup';
import { Checkbox, Grid, IconButton } from '@material-ui/core';
import { components } from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';
import PlusIcon from '../../components/Icons/PlusIcon';
import requests from '../../requests';
import { SUCCESS } from '../../config/alertVariants';
import { createAccountItemsData, createAccountsData } from '../../config/selectOptions';
import { useDispatch } from 'react-redux';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';
import { throwAlert } from '../../reducers/App/actions';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AccountEditAmountForm = props => {
    const {
        accountData,
        onClose,
        onSubmit
    } = props;

    const initialSchema = {
        amount: Yup.number('Сумма должна быть числом').required('Сумма обязательна'),
        account_transfer_id: Yup.mixed().required('Счет обязателный'),
        account_item_id: Yup.mixed().required('Статья обязательна'),
        convertation_rate: showRate ? Yup.number('Значение должно быть числом')
            .required('Валюта обязательна') : Yup.mixed().notRequired()
    };

    const [showRate, setShowRate] = useState(false);
    const [accountsData, setAccountsData] = useState({});
    const [correction, setCorrection] = useState(false);
    const [validationSchema, setValidationSchema] = useState(initialSchema);

    useEffect(() => {
        getAccounts();
    }, []);

    const dispatch = useDispatch();

    const initialValues = {
        amount: accountData.total,
        account_transfer_id: '',
        account_item_id: '',
        description: '',
        convertation_rate: '',
        correction: false
    };

    const handleCheckboxChange = (setValues, values) => event => {
        if (event.target.checked) {
            setValidationSchema({
                ...validationSchema,
                account_transfer_id: Yup.mixed().notRequired(),
                account_item_id: Yup.mixed().notRequired()
            });
        } else {
            setValidationSchema(initialSchema);
        }
        setCorrection(event.target.checked);
        setValues({
            ...values,
            account_transfer_id: '',
            account_item_id: ''
        }, true);
    };
    const handleSelectAccount = (name, setValue) => value => {
        setShowRate(accountData.currencyValue !== value.currency);
        if (accountData.currency === value.currency) {
            setValue('convertation_rate', '', true);
            setValue('account_transfer_id', value, true);
        } else {
            setValue(name, value, true);
        }
    };
    const handleSelectChange = (name, setValue) => value => {
        setValue(name, value, true);
    };

    const getAccounts = () => {
        requests.Transaction.getNew().then(resp => {
            setAccountsData(resp.data);
        });
    };

    const submitForm = values => {
        const formData = {
            amount: accountData.total - values.amount,
            account_transfer_id: values.account_transfer_id.value,
            account_item_id: values.account_item_id.value,
            description: values.description,
            convertation_rate: values.convertation_rate,
            correction: correction
        };
        requests.Account.updateAmount(accountData.id, formData).then(resp => {
            if (resp) {
                onClose();
                onSubmit();
                dispatch(throwAlert(SUCCESS, 'Сумма счета обновлена'));
            }
        });
    };

    const accountsList = createAccountsData(accountsData.accounts);
    const accountItemsList = createAccountItemsData(accountsData.accountItems);

    return (
        <Formik
            onSubmit={submitForm}
            validationSchema={Yup.object().shape(validationSchema)}
            initialValues={initialValues}
        >
            {
                ({
                    handleSubmit,
                    values,
                    handleChange,
                    setValues,
                    handleBlur,
                    errors,
                    touched,
                    setFieldValue
                }) => {

                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form_wrapper">
                                <div className="form_title">
                                    Редактировать сумму счета
                                </div>
                                <div className="edit_account_amount_form">
                                    <div className="form_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <span>Сумма</span>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <Input
                                                        type="number"
                                                        onChange={handleChange('amount')}
                                                        placeholder="Введіть суму"
                                                        isError={errors.amount && touched.amount}
                                                        errorMessage={errors.amount}
                                                        onBlur={handleBlur('amount')}
                                                        defaultValue={accountData.total}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="form_row form_margin_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <span>Корректировка остатка</span>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <Checkbox
                                                        checked={correction}
                                                        onChange={handleCheckboxChange(setValues, values)}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="form_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <span>Счет</span>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <Select
                                                        options={accountsList}
                                                        onChange={handleSelectAccount('account_transfer_id', setFieldValue)}
                                                        placeholder="Выберите счет..."
                                                        isDisabled={correction}
                                                        value={values.account_transfer_id}
                                                        isError={!correction && (errors.account_transfer_id && touched.account_transfer_id)}
                                                        errorMessage={errors.account_transfer_id}
                                                        onBlur={!correction && handleBlur('account_transfer_id')}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    {
                                        showRate && !correction ?
                                            <div className="form_row">
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>
                                                        <span>Контвертация валюты</span>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <div>
                                                            <Input
                                                                type="number"
                                                                onChange={handleChange('convertation_rate')}
                                                                placeholder="Введите сумму..."
                                                                isError={errors.convertation_rate && touched.convertation_rate}
                                                                errorMessage={errors.convertation_rate}
                                                                onBlur={handleBlur('convertation_rate')}
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div> : null
                                    }
                                    <div className="form_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <span>Статья</span>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <Select
                                                        options={accountItemsList}
                                                        onChange={handleSelectChange('account_item_id', setFieldValue, values)}
                                                        placeholder="Выберите статью..."
                                                        isDisabled={correction}
                                                        value={values.account_item_id}
                                                        isError={!correction && (errors.account_item_id && touched.account_item_id)}
                                                        errorMessage={errors.account_item_id}
                                                        onBlur={handleBlur('account_item_id')}
                                                        components={{
                                                            Menu: props => {
                                                                return (
                                                                    <components.Menu {...props}>
                                                                        {
                                                                            props.children
                                                                        }
                                                                        <div className="select_add_item_icon_wrapper">
                                                                            <Tooltip title="Добавить статью">
                                                                                <IconButton className="select_add_item_icon">
                                                                                    <PlusIcon/>
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </components.Menu>
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="form_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <span>Описание</span>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <Input
                                                        onChange={handleChange('description')}
                                                        placeholder="не обязательно"
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                            <FormActionGroup onClose={onClose}/>
                        </form>
                    );
                }
            }
        </Formik>
    );
};

export default AccountEditAmountForm;
