import React from 'react';

const ColorItem = ({ color = '0, 0, 0', size = 24, styles }) => {
    return (
        <div
            style={{
                backgroundColor: `hsl(${color})`,
                height: size,
                width: size,
                borderRadius: '100%',
                ...styles
            }}
        >

        </div>
    );
};

export default ColorItem;
