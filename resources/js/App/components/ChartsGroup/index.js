import React from 'react';
import AreaChart from '../AreaChart';
import DonutChart from '../DonutChart';
import { connect } from 'react-redux';
import NavBlockWrapper from '../NavBlockWrapper';
import AreaChartLabelList from './AreaChartLabelList';
import './style.scss';

const ChartsGroup = ({ expense, income, chart }) => {
    return (
        <div className="dashboard_charts_wrapper">
            <div className="chart area_chart_wrapper">
                <NavBlockWrapper component={<AreaChartLabelList/>}>
                    <AreaChart data={chart}/>
                </NavBlockWrapper>
            </div>
            <div className="chart donut_chart_wrapper">
                <NavBlockWrapper title="Все расходы">
                    <DonutChart data={expense} symbol="-"/>
                </NavBlockWrapper>
            </div>
            <div className="chart donut_chart_wrapper">
                <NavBlockWrapper title="Все приходы">
                    <DonutChart data={income} symbol="+"/>
                </NavBlockWrapper>
            </div>
        </div>
    );
};

const mapStateToProps = ({ Dashboard, Chart }) => ({
    income: Dashboard.data.income,
    expense: Dashboard.data.expense,
    chart: Chart.data
});

export default connect(mapStateToProps)(ChartsGroup);
