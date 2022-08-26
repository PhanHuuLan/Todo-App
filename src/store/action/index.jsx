export const ADD_TODO = 'ADD_TODO';
export const GET_TODO_EDITING_ID = 'GET_TODO_EDITING_ID';
export const ON_EDITING_TODO = 'ON_EDITING_TODO';
export const MARK_COMPLETED = 'MARK_COMPLETED';
export const CHECK_ALL_TODOS = 'CHECK_ALL_TODOS';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const SET_STATUS_TODO = 'SET_STATUS_TODO';

export const addTodo = (todo = {}) => {
  return {
    todo,
    type: ADD_TODO,
  }
}
export const getTodoEditingId = (id) => {
  return {
    id,
    type: GET_TODO_EDITING_ID
  }
}
export const onEditTodo = ( todo = {}, index = -1) => {
  return {
    todo,
    index,
    type: ON_EDITING_TODO
  }
}
export const markCompleted = (id) => {
  return {
    id,
    type: MARK_COMPLETED
  }
}
export const checkAllTodos = () => {
  return {
    type: CHECK_ALL_TODOS
  }
}
export const removeTodo = (id = '') => {
  return {
    id,
    type: REMOVE_TODO
  }
}
export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED
  }
}
export const setStatusFilter = (status = '') => {
  return {
    status,
    type: SET_STATUS_TODO
  }
}
