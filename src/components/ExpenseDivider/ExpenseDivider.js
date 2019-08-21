import React, { Component } from 'react';
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
    this.handleClickDetails = this.handleClickDetails.bind(this);
    this.handleYesNo = this.handleYesNo.bind(this);
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

  renderTableHeader() {
    let header = ["items", "price"]
    return header.concat(this.state.participants
                 .map(function (el) { return el.name; }))
                 .concat("Price Item / Person").map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

  handleClickDetails(id) {
    this.setState({
      expenseDetails: this.state.participants.find(p => p.id === id).expenses
    });
  }

  roundToTwoDecimalPlaces(num) {
    return Math.round((num + 0.00001) * 100) / 100;
  }

  handleYesNo(e) {
    const tbl = document.getElementById('participants-table');
    const cellInfo = e.target.dataset.value.split("-").map(num => parseInt(num));
    const row = cellInfo[0];
    const col = cellInfo[1];
    let backgroundColor = e.target.style.backgroundColor;
    if (backgroundColor === "red") {
      tbl.rows[row].cells[col].style = 'table td:hover{ background-color: rgb(160, 255, 180) }, background-color: "white"';
      tbl.rows[row].cells[col].innerHTML = "Yes";
    } else {
      tbl.rows[row].cells[col].style.backgroundColor = "red";
      tbl.rows[row].cells[col].innerHTML = "No";
    }
  }

  render() {
    const totalPrice = parseFloat(this.state.items.map(i => i.price).reduce((a, b) => a + b, 0), 10);
    const pricePerPerson = this.state.participants.length > 0 ? totalPrice / this.state.participants.length : 0;

    let row = 1;
    let col = 2;
    return(
      <div className="expense-divider-container">
        <form onSubmit={this.handleSubmit} className="participants-form">
          <div className='input-field'>E
            <div className='input-row'>
              <div className='input-col'>
                <h3>PARTICIPANTS</h3>
                <textarea type='text' id='participants' placeholder='Enter participant names and separate by commas. Eg. Tuna, Scarlet' onChange={this.handleParticipantsChange} rows="6"/>
              </div>
              <div className='input-col'>
                <h3>ITEMS</h3>
                <textarea type='text' id='participants' placeholder='Enter items with costs and separate by commas. Eg. Car gas $50, Drink $20, Snack $10' onChange={this.handleItemsChange} rows="6"/>
              </div>
            </div>
          </div>
          <div id='data-container'>
            <table id='participants-table'>
              <tbody className='table-body'>
                <tr>{this.renderTableHeader()}</tr>
                {this.state.items.map((item, index) => {
                  const { id, name, price } = item
                  const horizontal = (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{"$" + price}</td>
                      {
                        this.state.participants.map(index => {
                          const cell = (
                            <td key={index} onClick={this.handleYesNo} data-value={`${row}-${col}`} id={"Yes"}>Yes</td>
                          )
                          col === this.state.participants.length + 1 ? col = 2 : col++;
                          return cell;
                      })
                      }
                      <td>{"$" + (this.state.participants.length > 0 ? this.roundToTwoDecimalPlaces(price / this.state.participants.length) : 0)}</td>
                    </tr>
                  )
                  row++;
                  return horizontal;
                })}
                <tr key='calculation'>
                  <td>Total / Person</td>
                  <td>{ "$" + totalPrice }</td>
                  {this.state.participants.map(index => {
                    return (
                      <td key={index}> { "$" + this.roundToTwoDecimalPlaces(pricePerPerson) }</td>
                    )
                  })}
                  <td className='total'>{ "$" + totalPrice }</td>
                </tr>
              </tbody>
            </table>
          </div>
        <button type="submit" className="export-button">EXPORT</button>
      </form>
      </div>
    );
  }
}

export default ExpenseDivider;