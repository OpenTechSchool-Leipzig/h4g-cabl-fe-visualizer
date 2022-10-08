import {html, LitElement} from 'lit-element';
import './BaseChart';
import exampleData from '../data/example.json';

class MyDemo extends LitElement {

    // @ts-ignore
    public data;

    public options = {};
    public type = 'line';

    public render() {
        const {type, options} = this;
        const data = this.prepareData();
        return html`
            <base-chart type="${type}" .data="${data}" .options="${options}"></base-chart>
        `;
    }

    private prepareData() {
        if (this.data === undefined) {
            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: exampleData.map(it => it.Aufenthaltsstatus.length)
                }]
            }
        }
        return this.data
    }

}

window.customElements.define('my-demo', MyDemo);