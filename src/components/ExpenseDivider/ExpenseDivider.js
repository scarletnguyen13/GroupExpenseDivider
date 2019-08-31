import React, { Component } from 'react';
import InputField from '../InputField/InputField';
import DataTable from '../DataTable/DataTable';
import Button from '../Button/Button';
import './ExpenseDivider.css';

class ExpenseDivider extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return(
      <div className="expense-divider-container">
        <form onSubmit={this.handleSubmit} className="participants-form">
          <InputField />
          <DataTable />
          <Button type='submit' name='export' text='Export'/>
        </form>
      </div>
    );
  }
}

export default ExpenseDivider;