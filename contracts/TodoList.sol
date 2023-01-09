pragma solidity ^0.5.0;

contract TodoList{
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    // Event in solidity is used to log the transactions happening in the blockchain.
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public {
        createTask("my first task");
    }

    function createTask(string memory content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, content, false);
        // triggering an event to indicate that the create task function was called
        emit TaskCreated(taskCount, content, false);
    }

    function toggleCompleted(uint id) public {
        Task memory task = tasks[id];
        task.completed = !task.completed;
        tasks[id] = task;
        emit TaskCompleted(id, task.completed);
    }

}