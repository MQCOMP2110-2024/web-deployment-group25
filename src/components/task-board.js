import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-card.js';
// import { MyExtendedTaskModel } from '../extendedTaskModel.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: { state: true },
    _message: { state: true },
  };


  static styles = css`
:host {
    display: flex;
    flex-direction: row; /* Align task board and widget container horizontally */
    background-color: #f4f5f7; /* Light gray background */
    color: #172b4d; /* Dark text color */
    border: 1px solid #dfe1e6; /* Light border */
    padding: 10px;
    margin: 10px;  
    overflow: hidden; /* Hide overflow content */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 2px 4px rgba(9, 30, 66, 0.25); /* Shadow for depth */
    width: 25vw;
}  
#create-task-dialog {
    background-color: #fff; /* White background for dialog */
    padding: 20px; /* Add padding inside dialog */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
  }

  /* Style for form elements */
  form {
    display: grid;
    gap: 10px; /* Add space between form elements */
  }

  label {
    font-weight: bold; /* Bold label text */
  }

  input[type="text"],
  textarea,
  input[type="number"],
  input[type="datetime-local"],
  button {
    padding: 10px; /* Padding for input and button */
    border: 1px solid #ced4da; /* Light border */
    border-radius: 4px; /* Rounded corners */
    outline: none; /* Remove outline on focus */
  }

  input[type="submit"] {
    padding: 10px 20px; /* Padding for input */
    background-color: #007bff; /* Blue button background color */
    color: #ffffff; /* White button text color */
    border: none; /* Remove border */
    border-radius: 4px; /* Rounded corners */
    cursor: pointer; /* Change cursor to pointer on hover */
    transition: background-color 0.3s; /* Smooth transition for background color */
}

input[type="submit"]:hover {
    background-color: #0056b3; /* Darker blue on hover */
}


button[type="submit"] {
    background-color: #007bff; /* Blue button background color */
    color: #ffffff; /* White button text color */
    cursor: pointer; /* Cursor on hover */
    transition: background-color 0.3s; /* Smooth transition */
}

button[type="submit"]:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

.icon-plus {
      width: 16px; /* Adjust the size as needed */
      height: 16px;
      background-image: url('../plus.png');
      background-size: contain;
      background-repeat: no-repeat;
      display: inline-block;
      margin-left: auto; /* Align icon to the right */
}

button {
      background-color: #007bff; /* Blue button background color */
      color: #fff; /* White button text color */
      cursor: pointer; /* Change cursor to pointer on hover */
      transition: background-color 0.3s; /* Smooth transition for background color */
}


button:hover {
      background-color: #0056b3; /* Darker blue on hover */
}

h3 {
    margin: 0; /* Remove default margin */
    padding: 5px; /* Adjust padding as needed */
    text-align: left;
}

.loading-text {
    text-align: center; /* Center the text horizontally */
}
`;


  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#create-task-dialog');
    dialog.close();
  }

  _showModal() {
    const dialog = this.renderRoot.querySelector('#create-task-dialog');
    dialog.showModal();
  }

  _submit_create(event) {
    console.log('submitting');
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('task-due'));
    const newTask = {
      summary: formData.get('task-summary'),
      text: formData.get('task-details'),
      priority: formData.get('task-priority'),
      due: due.valueOf(),
    };
    TaskModel.createTask(newTask);
    this._hideModal(event);
  }

  render() {
    if (this._message) {
      return html`<h3>${this.category}</h3> <p>${this._message}</p>`;
    } else if (this._tasks && this._tasks.length > 0) {
      return html`
          <div>
          <h3>${this.category}
          ${this.category === 'ToDo' ? html`<button @click="${this._showModal}"  hidden-value=${this.category}><span class="icon-plus" alt="Plus Button"></span></button>` : ''}
      </h3>

            <div class="card-list">
              ${this._tasks.map((task) => {
        return html`<task-card id=${task.id}></task-card>`;
      })}
            </div>
          </div>
          <dialog id="create-task-dialog">
            <form @submit="${this._submit_create}">
            <h4>Create Task: ${this.category}</h4>
                <div>
                    <label for="summary">Summary</label>
                    <input type="text" id="task-summary" name="task-summary">
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea id="task-details" name="task-details" rows="4"></textarea> 
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input type="number" id="task-priority" name="task-priority">
                </div>
                <div>
                    <label for="due">Due</label>
                    <input type="datetime-local" id="task-due" name="task-due">
                </div>
                <div>
                    <button @click="${this._hideModal}">Cancel</button>
                    <input value='Create' type=submit>
                </div>
            </form>
        </dialog>`
    } else {
      return html`      
      <p class="loading-text">Loading....${this.category}</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
