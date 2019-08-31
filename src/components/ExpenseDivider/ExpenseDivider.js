import React, { Component } from 'react';
import InputField from '../InputField/InputField';
import DataTable from '../DataTable/DataTable';
import Button from '../Button/Button';
import './ExpenseDivider.css';

function generateRandomId() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

class ExpenseDivider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      items: []
    };
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleParticipantsChange(e) {
    this.setState({
      participants: e.target.value.trim().split(",").filter(name => name.length > 0).map(participant => 
        Object.assign(participant, {
          id: generateRandomId(),
          name: participant.trim(),
          items: this.state.items
        })
      ),
    });
  }
  
  handleItemsChange(e) {
    this.setState({
      items: e.target.value.trim().split(",").filter(item => item.length > 0).map(item => 
        Object.assign(item, {
          id: generateRandomId(),
          name: item.split("$").length > 1 ? item.split("$")[0].trim() : item,
          price: item.split("$").length > 1 ? parseFloat(item.split("$")[1].trim(), 10) : 0
        })
      ),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {    
    return(
      <div className="expense-divider-container">
        <form onSubmit={this.handleSubmit} className="participants-form">
          <InputField
            handleParticipantsChange={this.handleParticipantsChange}
            handleItemsChange={this.handleItemsChange}
          />
          <DataTable 
            participants={this.state.participants}
            items={this.state.items}
          />
          <Button type='submit'name='export'/>
        </form>
      </div>
    );
  }
}

export default ExpenseDivider;