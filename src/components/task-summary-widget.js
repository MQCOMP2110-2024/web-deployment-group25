import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

//shows statistics from the currently displayed tasks,how many tasks in each category, 
//how many high priority tasks, how many due today. Updates when tasks are added, removed or changed.
class TaskSummaryWidget extends LitElement {

    static styles = css`
        .grid-header {grid-area: header }

        .todo-tag { grid-area: todo-tag; }
        .todo-value { grid-area: todo-value; }

        .doing-tag { grid-area: doing-tag; }
        .doing-value { grid-area: doing-value; }

        .completed-tag { grid-area: completed-tag; }
        .completed-value { grid-area: completed-value; }
        
        .priority-tag { grid-area: priority-tag; }
        .priority-value { grid-area: priority-value; }

        .due-today-tag { grid-area: due-today-tag; }
        .due-today-value { grid-area: due-today-value; }

        .grid-container {
            display: grid;
            grid-template-areas:
                'header header  header'
                'todo-tag todo-tag todo-value'
                'doing-tag doing-tag doing-value'
                'completed-tag completed-tag completed-value'
                'priority-tag priority-tag priority-value'
                'due-today-tag due-today-tag due-today-value';

            margin: 5%; 
            height: 90%;
            width: 90%;
        }

        .grid-container > div {
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(0, 0, 0, 0.8);

            text-align: center;
            font-weight: bold;
            font-size: 10px;
        }
    `;


    static properties = {
        toDoTasksNum: {type: Number},
        doingTasksNum: {type: Number},
        CompletedTasksNum: {type: Number},

        highPriorityTasksNum: {type: Number},

        dueTodayTasksNum: {type: Number},
    }
    

    constructor() {
        super();

        window.addEventListener('tasks', () => {
            this._loadData();
          });
    }


    render() {
        return html`
            <div class="grid-container">
                <div class="grid-header">
                    <h2>Task Summary</h2>
                </div>

                <div class="todo-tag">
                    <p> Tasks in To-Do list </p>
                </div>

                <div class="todo-value">
                    <p> ${this.toDoTasksNum} </p>
                </div>

                <div class="doing-tag">
                    <p> Tasks in Doing list </p>
                </div>  

                <div class="doing-value">
                    <p> ${this.doingTasksNum} </p>    
                </div>

                <div class="completed-tag">
                    <p> Tasks in Completed list </p>
                </div>

                <div class="completed-value">
                    <p> ${this.CompletedTasksNum} </p>
                </div>  
                
                <div class="priority-tag">
                    <p> Tasks listed as high priority </p>
                </div>

                <div class="priority-value">
                    <p> ${this.highPriorityTasksNum} </p>
                </div>

                <div class="due-today-tag">
                    <p> Tasks due today </p>
                </div>  

                <div class="due-today-value">
                    <p> ${this.dueTodayTasksNum} </p>
                </div>
            </div>
        `;
    };


    getTaskCategories() {
        this.toDoTasksNum = 0;
        this.doingTasksNum = 0;
        this.CompletedTasksNum = 0;

        this.toDoTasksNum = TaskModel.getTasks('ToDo').length;
        this.doingTasksNum = TaskModel.getTasks('Doing').length;
        this.CompletedTasksNum = TaskModel.getTasks('Done').length;
    }

    getHighPriority() {
        this.highPriorityTasksNum = 0;

        const tasks = TaskModel.getTasks();

        for (let i = 0; i < tasks.length; i++) { 
            if (tasks[i].priority = 1) {
                this.highPriorityTasksNum += 1;
            }
        }
    }

    getDueToday() {
        this.dueTodayTasksNum = 0;

        const today = new Date();

        this.dueTodayTasksNum = TaskModel.getTasksForDay(today).length;
    }

    _loadData() {
        this.getTaskCategories();
        this.getHighPriority();
        this.getDueToday();
    }
}

customElements.define('task-summary-widget', TaskSummaryWidget);