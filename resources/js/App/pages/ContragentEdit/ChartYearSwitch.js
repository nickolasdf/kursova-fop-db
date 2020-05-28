import React from 'react';
import { useSelector } from 'react-redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import '../../components/ChartsGroup/AreaChartLabelList.scss';
import './index.scss';

const createData = ({ expense, income }) => {

    return [
        {
            color: expense.before.color,
            name: expense.before.id,
            id: 1
        },
        {
            color: expense.after.color,
            name: expense.after.id,
            id: 2
        },
        {
            color: income.before.color,
            name: income.before.id,
            id: 3
        },
        {
            color: income.after.color,
            name: income.after.id,
            id: 4
        }
    ];
};

/**
 * Header component for customers chart year switch
 * @param {object} props - component props.
 * @param {function} props.changeRangeDate - change date range handler.
 * @param {string} props.currentYear - displays a current year.
 */
const ChartYearSwitch = ({ changeRangeDate, currentYear }) => {
    const { Chart: { loading, data } } = useSelector(state => state);

    return (
        <div className="chart-wrapper">
            {
                !loading &&
                <ul className="area_chart_label_list">
                    {
                        createData(data).map(item => {
                            return (
                                <li key={item.id}>
                                    <div
                                        style={{
                                            backgroundColor: item.color,
                                            borderRadius: '100%',
                                            width: '8px',
                                            height: '8px'
                                        }}
                                    >
                                    </div>
                                    <span className="label_name">
                                        {item.name}
                                    </span>
                                </li>
                            );
                        })
                    }
                </ul>
            }
            <div className="chart-year-switch">
                <ArrowBackIosIcon
                    style={{ fontSize: 12 }}
                    onClick={() => changeRangeDate('subtract')}
                />
                <span>Год ({currentYear})</span>
                <ArrowForwardIosIcon
                    style={{ fontSize: 12 }}
                    onClick={() => changeRangeDate('add')}
                />
            </div>
        </div>
    );
};

export default ChartYearSwitch;
