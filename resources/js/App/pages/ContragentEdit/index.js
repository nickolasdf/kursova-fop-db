import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import clsx from 'clsx';

import ContragentInfo from './ContragentInfo';
import ContragentComments from './ContragentComments';
import MainTitle from '../../components/MainTitle';
import MainLayout from '../../components/MainLayout';
import requests from '../../requests';
import Preloader from '../../components/Preloader';
import CustomerForm from '../../components/Customers/CustomerForm';
import history from '../../history';
import DeleteContragentButton from './DeleteContragentButton';
import NavBlockWrapper from '../../components/NavBlockWrapper';
import TransactionsTable from '../../components/TransactionsTable';
import { getNotCurrentTransactionsData, resetNotCurrentTransactions } from '../../reducers/Transactions/actions';
import ContragentDetails from './ContragentDetails';
import ContragentRequisitesModal from './ContragentRequisitesModal';
import { getChartRangeData } from '../../reducers/Chart/actions';
import AreaChart from '../../components/AreaChart';
import Button from '../../components/custom/Button';
import './index.scss';
import ChartYearSwitch from './ChartYearSwitch';

const useStyles = makeStyles({
    button: {
        fontSize: '12px',
        borderRadius: '8px',
        textTransform: 'uppercase',
        marginRight: '12px',
        marginLeft: '12px',
        padding: '8px 16px'
    },
    editBtn: {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: '#FFD63C',
            color: 'black'
        }
    },
    deleteBtn: {
        color: '#8A8D9A',
        fontWeight: 'bold',
        border: 'solid 1px #e7eaed',
        backgroundColor: 'inherit'
    }
});

