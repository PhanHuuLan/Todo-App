
import React, {PureComponent} from 'react';
import Header from './component/Header';

import './App.css';
import './stylesheet/style.css'
import TodoList from './component/TodoList';
import Footer from './component/Footer';
import { getData, listKey, setData } from './base/common';

const isNotCheckAll = (todos = []) => todos.find(todos => !todos.isCompleted) 

const filterByStaus = (todos = [], status = '', id = '' ) => {
  switch (status) {
    case 'ACTIVE' :
      return todos.filter(todo => !todo.isCompleted);
    case 'COMPLETED' :
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE' :
      return todos.filter(todo => todo.id !== id)
    default :
    return todos;
  }
}

class App extends PureComponent {
  state = {
    todosList : getData(listKey.Todos) || [],
    // todosList: [{
    //   id: 1,
    //   text: 'todo 1',
    //   isCompleted: true,
    // }, {
    //   id: 2,
    //   text: 'todo 2',
    //   isCompleted: false,
    // }],
    todoEditingId: '',
    isCheckAll: false,
    status : 'ALL',

  }
  componentWillUnmount() {
    this.setState({
      isCheckAll: !isNotCheckAll(this.state.todosList),
    })
  }
  addTodo = (todo = {}) => {
    const todoList = getData(listKey.Todos) || [];
    this.setState(preState => (
      {
        todosList: [...preState.todosList, todo]
      }
    ))
    todoList.push({...todo});
    setData(listKey.Todos, todoList);
  }
  getTodoEditingId = (id = '') => {
    this.setState({todoEditingId: id})
  }
  onEditTodo = (todo = {}, index = -1) => {
    
    if(index >= 0) {
      const {todosList : list} = this.state;
      list.splice(index,1,todo);
      this.setState({
        todosList : list, 
        todoEditingId : ''})
        setData(listKey.Todos, list)
    }
  }
  markCompleted = ( id = '') => {
    const { todosList } = this.state;
    const updatedList = todosList.map(todo => todo.id === id ? ({...todo, isCompleted : !todo.isCompleted}) : todo);
    this.setState (preState => ({
      todosList : updatedList,
      isCheckAll : !isNotCheckAll(updatedList),
    }))
    setData(listKey.Todos, updatedList);
  }
  checkAllTodos = () => {
    const { todosList } = this.state;
    this.setState( preState => ({
      todosList: todosList.map(todo => ({...todo, isCompleted : !todo.isCheckAll})),
      isCheckAll: !preState.isCheckAll,
    }))
    setData(listKey.Todos, todosList)
  }
  setStatusFilter = (status = '') => {
    this.setState({
      status,
    })

  }
  clearCompleted = () => {
    const {todosList} = this.state;
    this.setState( {
      todosList: filterByStaus(todosList, 'ACTIVE'),
    })
    const todo = filterByStaus(todosList, 'ACTIVE');
    setData(listKey.Todos,todo);
  }
  removeTodo = (id = '') => {
    const todoItem = getData(listKey.Todos)
    const {todosList} = this.state;
    this.setState( {
      todosList: filterByStaus(todosList, 'REMOVE', id)
    })
    const index = todoItem.findIndex(todo => function(e) {
      return todo.id === id;
    })
    todoItem.splice(index,1);
    setData(listKey.Todos,todoItem);
  }
   


  render() {
    const {todosList, todoEditingId, isCheckAll,status} = this.state;
    return (
      <div className="todoapp">
        <Header 
          addTodo={this.addTodo} 
          isCheckAll = {isCheckAll}
        />  
        <TodoList todosList = {filterByStaus(todosList, status)}
          getTodoEditingId = {this.getTodoEditingId}
          todoEditingId = {todoEditingId}
          onEditTodo = {this.onEditTodo}
          markCompleted = {this.markCompleted}
          isCheckAll = {isCheckAll}
          checkAllTodos = {this.checkAllTodos}
          removeTodo = {this.removeTodo}
        /> 
        <Footer
        setStatusFilter = {this.setStatusFilter}
        status={status}
        clearCompleted = {this.clearCompleted}
          numOfTodos = {todosList.length}
          numOfTodosLeft = {filterByStaus(todosList,'ACTIVE').length}
        /> 
      </div>
    );
  }
}

export default App;
