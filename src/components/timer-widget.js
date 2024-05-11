import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

class TimerWidget extends LitElement {
    static styles = css`
        input {
            display: block;
            margin-left: 50px;
        }

        p {
            border: solid 2px black;
        }
    `;

    static properties = {
        hrs: {type: Number},
        mins: {type: Number},
        secs: {type: Number},
        total: {type: Number},
        currInterval: {type: Text},
    }
    
    constructor() {
        super();
        this.hrs = 0;
        this.mins = 0;
        this.secs = 0;
    }

    timer(){
        var that = this;
        clearInterval(this.interval);
        var interval = setInterval(function() {
                that.hrs = Math.floor(that.total/3600);
                that.mins = Math.floor((that.total%3600)/60);
                that.secs = Math.floor((that.total - that.hrs*3600 - that.mins*60));
                
                if(that.mins < 10){that.mins = "0" + that.mins};
                if(that.secs < 10){that.secs = "0" + that.secs};
                
                that.total = that.total - 1;

                if(that.total < 0){
                    clearInterval(interval);
                }
        }, 1000);
        this.currInterval = interval;
    }


    startTimer(event) {
        event.preventDefault();
        this.hrs = event.target.hrs.value;
        this.mins = event.target.mins.value;
        this.total = this.hrs*3600 + this.mins*60;

        this.timer();
    }
    
    render() {
    
    return html`
        <h3>Timer</h3>
        <form id="input-form" @submit=${this.startTimer}>
            <input type="text" placeholder="Hours" name="hrs">
            <input type="text" placeholder="Minutes" name="mins">
            <input type="submit" value="Start">
            <p>${this.hrs}:${this.mins}:${this.secs}</p>
        </form>
        `;
    }

   
}

customElements.define('timer-widget', TimerWidget)