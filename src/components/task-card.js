import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './edit-task.js';

/**
 * TaskCard <task-card id=N>
 * Display the details of the task with id N in a 'card'
 * as part of the task board
 */
class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: { state: true },
  };

  // static styles = css`
  //   :host {
  //       display: block;
  //       width: 200px;
  //       background-color: #ffffcc;
  //       color: #003000;
  //   }
  //   :host input {
  //       width: 5em;
  //   }
  //   h2 {
  //     background-color: red;
  //     font-size: large;
  //     font-variant: small-caps;
  //   }

  //   button {
  //     padding: 10px;
  //     background-color: #007bff;;
  //     color: #fff;
  //     border: none;
  //     border-radius: 5px;
  //     cursor: pointer;
  // }
  
  // button:hover {
  //     background-color: #0056b3;
  // }
  // `;

  static styles = css`
  
  :host {
    display: block;
    // width: 100% !important;
    background-color: #ffffff;
    color: #003000;
    padding: 10px; /* Add padding for spacing */
    margin-bottom: 10px; /* Add margin for spacing between task cards */
    width: 25vw;
    text-align: left;
  }
  
  h2 {
    background-color: #e6f7ff;
    font-size: large;
    font-variant: small-caps;
    margin-top: 0; /* Remove default margin for the heading */
  }
  
  .task-content {
    margin-bottom: 10px; /* Add margin for spacing between task content */
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }  
`;


  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    // set up an event listener to load new tasks when they change
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }
 
  _deleteTask() {
    const confirmed = (isConfirmed) => {
      if (isConfirmed) {
        TaskModel.deleteTask(this.id);
        // window.alert('The task has been deleted successfully.');
        TaskModel.showMessageDialog('The task has been deleted successfully.');
        // window.location.reload();
      } else {
        document.body.removeChild(confirmationDialog);
      }
    };

    const confirmationDialog = document.createElement('div');
    confirmationDialog.classList.add('confirmation-dialog');
    confirmationDialog.innerHTML = `
  <style>
  .confirmation-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
      width: 300px;
      z-index: 1000;
  }

  .confirmation-message {
      margin-bottom: 15px;
  }

  .confirmation-buttons {
      display: flex;
      justify-content: space-between;
  }

  .confirmation-buttons button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }

  .confirmation-buttons button.primary {
      background-color: #007bff;
      color: #ffffff;
  }

  .confirmation-buttons button.secondary {
      background-color: #eeeeee;
      color: #333333;
  }

  .confirmation-buttons button:hover {
      opacity: 0.8;
  }
</style>
      <div class="confirmation-dialog">
          <p class="confirmation-message">Are you sure you want to delete this task?</p>
          <div class="confirmation-buttons">
              <button class="primary" id="confirmDelete">Yes</button>
              <button class="secondary" id="cancelDelete">No</button>
          </div>
      </div>
  `;

    document.body.appendChild(confirmationDialog);

    const confirmDeleteBtn = confirmationDialog.querySelector('#confirmDelete');
    confirmDeleteBtn.addEventListener('click', () => confirmed(true));

    const cancelDeleteBtn = confirmationDialog.querySelector('#cancelDelete');
    cancelDeleteBtn.addEventListener('click', () => confirmed(false));
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <div>
        <h2>${this._task.summary}</h2>
        <p class='task-timestamp'><b>Task Created:</b> ${ts.toDateString()}</p>
        <p class='task-due'><b>Due Date:</b> ${due.toDateString()}</p>
        <p class='task-content'><b>Task Details:</b> ${this._task.text}</p>
        <p class='task-priority'><b>Priority:</b> ${this._task.priority}</p>

        <edit-task id=${this.id}></edit-task>
        ${this._task.category === 'ToDo' ? html`<button  id=${this.id} @click="${this._deleteTask}">Delete</button>` : ''}
        
      </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}
customElements.define('task-card', TaskCard);
