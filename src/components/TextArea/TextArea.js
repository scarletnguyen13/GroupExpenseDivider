import React, { Component } from 'react';
import './TextArea.css';

class TextArea extends Component {
  render() {
    return (
      <div className='input-col'>
        <h3>{this.props.headerId.toUpperCase()}</h3>
        <textarea 
          type='text' 
          className='textarea' 
          id={this.props.headerId} 
          placeholder={this.props.placeholder} 
          onChange={this.props.onChange} 
          rows="6"
        />
      </div>
    );
  }
}

export default TextArea;