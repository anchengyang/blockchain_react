import './App.css';
import Web3 from 'web3';
import React, { Component } from 'react';
import { TODO_LIST_ADDRESS, TODO_LIST_ABI } from './config';
import TodoList from './TodoList'


class App extends Component {
  UNSAFE_componentWillMount() {
    this.load()
  }

  async load() {
    // connect to web3 by creating an instance of web3
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    // list out all accounts
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // create a contract using the ABI and contract address
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ todoList })
    // get task count from the contract
    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
    console.log(this.state.tasks)
    this.setState({ loading: false })
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading: true
    }
    this.createTask = this.createTask.bind(this)
    this.toggleTask = this.toggleTask.bind(this)
  }

  createTask(content) {
    this.setState({ loading : true})
    // send writes data to the blockchain, then wait for the receipt to confirm the transaction is finished, then stop laoding
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  toggleTask(taskId) {
    this.setState({ loading : true})
    // send writes data to the blockchain, then wait for the receipt to confirm the transaction is finished, then stop laoding
    this.state.todoList.methods.toggleCompleted(taskId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="https://github.com/anchengyang/blockchain_react" target="_blank">Blockchain React | Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              {/* load the component called TodoList after abstracting away the TodoList  */}
              { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                : <TodoList 
                    tasks = {this.state.tasks} 
                    createTask= {this.createTask}
                    toggleCompleted= {this.toggleTask}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
