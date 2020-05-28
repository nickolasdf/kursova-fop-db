import React from 'react';

import eclipsePlaceholder from '../../../../static/eclipcePlaceholder.png';
import './index.scss';

/**
 * Renders user location with an icon
 * @param {object} props - component props.
 * @param {string} props.location - user location.
 */
const UserLocation = ({ location }) => {
    return (
        <div>
            {(location === 'Ровно') ?
                <img src={eclipsePlaceholder} alt="Logo" className="user__location-icon"/> :
                <img src={eclipsePlaceholder} alt="Logo" className="user__location-icon"/>
            }

            {location}
        </div>
    );
};

export default UserLocation;
