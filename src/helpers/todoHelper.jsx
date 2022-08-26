export const isNotCheckAll = (todos = []) => todos.find(todos => !todos.isCompleted) 

export const filterByStaus = (todos = [], status = '', id = '' ) => {
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