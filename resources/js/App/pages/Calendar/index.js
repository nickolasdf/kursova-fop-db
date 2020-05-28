import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

import 'react-big-calendar/lib/sass/styles.scss';
import MainLayout from '../../components/MainLayout';
import '../../components/Calendar/style.scss';
import events from './events';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import CalendarSideSection from '../../components/Calendar/CalendarSideSection';
import CalendarSection from '../../components/Calendar/CalendarSection';
import AddEvent from '../../components/Calendar/AddEvent';

/**
 * CalendarIcon page
 */
const Calendar = () => {
    // Test data
    const [eventData, eventsDataHandler] = useState(events);
    const [eventModal, eventModalHandler] = useState(false);

    const openEventModal = () => {
        eventModalHandler(true);
    };

    const closeEventModal = () => {
        eventModalHandler(false);
    };

    const handleSelect = ({ start, end }) => {
        // Test function
        const title = window.prompt('New Event name');

        if (title) {
            eventsDataHandler({
                events: [
                    ...eventData,
                    { start, end, title }
                ]
            });
        }
    };

    return (
        <MainLayout>
            <div className="calendar">
                <CalendarHeader
                    openModal={openEventModal}
                />

                <div className="calendar__container">
                    <CalendarSideSection/>
                    <CalendarSection events={eventData}/>
                </div>
            </div>
            <Dialog
                open={eventModal}
                onClose={closeEventModal}
                maxWidth="lg"
            >
                <AddEvent
                    closeModal={closeEventModal}
                />
            </Dialog>
        </MainLayout>
    );
};

export default Calendar;


