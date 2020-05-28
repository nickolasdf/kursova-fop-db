import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './style.scss';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

const CustomEvent = item => {
    return (
        <div
            style={{
                color: item.event.textColor,
                padding: '2px 6px',
                borderLeftStyle: 'solid',
                borderRadius: '4px',
                borderLeftColor: item.event.textColor,
                backgroundColor: item.event.backgroundColor
            }}
        >{item.title}</div>
    );
};

/**
 * CalendarIcon section component with styling
 * @param {object} props - component props;
 * @param {array} props.events - Array of calendar events.
 */
const CalendarSection = ({ events }) => {
    const [date, dateHandler] = useState(new Date());

    // Adds or subtracts a date
    const dateChange = type => {
        if (type === 'subtract') {
            dateHandler(moment(date).add(1, 'M').toDate());
        } else {
            dateHandler(moment(date).subtract(1, 'M').toDate());
        }
    };

    // Get month name and uppercase first label
    const monthLabel = () => {
        const label = moment(date).locale('ru').format('MMMM');
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    return (
        <>
            <div className="calendar__calendar-section">
                <div className="calendar__calendar-header">
                    <ArrowBackIosIcon
                        style={{ fontSize: 14 }}
                        onClick={() => dateChange('subtract')}
                    />
                    <h4>{monthLabel()}</h4>
                    <ArrowForwardIosIcon
                        style={{ fontSize: 14 }}
                        onClick={() => dateChange('add')}
                    />
                </div>
                <BigCalendar
                    popup
                    selectable
                    localizer={localizer}
                    events={events}
                    date={date}
                    defaultView={Views.MONTH}
                    defaultDate={new Date()}
                    onSelectEvent={event => console.log('Clicked event:', event)}
                    onSelectSlot={null}
                    startAccessor="start"
                    endAccessor="end"
                    views={{ month: true }}
                    toolbar={false}
                    components={{ event: CustomEvent }}
                    culture="ru"
                />
            </div>
        </>
    );
};

export default CalendarSection;
