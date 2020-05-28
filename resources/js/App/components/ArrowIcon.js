import React from "react";

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="10 2 15 17"
    >
        <defs>
            <filter
                id="a"
                width="157.8%"
                height="267.5%"
                x="-28.9%"
                y="-83.8%"
                filterUnits="objectBoundingBox"
            >
                <feOffset dy="7" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                    stdDeviation="5"
                />
                <feColorMatrix
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
                />
                <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <path
            fill="#131313"
            fillRule="nonzero"
            d="M12.142 6.22L7.628 1.707A1 1 0 0 1 9.043.293L15.97 7.22l-6.927 6.928a1 1 0 0 1-1.415-1.414l4.514-4.514H1a1 1 0 1 1 0-2h11.142z"
            filter="url(#a)"
            transform="translate(9 2.707)"
        />
    </svg>
);

export default ArrowIcon;
