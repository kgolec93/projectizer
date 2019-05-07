import React, { Component } from 'react';




export class TestComponent extends Component {

    render() {
        return (
        <div>
            <Increment value={this.props.value} increment={this.props.increment} />
            <br />
            <Decrement value={this.props.value} decrement={this.props.decrement} />
            <p>{this.props.summary}</p>
        </div>
        )
    }
}


export default TestComponent

class Increment extends React.Component {
    render() {
        return (
            <button
                onClick={this.props.increment}
            >+ {this.props.value}</button>
          )
    }
}
  
class Decrement extends React.Component {
    render() {
        return (
            <button
                onClick={this.props.decrement}
            >- {this.props.value}</button>
          )
    }
}

