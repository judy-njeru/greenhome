import React, { Component } from 'react';

class Choice extends Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    this.props.onToggle(this.props.choice.choiceID);
  }

  render() {
    const { choice } = this.props;
    return (
      <div className='label_wrap'>
        <label className='my_choices' id="checkbox">
            <input type='checkbox'  onClick={this.onItemClick} type='checkbox' checked={choice.value} />
            <span>{choice.choice}</span>
        </label>
      </div>
    );
  } 
}

export default Choice;
