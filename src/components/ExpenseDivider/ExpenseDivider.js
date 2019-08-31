import React, { Component } from 'react';
import InputField from '../InputField/InputField';
import DataTable from '../DataTable/DataTable';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateParticipants, updateItems } from '../../actions/UserDataActions';
import './ExpenseDivider.css';

class ExpenseDivider extends Component {
  constructor(props) {
    super(props);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleParticipantsChange(e) {
    this.props.updateParticipants(e);
  }
  
  handleItemsChange(e) {
    this.props.updateItems(e);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { userData } = this.props;
    console.log(userData);
    return(
      <div className="expense-divider-container">
        <form onSubmit={this.handleSubmit} className="participants-form">
          <InputField
            handleParticipantsChange={this.handleParticipantsChange}
            handleItemsChange={this.handleItemsChange}
          />
          <DataTable 
            participants={userData.participants}
            items={userData.items}
          />
          <Button type='submit'name='export'/>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDivider);