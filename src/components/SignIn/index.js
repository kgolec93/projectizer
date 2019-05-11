import React, { Component } from 'react'
import '../globalStyles/loginForm.css'
import { connect } from 'react-redux'


//////// THIS IS IMPORTANT ////////
const mapStateToProps = state => {
  return {
    username: state.loggedUser, 
    inputValue: state.inputValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enterInput: (e) => dispatch({type: 'ENTER_INPUT', payload: e.target.value }),
    changeUser: () => dispatch({type: 'CHANGE_USERNAME'})
  }
}
///////////////////////////////////

class index extends Component {

  constructor() {
    super();
    this.state = {
      inputValue: ''
    }
  }

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
                <input type="text" placeholder="Email" value={this.props.inputValue} onChange={this.props.enterInput}/>
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