import React from 'react';
import './DonutTooltip.scss';
import { numberWithSpaces } from '../../config/constants';

const DonutTooltip = ({ data, amountSymbol }) => {
    return (
        <div className="donut-tooltip">
            <div className="donut-tooltip__label-wrapper">
                <div className="donut-tooltip__color-item" style={{ backgroundColor: data.color }}></div>
                <div>{data.label}</div>
            </div>
            <div className="donut-tooltip__value">{`${amountSymbol} ${numberWithSpaces(data.value)} ₴`}</div>
        </div>
    );
};

export default DonutTooltip;
