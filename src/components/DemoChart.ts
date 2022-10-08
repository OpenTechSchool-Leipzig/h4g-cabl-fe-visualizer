import {html, LitElement} from 'lit-element';
import './BaseChart';
import groupBy from "../services/dataHelper";
import exampleData from "../data/example.json"

class MyDemo extends LitElement {

    // @ts-ignore
    public data;

    public options = {
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90
                }
            }
        }
    };
    public type = 'bar';

    public render() {
        const {type, options} = this;
        const data = this.prepareData();
        return html`
            <base-chart type="${type}" .data="${data}" .options="${options}"></base-chart>
        `;
    }

    private prepareData() {
        if (this.data === undefined) {
            const dataset = groupBy("Aufenthaltsstatus", exampleData)
            this.data = {
                labels: Object.keys(dataset),
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: dataset
                }]
            }
        }
        return this.data
    }

}

window.customElements.define('my-demo', MyDemo);