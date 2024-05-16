import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


/**
 * WidgetBlock <widget-block header="Sample Widget">
 * Base example for a widget, used as a placeholder in design for unimplemented
 * widgets
 */
class WidgetBlock extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        border: 1px solid black;
    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    /** Modified by RAHMAN: 07/04 */
    let content;
    if (this.header === 'Widget 4') {
      content = html`<calendar-widget></calendar-widget>`;
    } else if (this.header === 'Widget 3'){
      content = html`<weekly-summary-widget></weekly-summary-widget>`;
    } else if(this.header === 'Widget 2'){
      content = html`<timer-widget></timer-widget>`;
    } else if(this.header === 'Widget 1'){
      content = html`<task-summary-widget></task-summary-widget>`;
    }
    return content;
  }
  
}

customElements.define('widget-block', WidgetBlock);
