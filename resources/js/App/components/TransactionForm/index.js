import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '../custom/Select';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import requests from '../../requests';
import ChooseRepeat from './ChooseRepeat';
import { connect } from 'react-redux';
import { throwAlert } from '../../reducers/App/actions';
import AttachFile from '../Icons/AttachFile';
import { getDashboardData } from '../../reducers/Dashboard/actions';
import { getChartData } from '../../reducers/Chart/actions';
import { Dialog, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { shortenString } from '../../config/constants';
import PlusIcon from '../Icons/PlusIcon';
import MinusIcon from '../Icons/MinusIcon';
import TransferIcon from '../Icons/TransferIcon';
import pluralRu from 'plural-ru';
import RepeatIcon from '../Icons/RepeatIcon';
import CancelIcon from '../Icons/CancelIcon';
import './index.scss';
import useModal from '../../config/hooks/useModal';
import { SUCCESS } from '../../config/alertVariants';
import { createContractorsData, createProjectsData, getTransactionType } from './utils';
import { createAccountItemsData, createAccountsData } from '../../config/selectOptions';
import Input from '../custom/Input';
import CreateAccountItemForm from '../Settings/CreateAccountItemForm';
import { components } from 'react-select';
import CustomerForm from '../Customers/CustomerForm';
import ProjectForm from '../ProjectForm';
import FormActionGroup from '../FormActionGroup';
import TransactionComments from '../TransactionComments';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
    datePicker: {
        width: '100%',
        margin: 0
    },
    datePickerInput: {
        border: 'solid 1px #e0e0e0',
        backgroundColor: 'white',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 12px'
    },
    selectDash: {
        display: 'inline',
        margin: '0 12px'
    }
});

