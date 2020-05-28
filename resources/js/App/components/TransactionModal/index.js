import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

import ButtonGroup from '../ButtonGroup';
import TransactionForm from '../TransactionForm';
import useModal from '../../config/hooks/useModal';
import { getCurrentTransactionsData, getNotCurrentTransactionsData } from '../../reducers/Transactions/actions';
import { getDashboardData } from '../../reducers/Dashboard/actions';
import { getChartData } from '../../reducers/Chart/actions';
import './style.scss';

const useStyles = makeStyles({
    tab: {
        borderRight: '1px solid #e7eaed',
        minHeight: '60px'
    },
    currentTab: {
        backgroundColor: '#F9F9F9',
        borderBottom: 'none'
    },
    tabIndicator: {
        display: 'none'
    },
    tabs: {
        backgroundColor: '#FFFFFF',
        minHeight: 60
    },
    tabPanel: {
        width: '720px'
    },
    tabText: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: '16px'
    }
});

const tabs = [
    {
        id: 0,
        label: 'Расходы'
    },
    {
        id: 1,
        label: 'Доходы'
    },
    {
        id: 2,
        label: 'Перевод'
    }
];

const TabPanel = props => {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div {...other} >
            {
                value !== index ? null : <div className={classes.tabPanel}>{children}</div>
            }
        </div>
    );
};

const TransactionModal = props => {
    const [currentTab, setCurrentTab] = useState(0);
    const transactionModal = useModal();
    const classes = useStyles();
    const dispatch = useDispatch();

    const updateDashboard = () => {
        dispatch(getCurrentTransactionsData());
        dispatch(getNotCurrentTransactionsData());
        dispatch(getDashboardData());
        dispatch(getChartData());
    };

    const openTransactionForm = (index) => () => {
        setCurrentTab(index);
        transactionModal.openModal();
    };

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <React.Fragment>
            <Dialog
                open={transactionModal.open}
                onClose={transactionModal.closeModal}
                maxWidth={false}
            >
                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
                    className={classes.tabs}
                    variant="fullWidth"
                    scrollButtons="auto"
                    classes={{ indicator: classes.tabIndicator }}
                >
                    {
                        tabs.map((item, index) => (
                            <Tab
                                key={item.id}
                                label={item.label}
                                classes={{
                                    root: index !== tabs.length - 1 ? classes.tab : null,
                                    selected: item.id === currentTab ? classes.currentTab : null,
                                    wrapper: classes.tabText
                                }}
                            />
                        ))
                    }
                </Tabs>
                <TabPanel className={classes.currentTab} value={currentTab} index={0}>
                    <TransactionForm
                        onClose={transactionModal.closeModal}
                        transactionType="expense"
                        onSubmit={updateDashboard}
                    />
                </TabPanel>
                <TabPanel className={classes.currentTab} value={currentTab} index={1}>
                    <TransactionForm
                        onClose={transactionModal.closeModal}
                        transactionType="income"
                        onSubmit={updateDashboard}
                    />
                </TabPanel>
                <TabPanel className={classes.currentTab} value={currentTab} index={2}>
                    <TransactionForm
                        onClose={transactionModal.closeModal}
                        transactionType="transfer"
                        onSubmit={updateDashboard}
                    />
                </TabPanel>
            </Dialog>
            <div className="button-group">
                <ButtonGroup openForm={openTransactionForm}/>
            </div>
        </React.Fragment>
    );
};

export default TransactionModal;
