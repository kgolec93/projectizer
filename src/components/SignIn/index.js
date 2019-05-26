import React, { Component } from 'react'
import '../globalStyles/loginForm.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import  firebase from 'firebase';

//////// THIS IS IMPORTANT ////////
const mapStateToProps = (state) => {
  return {
    username: state.signIn.loggedUser, 
    emailInput: state.signIn.emailInput,
    passwordInput: state.signIn.passwordInput,
    errorMessage: state.signIn.errorMessage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enterEmail: (e) => dispatch({type: 'ENTER_EMAIL', payload: e.target.value }),
    enterPassword: (e) => dispatch({type: 'ENTER_PASSWORD', payload: e.target.value }),
    dispatchError: (error) => dispatch({type: 'SIGNIN_ERROR', payload: error}),
    logUserIn: (user) => dispatch({type: 'LOG_USER', payload: user})
  }
}
///////////////////////////////////

class index extends Component {

  componentWillUnmount() {
    this.props.dispatchError('')
  }

  onSubmit = event => {
    firebase.auth().signInWithEmailAndPassword(this.props.emailInput, this.props.passwordInput)
    .catch((error) => {
      if (error) {
        this.props.dispatchError(error.message)
      }
    });
    event.preventDefault();
  }

  render() {


    return (
    <div>
        <div className="signupWindow">
            <h4>Sign in</h4>
            <form onSubmit={this.onSubmit} className="loginForm">
              <input 
                type="text" 
                placeholder="Email" 
                value={this.props.emailInput} 
                onChange={this.props.enterEmail}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={this.props.passwordInput} 
                onChange={this.props.enterPassword}
              />
              {this.props.errorMessage !== null &&
                <p className="loginError">
                  {this.props.errorMessage}
                </p>
              }
              <button
                className='hover' 
                type="submit"
              >
              Login
              </button>
            </form>

            <Link className="link" to='/forgotpassword'>Forgot password?</Link><br />
            <Link className="link" to='/signup'>Don't have an account? Sign up!</Link>
        </div>
    </div>

    )
  }
}

///// AND THIS IS IMPORTANT ////////

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(index)
export default SignIn

////////////////////////////////////