import { TaskModel } from './models.js';
// import {BASE_URL} from './config.js';
// import {getUser} from './auth.js';


class ExtendedTaskModel extends TaskModel{
  constructor() {
    super();
  }

  createTask(newTask) {
    const URL = `${BASE_URL}tasks`;
    const user = getUser();
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'basic ' + user.token,
        },
        body: JSON.stringify(newTask),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to create task');
        }
    })
    .then((data) => {
        if (data.status === 'success') {
            const taskId = data.id;
            const message = `Task created successfully with ID: ${taskId}`;
            
            this.showMessageDialog(message);
            this.loadData(); // Refresh the task list
        } else {
            throw new Error('Error creating task: ' + data.status);
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }

  showMessageDialog(message) {    
    alert(message); // Simple alert
  }

  deleteTask(id) {
    const URL = `${BASE_URL}tasks/${id}`;
    const user = getUser();
    fetch(URL, {
        method: 'DELETE',
        headers: {
            'Authorization': 'basic ' + user.token,
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log(`Task with ID ${id} deleted successfully.`);
            this.loadData(); // Refresh the task list
        } else {
            throw new Error('Failed to delete task');
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }
}

// Export an instance of the extended task object
export const MyExtendedTaskModel = new ExtendedTaskModel();
