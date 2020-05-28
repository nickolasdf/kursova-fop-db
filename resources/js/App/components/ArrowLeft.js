import React from "react";

const ArrowLeft = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="2 0 14 14"
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
            d="M2.883 6.5l5.713-4.584A1.056 1.056 0 0 0 8.722.404 1.156 1.156 0 0 0 7.155.25L.405 5.667a1.07 1.07 0 0 0-.404.833c0 .322.148.626.404.833l6.75 5.416c.478.38 1.185.317 1.581-.142a1.057 1.057 0 0 0-.14-1.523L2.883 6.5z"
            filter="url(#a)"
            transform="translate(4)"
        />
    </svg>
);

export default ArrowLeft;
