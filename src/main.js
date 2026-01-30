import { DateHelper, Container, Splitter } from '@bryntum/calendar';
import Highcharts from 'highcharts';
import './lib/HighchartsWidget.js';
import './style.css';

const updateChart = filteredResources => {
    const
        { datasetButtons, chart, calendar }       = container.widgetMap,
        { resourceStore, eventStore, activeView } = calendar,
        { startDate, endDate }                    = activeView,
        days                                      = DateHelper.diff(startDate, endDate, 'day'),
        datasetName                               = datasetButtons.value;

    let data,
        chartTitle,
        accessibilityDescription,
        tooltipFormatter;

    switch (datasetName) {
        case 'perResource':
            chartTitle = 'Events per resource';
            accessibilityDescription =
                'Column chart showing the number of events per resource for the current calendar view.';

                tooltipFormatter = function() {
    const imagePath = container.resourceImagePath + this.point.category.toLowerCase() + '.png';
    const events = this.point.events || [];
    const totalMinutes = events.reduce((sum, e) =>
        sum + DateHelper.diff(e.startDate, e.endDate, 'minutes'), 0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const timeDisplay = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;

    const totalEvents = eventStore.getEvents({ startDate, endDate }).length;

    const eventList = events.slice(0, 3).map(e =>
        `<li style="margin: 2px 0">${e.name} <span style="color: var(--b-neutral-40)">(${DateHelper.format(e.startDate, 'MMM D')})</span></li>`
    ).join('');

    return `<div class="b-resource-info">
        <img class="b-resource-avatar b-resource-image" style="background-color:${this.point.color}" src="${imagePath}"></img>
        <div>
            <b>${this.point.category}</b><br/>
            ${this.series.name}: <b>${this.point.y}</b> <span style="color: var(--b-neutral-40)">of ${totalEvents}</span><br/>
            <span style="color: var(--b-neutral-30)">Total hours: ${timeDisplay}</span><br/>
            ${events.length > 0 ? `<ul style="margin: 5px 0; padding-left: 20px; font-size: 0.9em">${eventList}</ul>` : ''}
            ${events.length > 3 ? `<i style="color: var(--b-neutral-40); font-size: 0.85em">...and ${events.length - 3} more</i>` : ''}
        </div>
    </div>`;
};


            // Count events per resource and store event references for tooltips
            data = (filteredResources || resourceStore.records)
                .map(resource => {
                    const resourceEvents = resource.events.filter(
                        event => event.startDate >= startDate && event.startDate <= endDate
                    );
                    return {
                        label  : resource.name,
                        value  : resourceEvents.length,
                        color  : resource.barColor,
                        events : resourceEvents
                    };
                })
                .sort((a, b) => a.label.localeCompare(b.label));
            break;

        case 'perDay':
            chartTitle = 'Events per day';
            accessibilityDescription = 'Column chart showing the number of events per day for the current calendar view.';

            tooltipFormatter = function() {
    const fullDayName = this.point.fullDayName || this.point.category;
    const dayEvents = this.point.dayEvents || [];
    const uniqueResources = new Set(dayEvents.map(e => e.resourceId).filter(Boolean));

    let timeRange = '';
    if (dayEvents.length > 0) {
        const earliest = new Date(Math.min(...dayEvents.map(e => e.startDate)));
        const latest = new Date(Math.max(...dayEvents.map(e => e.endDate)));
        timeRange = `<span style="color: var(--b-neutral-30)">${DateHelper.format(earliest, 'HH:mm')} - ${DateHelper.format(latest, 'HH:mm')}</span>`;
    }

    const eventList = dayEvents.slice(0, 3).map(e =>
        `<li style="margin: 2px 0">${e.name}</li>`
    ).join('');

    return `<div>
        <b>${fullDayName}</b><br/>
        ${this.series.name}: <b>${this.point.y}</b><br/>
        ${uniqueResources.size > 0 ? `<span style="color: var(--b-neutral-30)">${uniqueResources.size} resource${uniqueResources.size > 1 ? 's' : ''}</span><br/>` : ''}
        ${timeRange ? `${timeRange}<br/>` : ''}
        ${dayEvents.length > 0 ? `<ul style="margin: 5px 0; padding-left: 20px; font-size: 0.9em">${eventList}</ul>` : ''}
        ${dayEvents.length > 3 ? `<i style="color: var(--b-neutral-40); font-size: 0.85em">...and ${dayEvents.length - 3} more</i>` : ''}
    </div>`;
};

            data = [];
            for (let i = 0; i < days; i++) {
                const from = DateHelper.add(startDate, i, 'day'),
                    to   = DateHelper.add(from, 1, 'day');
                const dayEvents = eventStore.getEvents({
                    startDate : from,
                    endDate   : to
                });

                data.push({
                    label :
                        DateHelper.format(from, 'ddd') +
                        (activeView.isMonthView ? ' ' + DateHelper.format(from, ' D') : ''),
                    value : dayEvents.length,
                    color : '#a3eea3',
                    fullDayName :
                        DateHelper.format(from, 'dddd') +
                        (activeView.isMonthView ? ' ' + DateHelper.format(from, 'D') : ''),
                    dayEvents : dayEvents
                });
            }
            break;
    }

    const
        categories = data.map(d => d.label),
        seriesData = data.map(d => ({
            y           : d.value,
            color       : d.color,
            fullDayName : d.fullDayName,
            events      : d.events,
            dayEvents   : d.dayEvents
        }));

    chart.chartOptions = {
        title : {
            text : chartTitle
        },
        xAxis : {
            categories
        },
        tooltip : {
            formatter : tooltipFormatter
        },
        series : [{
            data : seriesData
        }],
        accessibility : {
            description : accessibilityDescription
        }
    };
};

const container = new Container({
    appendTo : 'app',
    cls      : 'outer-container',
    flex     : 1,
    layout   : {
        type : 'hbox'
    },
    resourceImagePath : '/users/',
    items : {
        calendar : {
    type    : 'calendar',
    date    : '2026-06-02',
    flex    : 2.5,
    sidebar : {
        collapsed      : true,
        resourceFilter : {
            filterResources : true,
            onChange        : ({ value }) => {
                updateChart(value);
            }
        }
    },
    crudManager : {
        loadUrl       : 'data/data.json',
        autoLoad      : true,
        resourceStore : {
            fields : ['barColor']
        },
        listeners : {
            load() {
                updateChart();
            },
            hasChanges() {
                updateChart();
            }
        }
    },
    modes : {
        year   : false,
        agenda : false
    },
    hideNonWorkingDays : true,
    listeners          : {
        dateChange({ source }) {
            source.eventStore.count && updateChart();
        }
    }
},
chartPanel : {
            type     : 'panel',
            flex     : 1,
            minWidth : 400,
            layout   : 'fit',
            items    : {
                chart : {
                    type         : 'chart',
                    chartOptions : {
                        chart : {
                            type  : 'column',
                            style : {
                                fontFamily : 'inherit'
                            }
                        },
                        legend : {
                            enabled : false
                        },
                        yAxis : {
                            title : {
                                text : ''
                            }
                        },
                        tooltip : {
                            useHTML : true
                        },
                        plotOptions : {
                            column : {
                                borderWidth  : 2,
                                borderColor  : 'transparent',
                                borderRadius : 5,
                                animation    : {
                                    duration : 500
                                }
                            }
                        },
                        series : [{ name : 'Events' }]
                    }
                }
            },
            tbar : {
                items : {
                    datasetButtons : {
                        type        : 'buttongroup',
                        toggleGroup : true,
                        rendition   : 'padded',
                        items       : {
                            perDay      : { text : 'Events per day', value : 'perDay' },
                            perResource : {
                                text    : 'Events per resource',
                                value   : 'perResource',
                                pressed : true
                            }
                        },
                        onToggle({ pressed }) {
                            if (pressed) {
                                updateChart();
                            }
                        }
                    }
                }
            }
        }
    },

});