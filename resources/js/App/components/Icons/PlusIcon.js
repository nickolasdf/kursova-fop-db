import React from "react";

const PlusIcon = ({ color = "#000000", width = "20", height="20"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill={color}>
        <line x1="3" y1="9.88857" x2="17" y2="9.88857" stroke={color} strokeWidth="1.3"/>
        <line x1="10.1114" y1="3" x2="10.1114" y2="17" stroke={color} strokeWidth="1.3"/>
    </svg>
);

export default PlusIcon;
