import React from 'react';

import './style.scss';
import placeholderAvatar1 from '../../static/placeholderAvatar1.png';
import placeholderAvatar2 from '../../static/placeholderAvatar2.png';

/**
 * Side section event
 * @param {object} props - component props;
 * @param {object} props.item - Event item data.
 */
const Event = ({ item }) => {
    return (
        <div
            className="event-container"
            style={{ backgroundColor: item.backgroundColor, borderLeftColor: item.borderColor }}
        >
            <div className="event-container__title">
                {item.title}
            </div>
            <div className="event-container__time">
                {item.time}
            </div>
            <div className="event-container__description">
                {item.description}
            </div>
            <div className="event-container__avatars">
                <img src={placeholderAvatar1} className="avatar" alt="Аватар"/>
                <img src={placeholderAvatar2} className="avatar" alt="Аватар"/>
            </div>
        </div>
    );
};

export default Event;
