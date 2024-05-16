import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

// This widget is showing that we have tasklist which including todoTask and doingTask,
// and duedate based on different task,
// also the widget will automatically update accroding to the current date
class WeeklySummaryWidget extends LitElement {

    static styles = css`
        :host {
            display: block;
        }

        .tasklist {
            flex: 1;
        }

        .duedate {
            flex: 1;
        }
    `;

    static properties = {
        tasklist: {type: String},
        _task: {state: true},
        duedate: {type: Date},
        today: {type: Date},

    }
    
    
    constructor() {
        super();
        this.today = new Date().getDate();
        this.duedate = [];
        window.addEventListener('tasks', () => {
            this._loadData();
          });
    }
    

    render() {

        return html`
            <h3>Weekly Task Summary</h3>
            <p> Tasklist ${this.tasklist}
                Duedate ${this.duedate}
            </p>
        `;
    };
}

customElements.define('weekly-summary-widget', WeeklySummaryWidget);