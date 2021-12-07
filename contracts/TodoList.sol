pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    uint public taskCount = 0; // Sets the state of the contract for number of tasks

    struct Task { // Struct for task
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks; // Mapping of tasks (database/array of tasks)
    
    constructor() public { // Constructor for TodoList contract
        createTask("First Task in this list!");
    }

    function createTask(string memory _content) public { // Creates a task
        taskCount++; // Increments the task count
        tasks[taskCount] = Task(taskCount, _content, false); // Creates a new task in the tasks array
    }


}