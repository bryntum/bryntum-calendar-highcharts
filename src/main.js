import { Calendar } from '@bryntum/calendar';
import './style.css';

const calendar = new Calendar({

    appendTo : 'app',
    date     : new Date(2026, 5, 7),

    resources : [
        {
            id         : 1,
            name       : 'New York Team',
            eventColor : 'blue'
        },
        {
            id         : 2,
            name       : 'Tokyo Hub',
            eventColor : 'green'
        },
        {
            id         : 3,
            name       : 'Paris Office',
            eventColor : 'orange'
        },
        {
            id         : 4,
            name       : 'Sydney Crew',
            eventColor : 'red'
        }
    ],

    events : [
        {
            id         : 1,
            name       : 'Kickoff Strategy Meeting',
            startDate  : '2026-06-08T09:00:00',
            endDate    : '2026-06-08T12:30:00',
            resourceId : 1
        },
        {
            id         : 2,
            name       : 'Client Review Call',
            startDate  : '2026-06-09T14:00:00',
            endDate    : '2026-06-09T17:00:00',
            resourceId : 1
        },
        {
            id         : 3,
            name       : 'Design Workshop',
            startDate  : '2026-06-10T10:00:00',
            endDate    : '2026-06-10T15:00:00',
            resourceId : 1
        },
        {
            id         : 4,
            name       : 'Project Planning',
            startDate  : '2026-06-08T13:00:00',
            endDate    : '2026-06-08T16:30:00',
            resourceId : 2
        },
        {
            id         : 5,
            name       : 'Sprint Retrospective',
            startDate  : '2026-06-09T15:00:00',
            endDate    : '2026-06-09T19:00:00',
            resourceId : 2
        },
        {
            id         : 6,
            name       : 'Innovation Lab Session',
            startDate  : '2026-06-11T16:00:00',
            endDate    : '2026-06-11T19:30:00',
            resourceId : 2
        },
        {
            id         : 7,
            name       : 'UX/UI Review',
            startDate  : '2026-06-09T08:30:00',
            endDate    : '2026-06-09T11:00:00',
            resourceId : 3
        },
        {
            id         : 8,
            name       : 'Marketing Sync',
            startDate  : '2026-06-10T08:00:00',
            endDate    : '2026-06-10T11:00:00',
            resourceId : 3
        },
        {
            id         : 9,
            name       : 'Team Building Lunch',
            startDate  : '2026-06-12T11:30:00',
            endDate    : '2026-06-12T15:00:00',
            resourceId : 3
        },
        {
            id         : 10,
            name       : 'Daily Standup',
            startDate  : '2026-06-08T09:00:00',
            endDate    : '2026-06-08T12:30:00',
            resourceId : 4
        },
        {
            id         : 11,
            name       : 'Product Demo',
            startDate  : '2026-06-10T16:00:00',
            endDate    : '2026-06-10T20:00:00',
            resourceId : 4
        },
        {
            id         : 12,
            name       : 'Customer Feedback Session',
            startDate  : '2026-06-11T11:00:00',
            endDate    : '2026-06-11T15:30:00',
            resourceId : 4
        },
        {
            id         : 13,
            name       : 'End of Sprint Wrap-up',
            startDate  : '2026-06-12T12:00:00',
            endDate    : '2026-06-12T15:00:00',
            resourceId : 4
        },
        {
            id         : 100,
            name       : 'Hackathon 2026',
            startDate  : '2026-06-08T00:00:00',
            endDate    : '2026-06-15T00:00:00',
            allDay     : true,
            resourceId : 1,
            eventColor : 'purple'
        },
        {
            id         : 101,
            name       : 'Innovation Day',
            startDate  : '2026-06-08T00:00:00',
            endDate    : '2026-06-09T00:00:00',
            allDay     : true,
            resourceId : 2
        },
        {
            id         : 102,
            name       : 'Wellness Retreat',
            startDate  : '2026-06-10T00:00:00',
            endDate    : '2026-06-11T00:00:00',
            allDay     : true,
            resourceId : 3
        },
        {
            id         : 103,
            name       : 'Tech Expo Visit',
            startDate  : '2026-06-11T00:00:00',
            endDate    : '2026-06-12T00:00:00',
            allDay     : true,
            resourceId : 4
        },
        {
            id         : 104,
            name       : 'Team Celebration',
            startDate  : '2026-06-13T00:00:00',
            endDate    : '2026-06-14T00:00:00',
            allDay     : true,
            resourceId : 1
        }
    ]
});
