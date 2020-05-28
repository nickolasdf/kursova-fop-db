import React from "react";
import "./style.scss";
import BoxTitle from "../Common/BoxTitle";
import Preloader from "../../Preloader";
import Grid from '@material-ui/core/Grid';
import connect from "react-redux/es/connect/connect";
import moment from "moment";

const RecentTransactions = props => {
    return (
        <div
            className={`recent-transactions__container ${props.styleName}`}
        >
            <BoxTitle title="Последние транзакции"/>
            {props.pending ?
                <div className="recent-transactions__body center">
                    <Preloader/>
                </div>
                :
                <div className="recent-transactions__body">
                    <div className="recent-transactions__table-header">
                        <Grid container spacing={1} >
                            <Grid item xs={2}>Дата</Grid>
                            <Grid item xs={2}>Сумма</Grid>
                            <Grid item xs={5}>Детали платежа</Grid>
                            <Grid item xs={3}>Отправитель</Grid>
                        </Grid>
                    </div>
                    {
                        props.userInfo.transactions.map(transaction => {
                            return (
                                <div className="recent-transactions__table-row" key={transaction.id}>
                                    <Grid container spacing={1} >
                                        <Grid item xs={2}>{moment(transaction.date).format('YYYY.MM.DD')}</Grid>
                                        <Grid item xs={2}>{transaction.amount}</Grid>
                                        <Grid item xs={5}>{transaction.accountItemName}</Grid>
                                        <Grid item xs={3}>{transaction.contractorName}</Grid>
                                    </Grid>
                                </div>
                            )
                        })
                    }

                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo,
    pending: state.Profile.pending,
});

export default connect(mapStateToProps)(RecentTransactions);

