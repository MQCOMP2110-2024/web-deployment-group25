import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class WeeklySummaryWidget extends LitElement {

    static styles = css`

    `;

    static properties = {
    
    }
    
    /*
    constructor() {

    }
    */

    render() {

    return html`
        <h3>Widget 3</h3>
        <p>WIP</p>
        `;
    };
}

customElements.define('weekly-summary-widget', WeeklySummaryWidget);