import React from 'react';

import './style.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventLabel from './EventLabel';
import { EVENTS_MOCK, LABELS } from './mock';
import Event from './Event';

const CalendarSideSection = () => {

    // Render event labels
    const renderLabels = () => {
        return LABELS.map(item => <EventLabel
            item={item}
            key={item.label}
        />);
    };

    // Render side section with events
    const renderEvents = () => {
        return EVENTS_MOCK.map(item => <Event
            item={item}
            key={item.time}
        />);
    };

    return (
        <div className="calendar__side-section">
            <div className="calendar__side-section-header">
                <h5>Понедельник 23 марта </h5>
                <div className="calendar__side-section__switches-container">
                    <ArrowBackIosIcon style={{ fontSize: 12 }}/>
                    <ArrowForwardIosIcon style={{ fontSize: 12 }}/>
                </div>
            </div>

            <div className="calendar__side-section-labels">
                {renderLabels()}
            </div>

            <div className="calendar__events-container">
                {renderEvents()}
            </div>
        </div>
    );
};

export default CalendarSideSection;
