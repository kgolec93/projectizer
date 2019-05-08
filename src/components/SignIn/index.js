import React, { Component } from 'react'
import '../globalStyles/loginForm.css'
import { connect } from 'react-redux'


//////// THIS IS IMPORTANT ////////
const mapStateToProps = state => {
  return {username: state.loggedUser}
}

const mapDispatchToProps = dispatch => {
  return {
    changeUser: () => dispatch({type: 'CHANGE_USERNAME', payload: this.refs.email.value})
  }
}
///////////////////////////////////

class index extends Component {

  onSubmit = event => {
    // this.props.doSignIn(this.refs.email.value, this.refs.password.value);
    // this.refs.email.value = '';
    // this.refs.password.value = '';
    // this.props.changeUser;
    event.preventDefault();
  }

  render() {
    return (
    <div className="blackout">
        <div className="signupWindow">
            <h4>Sign in</h4>
            <p>test: {this.props.username}</p>
            <div  className="loginForm">
                <input type="text" placeholder="Email" ref="email"/>
                {/* <input type="password" placeholder="Password" ref="password"/> */}
                {/* <p className="loginError">{this.props.errorMessage}</p> */}
                <button 
                onClick={this.props.changeUser}
                >
                Login
                </button>
            </div>
            <p>Already have an account? Sign in!</p>
        </div>
    </div>

    )
  }
}

///// AND THIS IS IMPORTANT ////////

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(index)
export default SignIn

////////////////////////////////////