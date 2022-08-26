import React, {memo, useState} from "react";
import { connect } from "react-redux";
import { addTodo } from "../store/action";

const Header = memo(props => {
  const [text, setText] = useState('');
  const { addTodo, isCheckAll } = props;
  const onAddTodo = (e = {}) => {
    if (e.key === 'Enter' && text) {
      addTodo( {
        id: new Date().valueOf(),
        text,
        isCompleted: false,
      })
      setText('');
    }
  }
  return (
    <header className="header">
      <h1>Todos</h1>
      <input 
        className="new-todo"
        value={text} 
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => onAddTodo(e)}
        checked = {isCheckAll}
        />
    </header>
  )
})
const mapDispatchToProps = {
  addTodo
}

export default connect (null, mapDispatchToProps) (Header);