import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';


class CalendarWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      width: 100%;
      height: 100%;
    }

    .custom_calendar {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        padding-bottom: 20px; /* Add padding at the bottom */
        box-sizing: border-box; /* Include padding and border in the element's total width and height */
        overflow: hidden; /* Hide overflowing content */
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .header button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
        color: #007bff;
      }
      
      .custom_month {
        font-size: 18px;
        font-weight: bold;
      }
      
      .custom_days {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr)); /* Adjusted to use minmax to ensure flexibility */
        gap: 5px;
      }
      
      .custom_day {
        text-align: center;
        padding: 5px;
        width: calc(100% / 7); /* Equal width for all days */
        font-size: 12px;
      }
      
      
      .custom_current-day {
        background-color: #007bff;
        color: #fff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        line-height: 30px;
        font-size: 14px;
      }
      
      .custom_due-day {
        background-color: #ff0000;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        color: #fff;
        font-size: 12px;
      }
  `;


  static properties = {
    currentDate: { type: Date },
    _task: { state: true },
    today: { type: Number },
    dueDates: { type: Array },
  }

  constructor() {
    super();
    console.log('...........Calling constructor......');
    this.currentDate = new Date();
    this.today = new Date().getDate();
    this.dueDates = [];
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  render() {
    console.log('...........Calling render()......');
    if (this._task) {
      const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
      console.log('daysInMonth...>>', daysInMonth);

      const startDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
      console.log('startDay...>>', startDay);
      console.log('today...>>', this.today);
      console.log('Due dates in...render()...>>', this.dueDates);
      // const dueDates = [5,6,8, 10, 15,16,17]; // Fetch due date from server

      
      const todayMonth = new Date().getMonth();
      const currentMonth = this.currentDate.getMonth();
      if (todayMonth !== currentMonth) {
        this.today = -1;
      } else {
        this.today = new Date().getDate();
      }

      // Set the due dates
      const dueDates = this._task.map(task => {
        const date = new Date(task.due);
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
      });

      const currentMonthString = this.currentDate.toLocaleString('en-US', { month: 'short' });
      const filteredDueDates = dueDates.filter(date => {
        const [month] = date.split(' ');
        return month === currentMonthString;
      });

      this.dueDates = filteredDueDates.map(date => parseInt(date.split(' ')[1], 10));
      

      return html`
        <div class="custom_calendar">
          <div class="header">
            <button @click="${this.showPrevMonth}">&lt;</button>
            <div class="custom_month">${this.getMonthNameUsingIndex(this.currentDate.getMonth())} ${this.currentDate.getFullYear()}</div>
            <button @click="${this.showNextMonth}">&gt;</button>
          </div>
          <div class="custom_days">
            ${this.showWeekdays()}
            ${this.calculateAndShowDays(daysInMonth, startDay, this.today, this.dueDates)}
          </div>
        </div>
      `;

    } else {
      return html`<div>Loading...</div>`;
    }

  }

  getMonthNameUsingIndex(index) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[(index)];
  }

  showWeekdays() {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays.map(weekday => html`<div class="custom_day">${weekday}</div>`);
  }

  calculateAndShowDays(daysInMonth, startDay, today, dueDates) {
    let days = [];
    for (let i = 1; i <= daysInMonth + startDay; i++) {
      if (i > startDay) {
        const day = i - startDay;
        let isToday;
        if (day === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        let isDueDay = false;
        for (let i = 0; i < dueDates.length; i++) {
          if (dueDates[i] === day) {
            isDueDay = true;
            break;
          }
        }

        days.push(html`<div class="custom_day ${isToday ? 'custom_current-day' : ''} ${isDueDay ? 'custom_due-day' : ''}">${day}</div>`);
      } else {
        days.push(html`<div class="custom_day"></div>`);
      }
    }
    return days;
  }


  showPrevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);

    // Check the month of today and the month of the current date
    const todayMonth = new Date().getMonth();
    console.log('...........todayMonth......', todayMonth);

    const currentMonth = this.currentDate.getMonth();
    console.log('...........currentMonth......', currentMonth);

    // 1. If the month of today is not equal to the month of the current date, set today to -1
    // 2. If the month of today is equal to the month of the current date, set today to the current date
    if (todayMonth !== currentMonth) {
      this.today = -1;
    } else {
      this.today = new Date().getDate();
    }
    // Set the due dates
    const dueDates = this._task.map(task => {
      const date = new Date(task.due);
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    });
    console.log('Due dates in...Prev...>>', dueDates);

    // Compare each due date in the array with the current month
    const currentMonthString = this.currentDate.toLocaleString('en-US', { month: 'short' });
    const filteredDueDates = dueDates.filter(date => {
      const [month] = date.split(' ');
      return month === currentMonthString;
    });

    // If the due dates are not in the current month, set the due dates to an empty array
    // If the due dates are in the current month, set the due dates array to those values only  
    this.dueDates = filteredDueDates.map(date => parseInt(date.split(' ')[1], 10));

    console.log('...........Due Dates in prev month......', this.dueDates);
    this.requestUpdate();
  }

  showNextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    console.log('...........TODAY......', this.today);
    console.log('...........NextMonth......', this.currentDate.getDate());

    // Check the month of today and the month of the current date
    const todayMonth = new Date().getMonth();
    console.log('...........todayMonth......', todayMonth);

    const currentMonth = this.currentDate.getMonth();
    console.log('...........currentMonth......', currentMonth);

    // 1. If the month of today is not equal to the month of the current date, set today to -1
    // 2. If the month of today is equal to the month of the current date, set today to the current date
    if (todayMonth !== currentMonth) {
      this.today = -1;
    } else {
      this.today = new Date().getDate();
    }

    // Set the due dates
    const dueDates = this._task.map(task => {
      const date = new Date(task.due);
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    });
    console.log('Due dates in...render()...>>', dueDates);

    // Compare each due date in the array with the current month
    const currentMonthString = this.currentDate.toLocaleString('en-US', { month: 'short' });
    const filteredDueDates = dueDates.filter(date => {
      const [month] = date.split(' ');
      return month === currentMonthString;
    });

    // If the due dates are not in the current month, set the due dates to an empty array
    // If the due dates are in the current month, set the due dates array to those values only
    // this.dueDates = filteredDueDates;
    this.dueDates = filteredDueDates.map(date => parseInt(date.split(' ')[1], 10));
    console.log('...........Due Dates in next month......', this.dueDates);


    this.requestUpdate();
  }


  connectedCallback() {
    super.connectedCallback();
    console.log('...........Calling connectedCallback......');

  }


  _loadData() {
    this._task = [...TaskModel.getTasks('Doing')];
    console.log('Tasks in...Calendar-widget...>>', this._task);
    this.dueDates = this._task.map(task => new Date(task.due).getDate());
    this.render();
  }
}

customElements.define('calendar-widget', CalendarWidget);
