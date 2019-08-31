import React, { Component } from 'react';
import './DataTable.css';
import { connect } from 'react-redux';

class DataTable extends Component {

  renderTableHeader(participants) {
    let header = ["items", "price"]
    return header.concat(participants
                 .map(function (el) { return el.name; }))
                 .concat("Price Item / Person").map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

  roundToTwoDecimalPlaces(num) {
    return Math.round((num + 0.00001) * 100) / 100;
  }

  render() {
    const { userData } = this.props;

    const isParticipantsListNotEmpty = userData.participants.length > 0
    
    const totalPrice = parseFloat(userData.items.map(i => i.price).reduce((a, b) => a + b, 0), 10);
    const pricePerPerson = isParticipantsListNotEmpty ? totalPrice / userData.participants.length : 0;

    return (
      <div id='data-container'>
        <table id='participants-table'>
          <tbody className='table-body'>
            <tr>{this.renderTableHeader(userData.participants)}</tr>
            {userData.items.map(item => {
              const { id, name, price } = item
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{"$" + price}</td>
                    {userData.participants.map(index => {
                      return <td key={index} onClick={this.handleYesNo}>Yes</td>
                    })}
                    <td>{"$" + (isParticipantsListNotEmpty ? this.roundToTwoDecimalPlaces(price / userData.participants.length) : 0)}</td>
                  </tr>
                )
            })}
            <tr key='calculation'>
              <td>Total / Person</td>
              <td>{ "$" + totalPrice }</td>
              {userData.participants.map(index => {
                return (
                  <td key={index}> { "$" + this.roundToTwoDecimalPlaces(pricePerPerson) }</td>
                )
              })}
              <td className='total'>{ "$" + totalPrice }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userData } = state;
  return { userData };
};

export default connect(mapStateToProps)(DataTable);