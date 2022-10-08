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

    public selected: FieldNames = this.selectOptions[0];
    public endDate?: Date
    public startDate?: Date

    public render() {
        const {type, options} = this;
        const data = this.prepareData();
        return html`
            <div>
                <input type="date" @change="${this.onChangeStart}">
                <input type="date" @change="${this.onChangeEnd}">
                <select @change="${this.onChange}">
                    ${this.selectOptions.map(
                            option => html`
                                <option value="${option}" ?selected=${this.selected === option}>${option}</option>
                            `
                    )}
                </select>
            </div>
            <base-chart type="${type}" .data="${data}" .options="${options}"></base-chart>
        `;
    }

    private onChange(e: any) {
        this.selected = e.currentTarget.value
        this.requestUpdate()
    }

    private onChangeStart(e: any) {
        this.startDate = new Date(e.currentTarget.value)
        this.requestUpdate()
    }

    private onChangeEnd(e: any) {
        this.endDate = new Date(e.currentTarget.value)
        this.requestUpdate()
    }


    private prepareData() {
        const dataset = groupBy(this.selected, exampleData as unknown as Record<FieldNames, string>[], this.startDate, this.endDate)
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