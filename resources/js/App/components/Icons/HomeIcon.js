import React, { memo } from "react";

const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
    >
        <path
            fill="#000"
            fillRule="nonzero"
            d="M15.581 5.186l-7-5a1 1 0 0 0-1.162 0l-7 5A1 1 0 0 0 0 6v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-.419-.814zM7 14v-4h2v4H7zm7 0h-3V9a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v5H2V6.514l6-4.286 6 4.287V14z"
        />
    </svg>
);

export default memo(HomeIcon);
