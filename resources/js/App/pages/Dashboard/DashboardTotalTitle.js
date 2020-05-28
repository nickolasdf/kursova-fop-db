import React, {useState} from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FinancialInfo from "../../components/FinancialInfo";
import {Collapse} from "@material-ui/core";
import Button from "../../components/Button";
import { TotalInfoIcon } from "../../components/Icons";
import Preloader from "../../components/Preloader";

const DashboardTotalTitle = ({ totalList }) => {
    const [financialInfoOpen, setFinancialInfoOpen] = useState(false);

    const handleClick = () => {
        setFinancialInfoOpen(!financialInfoOpen)
    };

    return (
        <>
            <div className="total_list_wrapper">
                <div>
                    <h1 className="dashboard_total_title">Деньги</h1>
                </div>
                <div className="total_block">
                    <TotalInfoIcon />
                    <div className="total_list">
                        <Grid container>
                        {
                            totalList ? totalList.map(totalItem => (
                                <Grid item key={totalItem.currency} xs={6} md={3}>
                                    <span className="total_currency">
                                        <span className="currency_symbol">{totalItem.currencySymbol}</span>
                                        <span>{totalItem.total}</span>
                                    </span>
                                </Grid>
                            )) : <Preloader size={24}/>
                        }
                        </Grid>
                    </div>
                    <Button className="detail_btn" title="Подробнее" onClick={handleClick} />
                </div>
            </div>
            <div>
                <Collapse in={financialInfoOpen}>
                    <FinancialInfo />
                </Collapse>
            </div>
        </>
    )
};

const mapStateToProps = ({ Dashboard }) => ({
    totalList: Dashboard.data.total
});

export default connect(mapStateToProps)(DashboardTotalTitle);
