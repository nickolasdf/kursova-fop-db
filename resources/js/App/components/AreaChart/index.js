import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';
import { useSelector } from 'react-redux';

import Preloader from '../Preloader';
import './style.scss';
import AreaChartTooltip from './AreaChartTooltip';
import { numberWithSpaces } from '../../config/constants';

const theme = {
    axis: {
        ticks: {
            text: {
                fill: '#8A8D9A',
                fontSize: '12px'
            }
        }
    }
};

const AreaChart = ({ data }) => {
    const { App: { dateConfig }, Chart: { loading } } = useSelector(state => state);

    const { expense, income } = data;

    const getCurrentDateNumber = () => {
        switch (dateConfig.formatBy) {
            case 'day':
            case 'month':
            case 'week':
                return moment().locale('en').format('D');
            case 'quarter':
            case 'year':
                return moment().locale('en').format('MMMM');
            default:
                return 1;
        }
    };

    return (
        <>
            {loading ? (
                <Preloader/>
            ) : (
                <ResponsiveLine
                    data={[expense.before, expense.after, income.before, income.after]}
                    margin={{ top: 20, right: 20, bottom: 50, left: 70 }}
                    markers={[
                        {
                            axis: 'x',
                            value: getCurrentDateNumber(),
                            lineStyle: { stroke: '#000000', strokeWidth: 1 }
                        }
                    ]}
                    theme={theme}
                    xScale={{ type: 'point' }}
                    enableSlices="x"
                    crosshairType="top"
                    yScale={{
                        type: 'linear',
                        stacked: false,
                        min: 'auto',
                        max: 'auto'
                    }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 0,
                        tickPadding: 21,
                        tickRotation: 0
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 0,
                        tickValues: 5,
                        tickPadding: 16,
                        tickRotation: 0,
                        format: item => numberWithSpaces(item)
                    }}
                    colors={[expense.before.color, expense.after.color, income.before.color, income.after.color]}
                    lineWidth={2}
                    enablePoints={false}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaOpacity={0.1}
                    useMesh={true}
                    sliceTooltip={(data) => {
                        return (
                            <AreaChartTooltip data={data}/>
                        );
                    }}
                />
            )}
        </>
    );
};

export default AreaChart;
