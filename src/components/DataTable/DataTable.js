import React, { Component } from 'react';
import './DataTable.css';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.handleYesNo = this.handleYesNo.bind(this);
  }
 
  renderTableHeader() {
    let header = ["items", "price"]
    return header.concat(this.props.participants
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
    const totalPrice = parseFloat(this.props.items.map(i => i.price).reduce((a, b) => a + b, 0), 10);
    const pricePerPerson = this.props.participants.length > 0 ? totalPrice / this.props.participants.length : 0;

    let row = 1;
    let col = 2;

    return (
      <div id='data-container'>
        <table id='participants-table'>
          <tbody className='table-body'>
            <tr>{this.renderTableHeader()}</tr>
            {this.props.items.map((item, index) => {
              const { id, name, price } = item
              const horizontal = (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{"$" + price}</td>
                  {
                    this.props.participants.map(index => {
                      const cell = (
                        <td key={index} onClick={this.handleYesNo} data-value={`${row}-${col}`} id={"Yes"}>Yes</td>
                      )
                      col === this.props.participants.length + 1 ? col = 2 : col++;
                      return cell;
                  })
                  }
                  <td>{"$" + (this.props.participants.length > 0 ? this.roundToTwoDecimalPlaces(price / this.props.participants.length) : 0)}</td>
                </tr>
              )
              row++;
              return horizontal;
            })}
            <tr key='calculation'>
              <td>Total / Person</td>
              <td>{ "$" + totalPrice }</td>
              {this.props.participants.map(index => {
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

export default DataTable;