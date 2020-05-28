import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './index.scss';

/**
 * Blue inline buttton with "Add" icon.
 * @param {object} props - component props.
 * @param {string} props.label - button label.
 */
const InlineButton = ({label}) => {
    return (
        <div className="inline-button-container">
            <span>{label}</span>
            <AddCircleOutlineIcon style={{ fontSize: '20px' }}/>
        </div>
    );
};

export default InlineButton;
