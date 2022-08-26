import { getData, listKey, setData } from "../../base/common";
import { filterByStaus, isNotCheckAll } from "../../helpers/todoHelper";
import { ADD_TODO, CHECK_ALL_TODOS, CLEAR_COMPLETED, GET_TODO_EDITING_ID, MARK_COMPLETED, ON_EDITING_TODO, REMOVE_TODO, SET_STATUS_TODO } from "../action";



const INITIAL_SATAE = {
  todosList : getData(listKey.Todos) || [],
    todoEditingId: '',
    isCheckAll: false,
    status : 'ALL',
};
const pushTodo = (todo) => {
  const todoItem =  getData(listKey.Todos) || [];
  todoItem.push({...todo});
  setData(listKey.Todos, todoItem)
}

const removeTodo = (id) => {
  const todoItem =  getData(listKey.Todos) || [];
  const index = todoItem.findIndex(todo => todo.id === id)
  todoItem.splice(index,1);
  setData(listKey.Todos, todoItem)
}

const todosReducer = (state = INITIAL_SATAE, action) => {
  const { todosList, isCheckAll} = state;
  const list = JSON.parse(JSON.stringify(todosList))
  switch (action.type) {
    case ADD_TODO:  
      return Object.assign({},state, {
        todosList: [...list, action.todo],
      },pushTodo(action.todo));
    case GET_TODO_EDITING_ID:  
      return Object.assign({},state, {
        todoEditingId: action.id,
      });
    case ON_EDITING_TODO:  
      if(action.index >= 0) {
        list.splice(action.index,1,action.todo);
          setData(listKey.Todos, list)
      }
      return Object.assign({},state, {
        todosList: list,
        todoEditingId: ''
      })
      case MARK_COMPLETED:  
        const updatedList = todosList.map(todo => todo.id === action.id ? ({...todo, isCompleted : !todo.isCompleted}) : todo);
        setData(listKey.Todos, updatedList);
        return Object.assign({},state, {
          todosList : updatedList,
          isCheckAll : !isNotCheckAll(updatedList),
        })
      case CHECK_ALL_TODOS:  
        return Object.assign({},state, {
          todosList: todosList.map(todo => ({...todo, isCompleted : !isCheckAll})),
          isCheckAll: !isCheckAll,
        },setData(listKey.Todos, todosList))
      case REMOVE_TODO:  
        return Object.assign({},state, {
            todosList: filterByStaus(todosList, 'REMOVE', action.id)
        },removeTodo(action.id))
      case CLEAR_COMPLETED:  
        const todo = filterByStaus(todosList, 'ACTIVE');
        return Object.assign({},state, {
          todosList: filterByStaus(todosList, 'ACTIVE'),
        },setData(listKey.Todos, todo))
      case SET_STATUS_TODO:  
        return Object.assign({},state, {
          status : action.status,
        })
      default:
      return state;
  }
}
export default todosReducer;