const Task = require('./Task');
const TaskCollection = require('./TaskCollection');

describe('TaskCollection', () => {
    let taskCollection;

    beforeEach(() => {
        taskCollection = new TaskCollection();
    });

    test('should add tasks in order of priority', () => {
        const task1 = new Task('Task 1', 2);
        const task2 = new Task('Task 2', 1);
        const task3 = new Task('Task 3', 3);

        taskCollection.addTask(task1);
        taskCollection.addTask(task2);
        taskCollection.addTask(task3);

        const expectedOrder = [task2, task1, task3];
        expect(taskCollection.getTasks()).toEqual(expectedOrder);
    });

    test('should handle multiple tasks with the same priority', () => {
        const task1 = new Task('Task 1', 1);
        const task2 = new Task('Task 2', 1);
        const task3 = new Task('Task 3', 2);

        taskCollection.addTask(task1);
        taskCollection.addTask(task2);
        taskCollection.addTask(task3);

        const expectedOrder = [task1, task2, task3]; 
        expect(taskCollection.getTasks()).toEqual(expectedOrder);
    });
});