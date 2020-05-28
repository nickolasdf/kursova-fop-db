import React from 'react';

import './style.scss';

/**
 * Even label component
 * @param {object} props - component props.
 * @param {object} props.item - Separate event label item.
 */
const EventLabel = ({ item }) => {
    return (
        <span style={{ backgroundColor: item.backgroundColor, color: item.fontColor }}>
            {item.label}
        </span>
    );
};

export default EventLabel;
