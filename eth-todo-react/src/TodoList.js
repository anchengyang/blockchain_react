import Web3 from 'web3';
import React, { Component } from 'react';

class TodoList extends Component {

  render() {
    return (
        <div id="content">
        <form onSubmit={(event) => {
            event.preventDefault()
            this.props.createTask(this.task.value)
        }}>
            <input 
                id="newTask" 
                ref= {(input) => {
                    this.task = input
                }} 
                type="text" 
                className="form-control" 
                placeholder="Add task..." 
                required />
            <button className='button' type="submit">submit</button>
        </form>
        <ul id="taskList" className="list-unstyled">
            { this.props.tasks.map((task, key) => {
            return(
                <div className="taskTemplate" className="checkbox" key={key}>
                <label>
                    <input 
                        type="checkbox" 
                        defaultChecked={task.completed}
                        ref={(input) => this.checkbox = input}
                        onClick={(event) => this.props.toggleCompleted(task.id)}/>
                    <span className="content">{task.content}</span>
                </label>
                </div>
            )
            })}
        </ul>
        <ul id="completedTaskList" className="list-unstyled">
        </ul>
        </div>
            
    );
  }

}

export default TodoList;
