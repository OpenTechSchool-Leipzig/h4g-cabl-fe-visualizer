import {html, LitElement} from 'lit-element';
import './BaseChart';
import groupBy, {FieldNames} from "../services/dataHelper";
import exampleData from "../data/example.json"

class MyDemo extends LitElement {

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

    public selectOptions: FieldNames[] = ["Wohnsituation",
        "Aufenthaltsstatus",
        "Krankenversicherungsschutz",
        "NotfallV",
        "MediVers",
        "Fachbereich"];

    // @ts-ignore
    public selected: FieldNames = this.selectOptions[0];

    public render() {
        const {type, options} = this;
        const data = this.prepareData();
        return html`
            <div><select @change="${this.onChange}">
                ${this.selectOptions.map(
                        option => html`
                            <option value="${option}" ?selected=${this.selected === option}>${option}</option>
                        `
                )}
            </select></div>
            <base-chart type="${type}" .data="${data}" .options="${options}"></base-chart>
        `;
    }

    private onChange(e: any) {
        this.selected = e.currentTarget.value
        this.requestUpdate()
    }

    private prepareData() {
        const dataset = groupBy(this.selected, exampleData)
        return {
            labels: Object.keys(dataset),
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataset
            }]
        }
    }

}

window.customElements.define('my-demo', MyDemo);