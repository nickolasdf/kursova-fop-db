import React, { memo } from "react";

const BidsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="16"
        viewBox="0 0 14 16"
    >
        <g fill="#000" fillRule="evenodd">
            <path
                fillRule="nonzero"
                d="M13 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm-1 14H2V2h10v12z"
            />
            <path d="M5 6h4a1 1 0 1 0 0-2H5a1 1 0 1 0 0 2zM5 10h4a1 1 0 1 0 0-2H5a1 1 0 1 0 0 2z" />
        </g>
    </svg>
);

export default memo(BidsIcon);
