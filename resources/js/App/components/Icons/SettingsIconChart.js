import React from "react";

const SettingsIconChart = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 8"
    >
        <defs>
            <filter
                id="a"
                width="108.4%"
                height="110%"
                x="-4.2%"
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
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0708861451 0"
                />
                <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g
            fill="#000"
            fillRule="evenodd"
            filter="url(#a)"
            transform="translate(-190 -23)"
        >
            <path
                fillRule="nonzero"
                d="M208.017 33.245A2.212 2.212 0 0 0 210 31a2.212 2.212 0 0 0-1.982-2.245.263.263 0 0 1-.176-.422 2.21 2.21 0 0 0-.186-2.99 2.21 2.21 0 0 0-2.989-.185.259.259 0 0 1-.262.035.25.25 0 0 1-.16-.21A2.212 2.212 0 0 0 202 23a2.212 2.212 0 0 0-2.245 1.982.25.25 0 0 1-.16.211.246.246 0 0 1-.262-.035 2.21 2.21 0 0 0-2.989.186 2.21 2.21 0 0 0-.186 2.989.263.263 0 0 1-.175.422A2.212 2.212 0 0 0 194 31a2.212 2.212 0 0 0 1.982 2.245.263.263 0 0 1 .176.422 2.21 2.21 0 0 0 .186 2.99 2.21 2.21 0 0 0 2.989.185.263.263 0 0 1 .422.175A2.212 2.212 0 0 0 202 39a2.212 2.212 0 0 0 2.245-1.982.25.25 0 0 1 .16-.211.258.258 0 0 1 .262.035 2.262 2.262 0 0 0 3.175-3.175.263.263 0 0 1 .174-.422zm-.246-1.984a2.262 2.262 0 0 0-1.507 3.634.262.262 0 0 1-.369.369 2.262 2.262 0 0 0-3.634 1.506.263.263 0 0 1-.522 0 2.237 2.237 0 0 0-1.379-1.811 2.245 2.245 0 0 0-2.256.304.228.228 0 0 1-.347-.021.23.23 0 0 1-.021-.347 2.262 2.262 0 0 0-1.506-3.634.263.263 0 0 1 0-.522 2.262 2.262 0 0 0 1.506-3.635.23.23 0 0 1 .022-.346.23.23 0 0 1 .346-.022 2.262 2.262 0 0 0 3.635-1.506.263.263 0 0 1 .522 0 2.262 2.262 0 0 0 3.634 1.507.23.23 0 0 1 .347.021.23.23 0 0 1 .022.347 2.262 2.262 0 0 0 1.506 3.635.263.263 0 0 1 0 .521z"
            />
            <path d="M202 29a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </g>
    </svg>
);

export default SettingsIconChart;
