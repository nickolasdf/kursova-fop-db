import React from "react";

const ArrowDown = ({ color = "#000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 4"
    >
        <defs>
            <filter
                id="a"
                width="103.2%"
                height="110%"
                x="-1.6%"
                y="-5%"
                filterUnits="objectBoundingBox"
            >
                <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                    stdDeviation="2"
                />
                <feColorMatrix
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0726890297 0"
                />
                <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <path
            fill={color}
            fillRule="evenodd"
            d="M12.64 1.231a1.004 1.004 0 0 0-1.407.128L7 6.438 2.767 1.359A1 1 0 1 0 1.232 2.64l5 6a1 1 0 0 0 1.535 0l5-6a1.001 1.001 0 0 0-.126-1.409z"
            filter="url(#a)"
            transform="translate(3 -1)"
        />
    </svg>
);

export default ArrowDown;
