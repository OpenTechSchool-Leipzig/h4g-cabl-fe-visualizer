import {Chart, registerables} from 'chart.js';

import {html, LitElement, property, TemplateResult} from 'lit-element';

/**
 * Base Chart of chartjs-web-components
 */
export default class BaseChart extends LitElement {
    // @ts-ignore
    public chart: Chart.ChartConfiguration & Chart;
    @property()
    // @ts-ignore
    public type: Chart.ChartType; // tslint:disable-line:no-reserved-keywords
    @property(
        {
            // @ts-ignore
            hasChanged(newVal: Chart.ChartData, oldVal: Chart.ChartData) {
                return true;
            }
        }
    )
    // @ts-ignore
    public data: Chart.ChartData;

    @property()
    // @ts-ignore
    public options: Chart.ChartOptions;

    /**
     * Called when the dom first time updated. init chart.js data, add observe, and add resize listener
     */
    public firstUpdated(): void {
        const data = this.data || {};
        const options = this.options || {};
        if (!this.chart) {
            Chart.register(...registerables);
            // @ts-ignore
            const ctx: CanvasRenderingContext2D = this.shadowRoot
                .querySelector('canvas')
                .getContext('2d');
            this.chart = new Chart(ctx, {
                type: this.type,
                data,
                options
            });
        } else {
            this.chart.type = this.type;
            this.chart.data = data;
            this.chart.options = options;
            this.chart.update();
        }
        this.chart.data = this.observe(this.chart.data);
        for (const prop of Object.keys(this.chart.data)) {
            this.chart.data[prop] = this.observe(this.chart.data[prop]);
        }
        // @ts-ignore
        this.chart.data.datasets = this.chart.data.datasets.map((dataset: Chart.ChartDataSets) => {
            dataset.data = this.observe(dataset.data);

            return this.observe(dataset);
        });
        window.addEventListener('resize', () => {
            if (this.chart) {
                this.chart.resize();
            }
        });
    }

    performUpdate() {
        super.performUpdate()
        this.updateChart()
    }

    /**
     * Use Proxy to watch object props change
     * @params obj
     */
    public observe<T extends object>(obj: T): T {
        const updateChart: () => void = this.updateChart;

        return new Proxy(obj, {
            set: (target: T, prop: string, val: unknown): boolean => {
                // @ts-ignore
                target[prop] = val;
                Promise.resolve()
                    .then(updateChart);

                return true;
            }
        });
    }

    /**
     * Use lit-html render Elements
     */
    public render(): void | TemplateResult {
        return html`
            <style>
                .chart-size {
                    position: relative;
                }

                canvas {
                    width: 400px;
                    height: 400px;
                }
            </style>
            <div class="chart-size">
                <canvas></canvas>
            </div>
        `;
    }

    /**
     * Manually update chart
     */
    public updateChart = (): void => {
        const data = this.data || {};
        const options = this.options || {};

        if (this.chart) {
            this.chart.data = data;
            this.chart.options = options;
            this.chart.update();
        }
    }
}

window.customElements.define('base-chart', BaseChart);