
import React, {PureComponent} from 'react';
import Header from './component/Header';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import './stylesheet/style.css'
import TodoList from './component/TodoList';
import Footer from './component/Footer';
//import { getData, listKey, setData } from './base/common';



class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className="todoapp">
          <Header/>  
          <TodoList/> 
          <Footer/> 
        </div>
      </Provider>
    );
  }
}

export default App;
