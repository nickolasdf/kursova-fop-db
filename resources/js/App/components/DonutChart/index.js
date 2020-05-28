import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import './style.scss';
import Preloader from '../Preloader';
import DonutTooltip from './DonutTooltip';
import { numberWithSpaces } from '../../config/constants';

const DonutChart = ({ data, label, symbol }) => (
    <>
        {!data ? (
            <Preloader/>
        ) : (
            <div className="pie-wrapper">
                <div className="pie-container">
                    <ResponsivePie
                        data={data.fact}
                        margin={{ right: 20, left: 20, top: 20, bottom: 20 }}
                        innerRadius={0.65}
                        cornerRadius={0}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        colors={d => d.color}
                        enableRadialLabels={false}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        enableSlicesLabels={false}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        padAngle={2}
                        onMouseEnter={(data, event) => {
                            event.target.setAttribute('stroke-width', 5);
                            event.target.setAttribute('stroke-opacity', 0.5);
                        }}
                        onMouseLeave={(data, event) => {
                            event.target.setAttribute('stroke-width', 0);
                            event.target.setAttribute('stroke-opacity', 0);
                        }}
                        tooltip={(data) => {
                            return (
                                <DonutTooltip data={data} amountSymbol={symbol}/>
                            );
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        legends={[]}
                    />
                    <div className="donut_chart_overlay">
                        <div><span className="donut_amount_title">{symbol} {numberWithSpaces(data.factSum)} ₴</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
);

export default DonutChart;
