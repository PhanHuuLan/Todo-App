import React, {memo,useState} from "react";

const Todo = memo(props => {
  const {todo, getTodoEditingId, todoEditingId, onEditTodo,index, markCompleted ,removeTodo} = props;
  const [text,setText] = useState(todo.text);
  const isEditing = todoEditingId === todo.id;
  const editTodo = () => {
    onEditTodo({
      ...todo,
      text
    },index)
  }
  return (
    
    <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''} `}>
      { !isEditing ? 
      <div className="view">
        <input 
          className="toggle" 
          type="checkbox" 
          checked={todo.isCompleted}
          onChange={() => markCompleted(todo.id)}
          />
        <label onDoubleClick={() => getTodoEditingId(todo.id)}>{todo.text}</label>
        <button className="destroy" onClick={() => removeTodo(todo.id)}></button>
      </div> :
        <input 
        className="edit" 
        type="text" 
        value={text}
        defaultChecked
        onChange={e => setText(e.target.value)}
        onBlur={editTodo}
        onKeyPress = {(e) => {
          if(e.key === 'Enter') {
            editTodo();
          }
        }}
        />
      }
    </li>
      
  )
})
export default Todo;