import React, { Component } from 'react'
import '../globalStyles/loginForm.css'

export class index extends Component {

  onSubmit = event => {
    this.props.doCreateUser(this.refs.username.value, this. refs.email.value, this.refs.password.value, this.refs.password2.value);
    this.refs.username.value = '';
    this. refs.email.value = '';
    this.refs.password.value = '';
    this.refs.password2.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="signupWindow">
        <h4>Join Us!</h4>
        <form onSubmit={this.onSubmit} className="loginForm">
            <input type="text" placeholder="Username" ref="username"/>
            <input type="email" placeholder="Email" ref="email"/>
            <input type="password" placeholder="Password" ref="password"/>
            <input type="password" placeholder="Confirm password" ref="password2"/>
            {/* <p className="loginError">{this.props.errorMessage}</p> */}
            <button 
              type="submit" 
            >
            SIGN UP
            </button>
        </form>
        <p>Already have an account? Sign in!</p>

      </div>
    )
  }
}

export default index
