import React from 'react';
import { numberWithSpaces } from '../../config/constants';
import './AreaChartTooltip.scss';

const AreaChartTooltip = ({ data }) => {
    const { slice } = data;

    return (
        <div className="area-chart-tooltip">
            <div
                className="area-chart-tooltip__item"
                style={{ color: slice.points[0].color }}
            >+ {numberWithSpaces(slice.points[0].data.y)}</div>
            <div
                className="area-chart-tooltip__item"
                style={{ color: slice.points[1].color }}
            >- {numberWithSpaces(slice.points[1].data.y)}</div>
        </div>
    );
};

export default AreaChartTooltip;
