import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class EditTask extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},    
  };

  /**static styles = css`
        form {
            display: flex;
            flex-direction: column;
        }
        form div {
            display: grid;
            grid-template-columns: 1fr 3fr;
        }
        input {
            width: 100%;
        }
      `;.*/

      /** Add by RAHMAN: 06/04 */

      static styles = css`
        #edit-task-dialog {
            background-color: #f8f9fa; /* Light gray background */
            padding: 20px;
            border-radius: 8px;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        form div {
            margin-bottom: 20px; 
        }

        label {
            font-weight: bold; 
            margin-bottom: 8px; 
        }

        input[type="text"],
        textarea,
        input[type="number"],
        input[type="datetime-local"],
        button {
            padding: 10px; 
            border: 1px solid #ced4da; 
            border-radius: 4px; 
            outline: none; 
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
        .icon-details {
          width: 16px; /* Adjust the size as needed */
          height: 16px;
          background-image: url('../details.png');
          background-size: contain;
          background-repeat: no-repeat;
          display: inline-block;
        }
        #details-dialog {
          width: 260px; /* Set the width of the dialog */
          max-width: 80%; /* Optionally, set a maximum width */
          height: auto; /* Set height to auto to adjust based on content */
          max-height: 30vh; /* Optionally, set a maximum height */
          overflow-y: auto; /* Add vertical scroll if content exceeds height */
          background-color: #ffffff; /* Set background color */
          border: 1px solid #cccccc; /* Add border */
          border-radius: 8px; /* Add border radius */
          padding: 20px; /* Add padding */
        }

        input[type="submit"] {
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
      }
      
      input[type="submit"]:hover {
          background-color: #0056b3;
      }
      `;


  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);    
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
    };
    TaskModel.updateTask(this.id, newTask);
    this._hideModal(event);
  }


  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.showModal();
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.close();
  }

  _showDetails(event) {
    // Access the value of the textarea
    const textAreaValue = event.target.previousElementSibling.value;

    // Create a new paragraph element to hold the text area value
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = textAreaValue;

    // Create a cancel button element
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        // Hide the dialog when cancel button is clicked
        const dialog = this.renderRoot.querySelector('#details-dialog');
        dialog.close();
    });

    // Get the dialog element
    const dialog = this.renderRoot.querySelector('#details-dialog');

    // Clear any existing content
    dialog.innerHTML = '';

    // Append the paragraph element and cancel button to the dialog
    dialog.appendChild(paragraphElement);
    dialog.appendChild(cancelButton);

    // Show the dialog
    dialog.showModal();
}



  render() {
    // convert due date from milliseconds time to an ISO string
    // suitable for the datetime-local form input
    const isoString = new Date(this._task.due).toISOString();
    const due = isoString.substring(0, isoString.indexOf('T') + 6);
    return html`
        <button @click=${this._showModal}>Edit</button>
        <dialog id="edit-task-dialog">
            <form @submit="${this._submit}">
                <div>
                    <label for="summary">Summary</label>
                    <input name="summary" value=${this._task.summary}>
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text">${this._task.text}</textarea> 
                    <span @click="${this._showDetails}" class="icon-details"></span>
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input name="priority" 
                           type="number" 
                           value=${this._task.priority}> 
                </div>
                <div>
                    <label for="due">Due</label>
                    <input name="due" type="datetime-local" value=${due}>
                </div>
                <div>
                    <button @click="${this._hideModal}">Cancel</button>
                    <input value='Update' type=submit>
                </div>
            </form>
        </dialog>
        <dialog id="details-dialog"></dialog>`;
  }
}

customElements.define('edit-task', EditTask);