const TransactionForm = ({
    transactionId = null,
    transactionType,
    onClose,
    onSubmit,
    throwAlert
}) => {

    const [initialValues, setInitialValues] = useState({
        amount: '',
        account: '',
        accountTo: '',
        convertationRate: '',
        accountItem: '',
        customer: '',
        project: '',
        description: '',
        date: new Date(),
        isRepeated: false,
        repeat: {
            repeatBy: null,
            freq: null
        },
        file: '',
        base64: ''
    });

    const initValidSchema = {
        amount: Yup.number().typeError('Сума должна быть числом').required('Сума обязательна'),
        account: transactionType !== 'income' ? Yup.object().required('Счет обязательный') : null,
        accountTo: transactionType !== 'expense' ? Yup.object().required('Счет обязательный') : null,
        convertationRate: Yup.number('Курс должен быть числом').required('Курс обязательный'),
        accountItem: Yup.object().required('Статья обязательна'),
        customer: transactionType !== 'transfer' ? Yup.object().required('Контрагент обязательный') : null
    };
    const [validationSchema, setValidationSchema] = useState(initValidSchema);

    const [accountsData, setAccountsData] = useState({});
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [customers, setCustomers] = useState(null);
    const [projects, setProjects] = useState(null);
    const [comments, setComments] = useState([]);
    const [repeatMenuAnchor, setRepeatMenuAnchor] = useState(null);

    const [customersLoading, setCustomersLoading] = useState(false);
    const [projectsLoading, setProjectsLoading] = useState(false);

    const accountModal = useModal();
    const customerModal = useModal();
    const projectModal = useModal();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const classes = useStyles();

    let isMounted = false;

    useEffect(() => {
        isMounted = true;
        if (transactionId) {
            requests.Transaction.getOne(transactionId).then(resp => {
                const defaultData = {
                    accountsData: {
                        accounts: createAccountsData(resp.data.accounts),
                        accountItems: createAccountItemsData(resp.data.accountItems)
                    },
                    customers: createContractorsData(resp.data.contractors),
                    projects: createProjectsData(resp.data.projects),
                    comments: resp.data.data.comments,
                    form: {
                        amount: resp.data.data.amount,
                        description: resp.data.data.description,
                        convertationRate: resp.data.data.convertation_rate,
                        date: resp.data.data.date,
                        account: { ...resp.data.data.account_from, currencySymbol: resp.data.data.currencySymbol },
                        accountTo: { ...resp.data.data.account_to, currencySymbol: resp.data.data.currencySymbol },
                        accountItem: resp.data.data.account_item,
                        customer: resp.data.data.contractor,
                        project: resp.data.data.project,
                        file: {
                            name: resp.data.data.image.image,
                            path: resp.data.data.image.imagePath
                        }
                    }
                };
                if (!resp.data.data.image.image) {
                    defaultData.form.file = null;
                }
                setInitialValues({
                    ...initialValues,
                    ...defaultData.form
                });
                setAccountsData(defaultData.accountsData);
                setCustomers(defaultData.customers);
                setProjects(defaultData.projects);
                setComments(defaultData.comments);
            });
        } else {
            getAccountsData();
            getTransactionTypes();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const getTransactionTypes = () => {
        requests.Transaction.getType().then(resp => {
            if (isMounted) {
                setTransactionTypes(resp.data.data.transaction_type);
            }
        });
    };

    const getAccountsData = () => {
        requests.Transaction.getNew().then(resp => {
            if (isMounted) {
                setAccountsData({
                    accounts: createAccountsData(resp.data.accounts),
                    accountItems: createAccountItemsData(resp.data.accountItems)
                });
            }
        });
    };

    const openRepeatMenu = event => {
        setRepeatMenuAnchor(event.currentTarget);
    };

    const closeRepeatMenu = () => {
        setRepeatMenuAnchor(null);
    };

    const cancelRepeat = (values, setValues) => () => {
        setValues({
            ...values,
            isRepeated: false,
            repeat: {
                repeatBy: null,
                freq: null
            }
        });
    };

    const handleSaveRepeat = (values, setValues) => data => {
        setValues({
            ...values,
            isRepeated: true,
            repeat: {
                repeatBy: data.repeatBy,
                freq: data.freq
            }
        });
    };

    const handleDateChange = setValue => newDate => {
        setValue('date', newDate);
    };

    const handleSelectChange = (name, setValue) => item => {
        setValue(name, item);
    };

    const handleCommentChange = newComments => {
        setComments(newComments);
    };

    const handleSelectAccountItem = setValue => item => {

        setCustomers('');
        setProjects('');

        if (transactionType !== 'transfer') {
            setCustomersLoading(true);

            setValue('accountItem', item);

            requests.Transaction.getContractors({ params: { contractor_type: item.widget.toLowerCase() } })
                .then(resp => {
                    setCustomers(createContractorsData(resp.data));
                    setCustomersLoading(false);
                    setValue('customer', '');
                    setValue('project', '');
                }).catch(() => setCustomersLoading(false));
        } else {
            setValue('accountItem', item);
        }
    };

    const handleSelectCustomer = (values, setValue) => item => {
        setProjects(null);

        if (transactionType !== 'transfer') {
            setProjectsLoading(true);

            setValue('customer', item);

            requests.Transaction.getProjects({
                params: {
                    contractor_type: values.accountItem.widget.toLowerCase(),
                    contractor_id: item.value
                }
            }).then(resp => {
                setProjects(createProjectsData(resp.data));
                setProjectsLoading(false);
                setValue('project', '');
            }).catch(() => setProjectsLoading(false));
        }
    };

    const handleImageChange = (values, setValues) => event => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setValues({
                ...values,
                base64: reader.result,
                file: file
            });
        };
    };

    const inputFileRef = useRef();

    const clearAttachFile = setValue => () => {
        inputFileRef.current.value = '';
        setValue('file', null);
    };

    const localeDateRu = (name) => {
        switch (name) {
            case 'week':
                return ['Каждую неделю', 'Каждые %d недели', 'Каждые %d недель'];
            case 'month':
                return ['Каждый месяц', 'Каждые %d месяца', 'Каждые %d месяцев'];
            case 'year':
                return ['Каждый год', 'Каждые %d года', 'Каждые %d лет'];
            default:
                return '';
        }
    };

    const getCurrencySymbol = (type, values) => {
        switch (type) {
            case 'income':
                return values.accountTo.currencySymbol || '₴';
            case 'expense':
                return values.account.currencySymbol || '₴';
            case 'transfer':
                return values.accountTo.currencySymbol || '₴';
        }
    };

    const onSubmitAccountItem = setValue => data => {
        const newItem = {
            value: data.id,
            label: data.name,
            widget: data.widget,
            parentId: data.parent_id
        };

        setValue('accountItem', newItem);
        setAccountsData({
            ...accountsData,
            accountItems: [newItem, ...accountsData.accountItems]
        });
    };

    const onSubmitCustomer = setValue => data => {
        const newItem = {
            value: data.id,
            label: data.name
        };

        setValue('customer', newItem);
        setCustomers([newItem, ...customers]);
    };

    const onSubmitProject = setValue => data => {
        const newItem = {
            value: data.id,
            label: data.title
        };

        setValue('project', newItem);
        setProjects([newItem, ...projects]);
    };

    const submitForm = values => {
        event.preventDefault();

        setIsSubmitting(true);

        const formData = {
            amount: values.amount,
            account_id: (values.account && values.account.value) || (values.accountTo && values.accountTo.value),
            convertation_rate: values.convertationRate,
            account_transfer_id: transactionType === 'transfer' ? values.accountTo.value : null,
            account_item_id: values.accountItem.value,
            contractor_id: values.customer && values.customer.value,
            project_id: values.project && values.project.value,
            description: values.description,
            date: values.date,
            planned: values.date > new Date() ? 1 : 0,
            repeated: values.repeat.repeatBy,
            repeated_every: values.repeat.freq
        };
        if (values.base64) {
            formData.image = values.base64;
        } else if (!values.file) {
            formData.image = null;
        }
        if (transactionId) {
            requests.Transaction.update(transactionId, formData).then(() => {
                if (onSubmit) {
                    onSubmit();
                }
                onClose();
                throwAlert(SUCCESS, 'Транзакция обновлена');
            }).catch(() => setIsSubmitting(false));
        } else {
            const type_id = getTransactionType(transactionTypes, transactionType).id;
            requests.Transaction.create({ ...formData, type_id }).then(() => {
                if (onSubmit) {
                    onSubmit();
                }
                onClose();
                throwAlert(SUCCESS, 'Транзакция создана');
            }).catch(() => setIsSubmitting(false));
        }
    };

    const AmountIcon = ({ type }) => {
        switch (type) {
            case 'expense':
                return <MinusIcon color="#8a8d9a"/>;
            case 'income':
                return <PlusIcon color="#8a8d9a"/>;
            case 'transfer':
                return <TransferIcon color="#8a8d9a" width={14} height={14}/>;
            default:
                return 'No Icon';
        }
    };

    return (
        <div className="outside_transaction_form_wrapper">
            <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                validationSchema={Yup.object().shape(validationSchema)}
                enableReinitialize={true}
            >
                {
                    ({
                        values,
                        setFieldValue,
                        setValues,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        errors,
                        touched
                    }) => {
                        const [showRate, setShowRate] = useState(false);

                        useEffect(() => {
                            if (values.account && values.accountTo) {
                                if (values.account.currency !== values.accountTo.currency) {
                                    setValidationSchema({
                                        ...validationSchema,
                                        convertationRate: initValidSchema.convertationRate
                                    });
                                    setShowRate(true);
                                } else {
                                    setValidationSchema({ ...validationSchema, convertationRate: null });
                                    setShowRate(false);
                                }
                            } else {
                                setValidationSchema({ ...validationSchema, convertationRate: null });
                            }
                        }, [values.account, values.accountTo]);

                        return (
                            <>
                                <form onSubmit={handleSubmit} className="transaction_form">
                                    <div className="transaction_form_wrapper">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <div className="amount_input_wrapper">
                                                    <div className="transaction_amount_icon">
                                                        <AmountIcon type={transactionType}/>
                                                    </div>
                                                    <Input
                                                        className="amount_input"
                                                        placeholder="0"
                                                        onChange={handleChange('amount')}
                                                        value={values.amount}
                                                        isError={errors.amount && touched.amount}
                                                        onBlur={handleBlur('amount')}
                                                        errorMessage={errors.amount}
                                                    />
                                                    <div className="transaction_form_currency_symbol">
                                                        <span>{getCurrencySymbol(transactionType, values)}</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        {
                                            (transactionType === 'expense' || transactionType === 'transfer') &&
                                            <div className="form_row">
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>
                                                        <span>Со счета</span>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Select
                                                            onChange={handleSelectChange('account', setFieldValue)}
                                                            options={accountsData.accounts}
                                                            placeholder="Выбрать счет"
                                                            value={values.account}
                                                            isError={errors.account && touched.account}
                                                            errorMessage={errors.account}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        }
                                        {
                                            (transactionType === 'income' || transactionType === 'transfer') &&
                                            <div className="form_row">
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>
                                                        <span>На счет</span>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Select
                                                            onChange={handleSelectChange('accountTo', setFieldValue)}
                                                            options={accountsData.accounts}
                                                            placeholder="Выбрать счет"
                                                            value={values.accountTo}
                                                            isError={errors.accountTo && touched.accountTo}
                                                            errorMessage={errors.accountTo}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        }
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                {
                                                    showRate &&
                                                    <>
                                                        <Grid item xs={4}>
                                                            <span>Курс</span>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Input
                                                                className="transaction_form_input"
                                                                type="number"
                                                                step="0.01"
                                                                placeholder="Ввести курс"
                                                                onChange={handleChange('convertationRate')}
                                                                value={values.convertationRate}
                                                                isError={errors.convertationRate && touched.convertationRate}
                                                                errorMessage={errors.convertationRate}
                                                            />
                                                        </Grid>
                                                    </>
                                                }
                                            </Grid>
                                        </div>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={4}>
                                                    <span>Статья</span>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Select
                                                        onChange={handleSelectAccountItem(setFieldValue)}
                                                        options={accountsData.accountItems}
                                                        placeholder="Доход"
                                                        value={values.accountItem}
                                                        onAddClick={accountModal.openModal}
                                                        customComponents={{
                                                            Option: props => {
                                                                return (
                                                                    <components.Option {...props} className="option">
                                                                        {
                                                                            props.data.parentId ?
                                                                                <div className={classes.selectDash}>
                                                                                    <MinusIcon color="#5c5c5c"/>
                                                                                </div> : null
                                                                        }
                                                                        {
                                                                            props.children
                                                                        }
                                                                    </components.Option>
                                                                );
                                                            }
                                                        }}
                                                        isError={errors.accountItem && touched.accountItem}
                                                        errorMessage={errors.accountItem}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {
                                            transactionType !== 'transfer' ?
                                                <>
                                                    <div className="form_row">
                                                        <Grid container alignItems="center">
                                                            <Grid item xs={4}>
                                                                <span>Контрагент</span>
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Select
                                                                    onChange={handleSelectCustomer(values, setFieldValue)}
                                                                    options={customers}
                                                                    placeholder={'OOO "Rivo.Agency"'}
                                                                    isDisabled={(!values.accountItem) || customersLoading}
                                                                    value={values.customer}
                                                                    onAddClick={customerModal.openModal}
                                                                    isLoading={customersLoading}
                                                                    isError={errors.customer && touched.customer}
                                                                    errorMessage={errors.customer}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div className="form_row">
                                                        <Grid container alignItems="center">
                                                            <Grid item xs={4}>
                                                                <span>Проект</span>
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Select
                                                                    onChange={handleSelectChange('project', setFieldValue)}
                                                                    options={projects}
                                                                    placeholder={'Проект'}
                                                                    isDisabled={(!values.customer) || projectsLoading}
                                                                    value={values.project}
                                                                    isLoading={projectsLoading}
                                                                    onAddClick={projectModal.openModal}
                                                                    isError={errors.project && touched.project}
                                                                    errorMessage={errors.project}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </> : null
                                        }
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={4}>
                                                    <span>Описание</span>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <div className="description_wrapper">
                                                        <Input
                                                            className="transaction_form_input description_input"
                                                            placeholder="Поступление денег"
                                                            onChange={handleChange('description')}
                                                            defaultValue={values.description}
                                                        />
                                                        {
                                                            values.file ?
                                                                <>
                                                                    <div className="attach_file_name_wrapper">
                                                                        <Tooltip title={values.file.name}>
                                                                <span className="file_name">
                                                                    <a
                                                                        href={values.file.path}
                                                                        download
                                                                    >{shortenString(values.file.name, 10)}</a>
                                                                </span>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div className="clear_attach_file_wrapper">
                                                                        <ClearIcon
                                                                            onClick={clearAttachFile(setFieldValue)}
                                                                            className="clear_attach_file_icon"
                                                                        />
                                                                    </div>
                                                                </> : null
                                                        }
                                                        <div className="attach_file_icon_wrapper">
                                                            <input
                                                                className="attach_file_icon_input"
                                                                type="file"
                                                                name="attachFile"
                                                                id="attachFile"
                                                                onChange={handleImageChange(values, setValues)}
                                                                ref={inputFileRef}
                                                            />
                                                            <label className="attach_file_label" htmlFor="attachFile">
                                                                <AttachFile/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={4}>
                                                    <span>Дата</span>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <div className="date_picker_wrapper">
                                                        <DatePicker
                                                            disableToolbar
                                                            autoOk={true}
                                                            variant="inline"
                                                            format="DD.MM.YYYY"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            value={values.date}
                                                            onChange={handleDateChange(setFieldValue)}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                classes: {
                                                                    input: classes.datePickerInput
                                                                }
                                                            }}
                                                            classes={{
                                                                root: classes.datePicker
                                                            }}
                                                        />
                                                        {
                                                            !transactionId ?
                                                                <div className="form_date_actions_wrapper">
                                                                    <button
                                                                        type="button"
                                                                        onClick={openRepeatMenu}
                                                                        className="form_date_action"
                                                                    >
                                                                        {
                                                                            values.isRepeated ?
                                                                                <>
                                                                                    <span className="repeat_btn_title">{pluralRu(values.repeat.freq, ...localeDateRu(values.repeat.repeatBy))}</span>
                                                                                </> :
                                                                                <>
                                                                                    <span className="repeat_btn_title">Повторять</span>
                                                                                    <span><RepeatIcon/></span>
                                                                                </>
                                                                        }
                                                                    </button>
                                                                    {
                                                                        values.isRepeated &&
                                                                        <Tooltip title="Отменить повторение">
                                                                            <button onClick={cancelRepeat(values, setValues)}>
                                                                                <span><CancelIcon/></span>
                                                                            </button>
                                                                        </Tooltip>
                                                                    }
                                                                </div> : null
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <ChooseRepeat
                                            onSave={handleSaveRepeat(values, setValues)}
                                            open={Boolean(repeatMenuAnchor)}
                                            anchorEl={repeatMenuAnchor}
                                            onClose={closeRepeatMenu}
                                        />
                                    </div>
                                    <FormActionGroup
                                        onClose={onClose}
                                        isSubmitting={isSubmitting}
                                        buttonDisabled={isSubmitting}
                                    />
                                </form>
                                <Dialog
                                    open={accountModal.open}
                                    fullWidth={true}
                                    maxWidth="md"
                                    onClose={accountModal.closeModal}
                                >
                                    <CreateAccountItemForm
                                        onClose={accountModal.closeModal}
                                        onSubmit={onSubmitAccountItem(setFieldValue)}
                                    />
                                </Dialog>
                                <Dialog
                                    open={customerModal.open}
                                    fullWidth={true}
                                    maxWidth="md"
                                    onClose={customerModal.closeModal}
                                >
                                    <CustomerForm
                                        onClose={customerModal.closeModal}
                                        handleSubmit={onSubmitCustomer(setFieldValue)}
                                    />
                                </Dialog>
                                <Dialog
                                    open={projectModal.open}
                                    fullWidth={true}
                                    maxWidth="md"
                                    onClose={projectModal.closeModal}
                                >
                                    <ProjectForm
                                        closeForm={projectModal.closeModal}
                                        updateData={onSubmitProject(setFieldValue)}
                                    />
                                </Dialog>
                            </>
                        );
                    }
                }
            </Formik>
            {
                transactionId ?
                    <div className="transaction_comments_wrapper">
                        <TransactionComments
                            id={transactionId}
                            onChange={handleCommentChange}
                            defaultComments={comments}
                        />
                    </div> : null
            }
        </div>
    );
};

const mapDispatchToProps = {
    throwAlert,
    getDashboardData,
    getChartData
};

export default connect(null, mapDispatchToProps)(TransactionForm);
