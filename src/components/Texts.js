import React, { Component } from 'react'

export class Texts extends Component {
  render() {
    return (
      <div>
          <p>Username: {this.props.username}</p>
          <p>Email: {this.props.email}</p>
          <p>Password: {this.props.password}</p>
      </div>
    )
  }

}

export default Texts
