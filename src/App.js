import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/index';
import ExpenseDivider from '../src/components/ExpenseDivider/ExpenseDivider';

function App() {
  return (
    <Provider store={store}>
      <ExpenseDivider />
    </Provider>
  );
}

export default App;
