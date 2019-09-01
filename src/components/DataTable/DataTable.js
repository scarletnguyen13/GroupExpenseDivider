import React, { Component } from 'react';
import './DataTable.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateYesNo } from '../../actions/UserDataActions';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.handleYesNo = this.handleYesNo.bind(this);
  }

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

  handleYesNo(e) {
    const tbl = document.getElementById('participants-table');
    const cellInfo = e.target.dataset.value.split("-").map(num => parseInt(num));
    
    const row = cellInfo[0];
    const col = cellInfo[1];
    
    const chosenParticipant = tbl.rows[0].cells[col].innerHTML;

    this.props.updateYesNo(e.target.id, chosenParticipant);

    let backgroundColor = e.target.style.backgroundColor;
    if (backgroundColor === "red") {
      tbl.rows[row].cells[col].style = 'table td:hover{ background-color: rgb(160, 255, 180) }, background-color: "white"';
    } else {
      tbl.rows[row].cells[col].style.backgroundColor = "red";
    }
  }

  render() {
    const { userData } = this.props;

    const isParticipantsListNotEmpty = userData.participants.length > 0
    
    const totalPrice = parseFloat(userData.items.map(i => i.price).reduce((a, b) => a + b, 0), 10);
    const pricePerPerson = isParticipantsListNotEmpty ? totalPrice / userData.participants.length : 0;

    let row = 1;
    let col = 2;

    return (
      <div id='data-container'>
        <table id='participants-table'>
          <tbody className='table-body'>
            <tr>{this.renderTableHeader(userData.participants)}</tr>
            {userData.items.map(item => {
              const { id, name, price, yesNoList } = item
              const horizontal = (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{"$" + price}</td>
                  {
                    yesNoList.map((isYes, index) => {
                      const cell = (
                        <td key={index} onClick={this.handleYesNo} data-value={`${row}-${col}`} id={id}>{isYes ? "Yes" : "No"}</td>
                      )
                      col === userData.participants.length + 1 ? col = 2 : col++;
                      return cell;
                  })
                  }
                  <td>{"$" + (userData.participants.length > 0 ? this.roundToTwoDecimalPlaces(price / userData.participants.length) : 0)}</td>
                </tr>
              );
              row++;
              return horizontal;
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateYesNo
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);