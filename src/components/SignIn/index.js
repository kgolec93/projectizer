import React, { Component } from 'react'
import '../globalStyles/loginForm.css'
import { connect } from 'react-redux'


//////// THIS IS IMPORTANT ////////
const mapStateToProps = state => {
  return {username: state.loggedUser}
}
///////////////////////////////////

class index extends Component {

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
            <p>test: {this.props.username}</p>
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

///// AND THIS IS IMPORTANT ////////

export const SignIn = connect(mapStateToProps)(index)
export default SignIn

////////////////////////////////////