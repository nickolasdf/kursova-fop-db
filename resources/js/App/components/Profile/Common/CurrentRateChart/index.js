import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./style.scss";

const CurrentRateChart = ({ data, label }) => (
    <div className="current-rate-chart__container">
        <ResponsivePie
            data={data}
            margin={{ top: 0, right: 40, bottom: 40, left: 40 }}
            innerRadius={0.9}
            cornerRadius={45}
            colors={["#08a902", "#f0f1f2"]}
            enableRadialLabels={false}
            enableSlicesLabels={false}
            startAngle={-120}
            endAngle={120}
        />
        <div className="current-rate-chart__overlay">
            <div><span className="donut_amount_title">{ data [0].value } $</span></div>
            <div><span className="donut_label">{label}</span></div>
        </div>
    </div>
);

export default CurrentRateChart;
