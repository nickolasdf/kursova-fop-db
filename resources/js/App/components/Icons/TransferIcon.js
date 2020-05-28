import React from "react";

const TransferIcon = ({ color = "#FFD63C", width = "10", height = "10"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 10 10" fill={color}>
            <path d="M6.39913 0.140074L10 4L0 4L0 3.04352H7.84582L5.76819 0.816411C5.59395 0.629646 5.59395 0.326839 5.76819 0.140074C5.94242 -0.0466914 6.2249 -0.0466914 6.39913 0.140074Z" />
            <path d="M3.60087 9.85993L0 6H10V6.95648H2.15418L4.23181 9.18359C4.40605 9.37035 4.40605 9.67316 4.23181 9.85993C4.05758 10.0467 3.7751 10.0467 3.60087 9.85993Z" />
        </svg>
    )
};

export default TransferIcon;
