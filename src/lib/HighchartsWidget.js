import { Widget } from '@bryntum/calendar';
import Highcharts from 'highcharts';

// Import Highcharts modules as needed
import 'highcharts/modules/exporting.js';
import 'highcharts/modules/export-data.js';
import 'highcharts/modules/accessibility.js';

export default class HighchartsWidget extends Widget {
    static $name = 'Chart';
    static type = 'chart';

    static configurable = {
        chartOptions : null
    };

    compose() {
        return {
            class    : 'b-chart',
            style    : 'width:100%;height:100%;',
            children : {
                chartElement : {
                    tag   : 'div',
                    class : 'b-highcharts-container',
                    style : 'width:100%;height:100%;'
                }
            }
        };
    }

    renderChart() {
        if (!this.chartElement) {
            return;
        }

        const options = this._chartOptions || this.chartOptions || {};
        this.chart = Highcharts.chart(this.chartElement, options);
    }

    changeChartOptions(options) {
        this._chartOptions = Highcharts.merge(
            this._chartOptions || {},
            options || {}
        );
        if (this.chart) {
            this.chart.update(options, true, true);
        }
        else {
            this.renderChart();
        }
    }

    doDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        super.doDestroy();
    }
}

HighchartsWidget.initClass();
