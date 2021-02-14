import React, { Component } from 'react';
import TextArea from '../TextArea/TextArea';
import './InputField.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateParticipants, updateItems } from '../../actions/UserDataActions';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
  }

  handleParticipantsChange(e) {
    this.props.updateParticipants(e);
  }
  
  handleItemsChange(e) {
    this.props.updateItems(e);
  }

  render() {
    return (
      <div className='input-field'>
        <div className='input-row'>
          <TextArea 
            headerId='participants'
            placeholder='Enter participant names and separate by commas. Eg. Tuna, Scarlet'
            onChange={this.props.updateParticipants}
          />
          <TextArea 
            headerId='items'
            placeholder='Enter items with costs and separate by commas. Eg. Car gas $50, Drink $20, Snack $10'
            onChange={this.props.updateItems}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userData } = state;
  return { userData };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateParticipants,
    updateItems
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(InputField);