const ContragentEdit = ({ match }) => {
    const classes = useStyles();

    const initialContragentData = {
        balance: {
            fact: '',
            future: ''
        },
        customer: {
            balance: '',
            comments: [],
            contact: '',
            description: '',
            email: '',
            id: '',
            name: '',
            owner_id: '',
            phone: '',
            projects: [],
            details: null
        },
        expense: {
            diff: '',
            fact: '',
            future: '',
            plan: ''
        },
        income: {
            diff: '',
            fact: '',
            future: '',
            plan: ''
        }
    };

    const [contragentData, setContragentData] = useState(initialContragentData);
    const [loading, setLoading] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [requisitesModal, requisitesModalHandler] = useState(false);
    const [editCard, editCardHandler] = useState(null);
    const [rangeDate, rangeDateHandler] = useState({
        period_from: moment().startOf('year').format('YYYY-MM-DD'),
        period_to: moment().endOf('year').format('YYYY-MM-DD'),
        period_type: 'year'
    });
    const [requisitesEdit, setRequisitesEdit] = useState(false);
    // Test value

    const changeRangeDate = change => {
        if (change === 'add') {
            rangeDateHandler({
                ...rangeDate,
                period_from: moment(rangeDate.period_from).add(1, 'y').format('YYYY-MM-DD'),
                period_to: moment(rangeDate.period_to).add(1, 'y').format('YYYY-MM-DD')
            });
        } else {
            rangeDateHandler({
                ...rangeDate,
                period_from: moment(rangeDate.period_from).subtract(1, 'y').format('YYYY-MM-DD'),
                period_to: moment(rangeDate.period_to).subtract(1, 'y').format('YYYY-MM-DD')
            });
        }
    };

    const currentYear = moment(rangeDate.period_from).format('YYYY');

    const {
        Transactions: { notCurrentTransactions },
        Chart: { data: chart }
    } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        getContragentData();
        return () => {
            resetNotCurrentTransactions();
        };
    }, []);

    useEffect(() => {
        dispatch(getChartRangeData(rangeDate));
    }, [rangeDate]);

    const openRequisitesModal = () => {
        requisitesModalHandler(true);
    };

    const closeRequisitesModal = () => {
        requisitesModalHandler(false);
    };

    const onEditClose = () => {
        setEditModalOpen(false);
    };

    const onEditOpen = () => {
        setEditModalOpen(true);
    };

    const getNotCurrentTransactionsWithParams = (newParams) => {
        dispatch(getNotCurrentTransactionsData({
            ...newParams,
            customer_id: match.params.contragentId
        }));
    };

    const getContragentData = () => {
        requests.Customer.getDetail(match.params.contragentId)
            .then(resp => setContragentData(resp.data))
            .then(() => setLoading(false))
            .catch(() => history.push('/customers'));
    };

    const updateData = () => {
        getContragentData();
    };

    // Determines the width of the information section
    const sectionWidth = () => {
        if (contragentData.customer.details) {
            return 4;
        } else {
            return 6;
        }
    };

    const onRequisiteCreate = data => {
        setContragentData({
            ...contragentData,
            customer: {
                ...contragentData.customer,
                details: data
            }
        });
    };

    return (
        <MainLayout>
            {
                loading ? <Preloader/> :
                    <div className="contragent_edit_page">
                        <div className="content_header">
                            <div className="contragent_name_block">
                                <MainTitle title={contragentData.customer.name}/>
                            </div>
                            <div className="contragent__button-group">
                                {/* Show add requisites modal button only if there is no requisites data */}
                                {
                                    !contragentData.customer.details &&
                                    <div className="contragent__button-group__item">
                                        <Button variant="regular" onClick={openRequisitesModal}>ДОБАВИТЬ
                                            РЕКВИЗИТЫ</Button>
                                    </div>
                                }
                                <div className="contragent__button-group__item">
                                    <Button variant="secondary" onClick={onEditOpen}>РЕДАКТИРОВАТЬ</Button>
                                </div>
                                <div className="contragent__button-group__item">
                                    <DeleteContragentButton
                                        className={clsx(classes.button, classes.deleteBtn)}
                                        id={contragentData.customer.id}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={sectionWidth()}>
                                    <div className="contragent_item_card">
                                        <NavBlockWrapper
                                            title="Инфо"
                                            generalClickHandler={() => editCardHandler('info')}
                                        >
                                            <ContragentInfo
                                                data={contragentData}
                                                editCard={editCard}
                                                modeHandler={editCardHandler}
                                            />
                                        </NavBlockWrapper>
                                    </div>
                                </Grid>

                                {contragentData.customer.details && <Grid item xs={4}>
                                    <div className="contragent_item_card">
                                        <NavBlockWrapper
                                            title="Реквизиты"
                                            generalClickHandler={openRequisitesModal}
                                        >
                                            <ContragentDetails
                                                data={contragentData.customer.details}
                                            />
                                        </NavBlockWrapper>
                                    </div>
                                </Grid>}

                                <Grid item xs={sectionWidth()}>
                                    <div className="contragent_item_card">
                                        <NavBlockWrapper
                                            title="Заметки"
                                            generalClickHandler={() => editCardHandler(null)}
                                        >
                                            <ContragentComments
                                                comments={contragentData.customer.comments}
                                                contragentId={contragentData.customer.id}
                                            />
                                        </NavBlockWrapper>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="table_wrapper">
                            <TransactionsTable
                                data={notCurrentTransactions.data}
                                total={notCurrentTransactions.meta.total}
                                onMount={getNotCurrentTransactionsWithParams}
                                onChangePage={getNotCurrentTransactionsWithParams}
                                onChangeRowsPerPage={getNotCurrentTransactionsWithParams}
                                onChangeSort={getNotCurrentTransactionsWithParams}
                            />
                        </div>
                        <Dialog
                            open={editModalOpen}
                            onClose={onEditClose}
                            fullWidth
                            maxWidth="md"
                        >
                            <CustomerForm
                                onClose={onEditClose}
                                data={contragentData.customer}
                                handleSubmit={updateData}
                            />
                        </Dialog>
                        <Dialog
                            open={requisitesModal}
                            onClose={closeRequisitesModal}
                            maxWidth="md"
                            fullWidth
                        >
                            <ContragentRequisitesModal
                                onClose={closeRequisitesModal}
                                customerId={contragentData.customer.id}
                                onSubmit={onRequisiteCreate}
                                defaultData={contragentData.customer.details}
                            />
                        </Dialog>

                        <div className="charts_wrapper">
                            <div className="chart area_chart_wrapper">
                                <NavBlockWrapper
                                    hideMenu
                                    component={<ChartYearSwitch
                                        currentYear={currentYear}
                                        changeRangeDate={changeRangeDate}
                                    />}
                                >
                                    <AreaChart data={chart}/>
                                </NavBlockWrapper>
                            </div>
                        </div>
                    </div>
            }
        </MainLayout>
    );
};

export default ContragentEdit;
