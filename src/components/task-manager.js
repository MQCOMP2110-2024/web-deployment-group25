import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-board.js';

/**
 * TaskManager <task-manager>
 * Display a set of task boards for three categories of task
 * Todo, Doing and Done
 */
class TaskManager extends LitElement {
  static properties = {
    _tasks: { state: true },
    _message: { state: true },
    _userLoggedIn: { state: false },
  };

  // static styles = css`
  //   .task-manager {
  //     display: grid;
  //     grid-template-columns: 1fr 1fr 1fr;
  //     // width: 83vw; /* Ensures the grid spans the full viewport width */      
  //   }
  // `;

  static styles = css`
    .task-manager {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      // background-image: url('../TaskManagerLogo.jpg');
      // background-size: cover; /* Ensure the background image covers the entire container */
      // background-position: center; /* Center the background image */  
      // background-color: #f4f5f7; /* Light gray background */
      // height: 100vh; /* Set the height to cover the entire viewport */
      
    }

    .background-image {
      background-image: url('../TaskManagerLogo.png'); /* Specify the path to your background image */
      // background-size: cover; /* Ensure the background image covers the entire container */
      background-position: center; /* Center the background image */
      position: absolute; /* Position the background image absolutely */
      top: 100 px; /* Position the background image at the top of its containing element */
      left: 20px; /* Position the background image at the left of its containing element */
      width: 81%; /* Set the width of the background image to cover the entire viewport */
      height: 70%; /* Set the height of the background image to cover the entire viewport */
      // z-index: -1; /* Ensure the background image is behind other content */
      background-repeat: no-repeat;
    }
  `;

  constructor() {
    super();
    // trigger loading of task data
    this._userLoggedIn = false;
    TaskModel.loadData();    
    console.log('_tasks...>>', this._tasks);

    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this._userLoggedIn = userLoggedIn === 'true';    
  }
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('user', () => {
      this._userLoggedIn = true;
      this.render();
    });
    window.addEventListener('tasks', () => {
      this._tasks = TaskModel.getTasks();
      this.render();
    });
    window.addEventListener('logout', () => {
      this._userLoggedIn = false;
      this.render();
    });
  }  

  render() {    
    return html`
      <div class='task-manager'>
        <task-board category='ToDo'></task-board>
        <task-board category='Doing'></task-board>
        <task-board category='Done'></task-board>
      </div>
      ${!this._userLoggedIn ? html`<div class="background-image"></div>` : ''}      
      `;      
  }
}
customElements.define('task-manager', TaskManager);
