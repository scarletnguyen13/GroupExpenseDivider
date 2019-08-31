import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button
        type={this.props.type}
        className={`${this.props.name}-button`}
      >
        {this.props.text.toUpperCase()}
      </button>
    );
  }
}

export default Button;