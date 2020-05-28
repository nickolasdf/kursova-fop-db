import React from "react";

const ArrowRight = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
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
            fill="#000"
            fillRule="evenodd"
            d="M8.64 6.231l-6-5a1 1 0 0 0-1.28 1.537L6.437 7l-5.079 4.232a1 1 0 0 0 1.281 1.537l6-5a1.002 1.002 0 0 0 0-1.538z"
            filter="url(#a)"
            transform="translate(3 -1)"
        />
    </svg>
);

export default ArrowRight;
