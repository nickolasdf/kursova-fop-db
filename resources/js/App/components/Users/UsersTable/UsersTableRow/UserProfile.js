import React from 'react';

import eclipsePlaceholder from '../../../../static/eclipcePlaceholder.png';
import './index.scss';

/**
 * Component to display user avatar and name
 * @param {object} props - component props.
 * @param {string} props.name - user name.
 * @param {string} props.image - user avatar.
 */
const UserProfile = ({ name, image }) => {
    return (
        <div>
            {/* Placeholder or user avatar */}
            {image ? <img src={eclipsePlaceholder} alt="Logo" className="user__location-icon"/> :
                <img src={eclipsePlaceholder} alt="Logo" className="user__location-icon"/>}

            {name}
        </div>
    );
};

export default UserProfile;
