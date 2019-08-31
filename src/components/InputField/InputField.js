import React, { Component } from 'react';
import TextArea from '../TextArea/TextArea';
import './InputField.css';

class InputField extends Component {
  render() {
    return (
      <div className='input-field'>
        <div className='input-row'>
          <TextArea 
            headerId='participants'
            placeholder='Enter participant names and separate by commas. Eg. Tuna, Scarlet'
            onChange={this.props.handleParticipantsChange}
          />
          <TextArea 
            headerId='items'
            placeholder='Enter items with costs and separate by commas. Eg. Car gas $50, Drink $20, Snack $10'
            onChange={this.props.handleItemsChange}
          />
        </div>
      </div>
    );
  }
}

export default InputField;