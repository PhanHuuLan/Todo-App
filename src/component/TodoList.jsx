import React, {memo} from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { checkAllTodos,removeTodo  } from "../store/action";
import { filterByStaus } from "../helpers/todoHelper";

const TodoList = memo(props => {
  const {todosList, isCheckAll, checkAllTodos} = props;
  return (
    <section className="main">
      <input className="toggle-all"  
        type="checkbox"
        checked={isCheckAll}
        />
      <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
      <ul className="todo-list">
        {
          todosList.map( (todo,index) => (
            <Todo key={`todo${todo.id}`} {...{todo}} {...props}index={index}/>
          ))
        }
      </ul>
    </section>
  )
})

const mapStateToProps = (state) => {
  return {
    todosList: filterByStaus(state.todos.todosList,state.todos.status),
    isCheckAll : state.todos.isCheckAll,
  }
}
const mapDispatchToProps =  {
  checkAllTodos,
  removeTodo,
}
export default connect(mapStateToProps,mapDispatchToProps) (TodoList );