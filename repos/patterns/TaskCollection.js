const Task = require('./Task');

class TaskCollection {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.tasks.sort((a, b) => a.priority - b.priority); 
    }

    getTasks() {
        return this.tasks;
    }
}

module.exports = TaskCollection;