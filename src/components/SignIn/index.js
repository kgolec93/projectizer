import React, { Component } from 'react'
import '../globalStyles/loginForm.css'

export class index extends Component {

  onSubmit = event => {
    this.props.doSignIn(this.refs.email.value, this.refs.password.value);
    this.refs.email.value = '';
    this.refs.password.value = '';
    event.preventDefault();
  }

  render() {
    return (
    <div className="blackout">
        <div className="signupWindow">
            <h4>Sign in</h4>
            <form onSubmit={this.onSubmit} className="loginForm">
                <input type="email" placeholder="Email" ref="email"/>
                <input type="password" placeholder="Password" ref="password"/>
                {/* <p className="loginError">{this.props.errorMessage}</p> */}
                <button 
                type="submit" 
                >
                Login
                </button>
            </form>
            <p>Already have an account? Sign in!</p>
        </div>
    </div>

    )
  }
}

export default index
