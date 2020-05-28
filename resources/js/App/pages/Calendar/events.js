const now = new Date();

// Mock data
export default [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2020, 3, 0),
        end: new Date(2020, 3, 1),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2020, 3, 7),
        end: new Date(2020, 3, 10),
        textColor: '#3E6EA8',
        backgroundColor: 'rgba(62, 110, 168, 0.05)'
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
        textColor: '#FFB342',
        backgroundColor: 'rgba(255, 179, 66, 0.05)'

    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2020, 3, 9, 0, 0, 0),
        end: new Date(2020, 3, 10, 0, 0, 0),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2020, 3, 11),
        end: new Date(2020, 3, 13),
        desc: 'Big conference for important people',
        textColor: '#3E6EA8',
        backgroundColor: 'rgba(62, 110, 168, 0.05)'
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2020, 3, 12, 10, 30, 0, 0),
        end: new Date(2020, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
        textColor: '#FFB342',
        backgroundColor: 'rgba(255, 179, 66, 0.05)'
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2020, 3, 12, 12, 0, 0, 0),
        end: new Date(2020, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2020, 3, 12, 14, 0, 0, 0),
        end: new Date(2020, 3, 12, 15, 0, 0, 0),
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2020, 3, 12, 17, 0, 0, 0),
        end: new Date(2020, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
        textColor: '#FFB342',
        backgroundColor: 'rgba(255, 179, 66, 0.05)'
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2020, 3, 12, 20, 0, 0, 0),
        end: new Date(2020, 3, 12, 21, 0, 0, 0),
        textColor: '#3E6EA8',
        backgroundColor: 'rgba(62, 110, 168, 0.05)'
    },
    {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2020, 3, 13, 7, 0, 0),
        end: new Date(2020, 3, 13, 10, 30, 0),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2020, 3, 17, 19, 30, 0),
        end: new Date(2020, 3, 18, 2, 0, 0),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2020, 3, 17, 19, 30, 0),
        end: new Date(2020, 3, 17, 23, 30, 0),
        textColor: '#3E6EA8',
        backgroundColor: 'rgba(62, 110, 168, 0.05)'
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2020, 3, 20, 19, 30, 0),
        end: new Date(2020, 3, 22, 2, 0, 0),
        textColor: '#FFB342',
        backgroundColor: 'rgba(255, 179, 66, 0.05)'
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
        textColor: '#FFB342',
        backgroundColor: 'rgba(255, 179, 66, 0.05)'
    },
    {
        id: 15,
        title: 'Point in Time Event',
        start: now,
        end: now,
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 16,
        title: 'Video Record',
        start: new Date(2020, 3, 14, 15, 30, 0),
        end: new Date(2020, 3, 14, 19, 0, 0),
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 17,
        title: 'Dutch Song Producing',
        start: new Date(2020, 3, 14, 16, 30, 0),
        end: new Date(2020, 3, 14, 20, 0, 0),
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 18,
        title: 'Itaewon Halloween Meeting',
        start: new Date(2020, 3, 14, 16, 30, 0),
        end: new Date(2020, 3, 14, 17, 30, 0),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 19,
        title: 'Online Coding Test',
        start: new Date(2020, 3, 14, 17, 30, 0),
        end: new Date(2020, 3, 14, 20, 30, 0),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 20,
        title: 'An overlapped Event',
        start: new Date(2020, 3, 14, 17, 0, 0),
        end: new Date(2020, 3, 14, 18, 30, 0),
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 21,
        title: 'Phone Interview',
        start: new Date(2020, 3, 14, 17, 0, 0),
        end: new Date(2020, 3, 14, 18, 30, 0),
        textColor: '#2CBD14',
        backgroundColor: 'rgba(44, 189, 20, 0.05)'
    },
    {
        id: 22,
        title: 'Cooking Class',
        start: new Date(2020, 3, 14, 17, 30, 0),
        end: new Date(2020, 3, 14, 19, 0, 0),
        textColor: '#FF2E00',
        backgroundColor: 'rgba(255, 46, 0, 0.05)'
    },
    {
        id: 23,
        title: 'Go to the gym',
        start: new Date(2020, 3, 14, 18, 30, 0),
        end: new Date(2020, 3, 14, 20, 0, 0),
        textColor: '#3E6EA8',
        backgroundColor: 'rgba(62, 110, 168, 0.05)'
    }
];
