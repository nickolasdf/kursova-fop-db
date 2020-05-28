import React from 'react';

import './style.scss';
import Button from '../custom/Button';

/**
 * Header component of the CalendarIcon page.
 * @param {object} props - component props.
 * @param {function} props.openModal - handler to open the add event modal.
 */
const CalendarHeader = ({ openModal }) => {
    return (
        <div className="calendar__header-container">
            <h2>Календарь</h2>
            <Button onClick={openModal}>Добавить событие</Button>
        </div>
    );
};

export default CalendarHeader;
