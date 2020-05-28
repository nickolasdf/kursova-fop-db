import React, { useEffect } from 'react';
import ChartsGroup from '../../components/ChartsGroup';
import PickDate from '../../components/PickDate';
import MainLayout from '../../components/MainLayout';
import TransactionModal from '../../components/TransactionModal';
import './style.scss';
import { getDashboardData } from '../../reducers/Dashboard/actions';
import { getChartData } from '../../reducers/Chart/actions';
import DashboardTotalTitle from './DashboardTotalTitle';
import { resetDateConfig } from '../../reducers/App/actions';
import {
    getCurrentTransactionsData,
    getNotCurrentTransactionsData,
    resetCurrentTransactions,
    resetNotCurrentTransactions
} from '../../reducers/Transactions/actions';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsTable from '../../components/TransactionsTable';
import moment from 'moment';

const DashBoard = () => {
    const {
        Transactions: { currentTransactions, notCurrentTransactions },
        App: { dateConfig }
    } = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        getDashboardInitialData();
        return () => {
            dispatch(resetDateConfig());
            dispatch(resetCurrentTransactions());
            dispatch(resetNotCurrentTransactions());
        };
    }, []);

    const getDashboardInitialData = () => {
        dispatch(getChartData());
        dispatch(getDashboardData());
    };

    const updateDashboardData = (dateParams) => {
        getDashboardInitialData();
        getCurrentTransactionsWithParams(dateParams);
        getNotCurrentTransactionsWithParams(dateParams);
    };

    const getCurrentTransactionsWithParams = (newParams) => {
        dispatch(getCurrentTransactionsData({
            today: 1,
            per_page: null,
            period_from: moment(dateConfig.dateFrom).format('YYYY-MM-DD'),
            period_to: moment(dateConfig.dateTo).format('YYYY-MM-DD'),
            ...newParams
        }));
    };

    const getNotCurrentTransactionsWithParams = (newParams) => {
        dispatch(getNotCurrentTransactionsData({
            today: 0,
            period_from: moment(dateConfig.dateFrom).format('YYYY-MM-DD'),
            period_to: moment(dateConfig.dateTo).format('YYYY-MM-DD'),
            ...newParams
        }));
    };

    return (
        <MainLayout>
            <div className="dashboard_page">
                <div>
                    <DashboardTotalTitle/>
                </div>
                <TransactionModal/>
                <div className="pick-date">
                    <PickDate
                        paddingLeftZero={true}
                        updateDashboardData={updateDashboardData}
                    />
                </div>
                <ChartsGroup/>
                <div className="transactions_table_wrapper">
                    <TransactionsTable
                        data={currentTransactions.data}
                        title="Текущие транзакции"
                        total={currentTransactions.meta.total}
                        pagination={false}
                        onMount={getCurrentTransactionsWithParams}
                        onChangePage={getCurrentTransactionsWithParams}
                        onChangeRowsPerPage={getCurrentTransactionsWithParams}
                        onChangeSort={getCurrentTransactionsWithParams}
                        updateData={updateDashboardData}
                    />
                </div>
                <div className="transactions_table_wrapper">
                    <TransactionsTable
                        data={notCurrentTransactions.data}
                        title="Принятые транзакции"
                        total={notCurrentTransactions.meta.total}
                        onMount={getNotCurrentTransactionsWithParams}
                        onChangePage={getNotCurrentTransactionsWithParams}
                        onChangeRowsPerPage={getNotCurrentTransactionsWithParams}
                        onChangeSort={getNotCurrentTransactionsWithParams}
                        updateData={updateDashboardData}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default DashBoard;
