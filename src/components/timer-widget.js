import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

class TimerWidget extends LitElement {
    static styles = css`
        
        h2 {
            margin-top: 5px;
            margin-bottom: 10px;
        }
    
        input {
            display: block;
            margin-left: 50px;
        }

        p {
            border: solid 2px black;
            margin-top: 35px;
        }
        
        .buttons {
            position: relative;
            left: 7.5px;
            margin-left: 5px;
        }
    `;

    static properties = {
        hrs: {type: Number},
        mins: {type: Number},
        secs: {type: Number},
        total: {type: Number},
        interval: {type: Object},
        paused: {type: Boolean},
    }
    
    constructor() {
        super();
        this.hrs = 0;
        this.mins = 0;
        this.secs = 0;
        this.paused = false;
    }
    
    timer(){
        var that = this;
        console.log("Timer");
        clearInterval(this.currInterval);
        this.currInterval = setInterval(function() {
            that.hrs = Math.floor(that.total/3600);
            console.log(that.hrs);
            that.mins = Math.floor((that.total%3600)/60);
            that.secs = Math.floor((that.total - that.hrs*3600 - that.mins*60));
            
            that.total = that.total - 1;
            
            if(that.total < 0){
                clearInterval(that.currInterval);
            }
        }, 1000);
    }
    
    startTimer(e){
        e.preventDefault();
        this.total = 0;
        this.total = this.hrs*3600 + this.mins*60 + this.secs;
        this.circleTotal = this.total * 1000;
        this.hrs = 0;
        this.mins = 0;
        this.timer();
    }
    
    pauseTimer(e){
        e.preventDefault();
        this.paused = true;
        clearInterval(this.currInterval);
    }
    
    resetTimer(e){
        e.preventDefault();
        this.hrs = 0;
        this.mins = 0;
        this.secs = 0;
        clearInterval(this.currInterval);
    }
    
    header(){
        return html`
            <h2>Timer</h2>
        `;
    }
    
    input(){
        return html`
            <form>
                <input text="text" placeholder="Hours" @change=${this.updateH}>
                <input type="text" placeholder="Minutes" @change=${this.updateM}>
                <button class="buttons" @click=${this.startTimer}>Start</button>
                <button class="buttons" @click=${this.resetTimer}>Reset</button>
                <button  class="buttons" @click=${this.pauseTimer}>Pause</button>
            </form>
        `;
    }
    
    updateH(e){
        this.hrs = e.srcElement.value;
        console.log(this.hrs)
    }
    
    updateM(e){
        this.mins = e.srcElement.value;
        console.log(this.mins)
    }
    
    timerDisplay(){
        return html`
            <p>${this.hrs}h, ${this.mins}m, ${this.secs}s</p>
        `;
    }
    
    render() {
        return html`
        ${this.header()}
        ${this.input()}
        ${this.timerDisplay()}
        `;
    }

   
}

customElements.define('timer-widget', TimerWidget)