import React, { Component } from 'react'
import '../globalStyles/loginForm.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  firebase from 'firebase';


const mapStateToProps = state => {
  return{
    username: state.signUp.signupUsername,
    email: state.signUp.signupEmail,
    password1: state.signUp.signupPassword1,
    password2: state.signUp.signupPassword2,
    errorMessage: state.signUp.errorMessage,
    firebaseUserData: state.global.firebaseUserData
  }
}

const mapDispatchToProps = dispatch => {
  return{
    enterUsername: (e) => dispatch({type: 'SIGNUP_USERNAME', payload: e.target.value }),
    enterEmail: (e) => dispatch({type: 'SIGNUP_EMAIL', payload: e.target.value }),
    enterPassword1: (e) => dispatch({type: 'SIGNUP_PASSWORD', payload: e.target.value }),
    enterPassword2: (e) => dispatch({type: 'SIGNUP_PASSWORD_CONFIRM', payload: e.target.value }),
    registerUser: (e) => dispatch({type: 'SIGNUP_REGISTER_USER', payload: e}),
    dispatchError: (error) => dispatch({type: 'SIGNUP_ERROR', payload: error}),
    fetchUserData: (data) => dispatch({type: 'FIREBASE_USER_DATA', payload: data}),
    createUser: () => dispatch({type: 'CREATE_USER'})
  }
}

export class index extends Component {


    

  onSubmit = (event) => {
  firebase.auth().createUserWithEmailAndPassword(this.props.email, this.props.password1)
    .catch((error) => {
      if (error) {
        this.props.dispatchError(error.message)
      }
    })
    .then(
      
    );
    setTimeout(()=>{
      if (this.props.firebaseUserData !== null) {
        // fetching logged user data
        this.props.fetchUserData(firebase.auth().currentUser);
        firebase.database().ref('users/' + this.props.firebaseUserData.uid).set({
          username: this.props.username,
          email: this.props.email
        })
      }
    }, 1000)

 
      console.log(this.props.firebaseUserData)

  // this.props.dispatchError(errorMessage)

  //   let user = firebase.auth().currentUser;



  event.preventDefault();
}

/// TESTING ISSUE
logOut = () => {
  firebase.auth().signOut()
}

/// TESTING ISSUE
checkUser = () => {
  var user = firebase.auth().currentUser;
  console.log(user)
}

  render() {
    return (
      <div className="blackout">
        <div className="signupWindow">
          <h4>Join Us!</h4>
          <form onSubmit={this.onSubmit} className="loginForm">
              <input 
                type="text" 
                placeholder="Username" 
                value={this.props.username}
                onChange={this.props.enterUsername}
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={this.props.email}
                onChange={this.props.enterEmail}
              />
              <input 
                type="password" 
                placeholder="Password"
                value={this.props.password1}
                onChange={this.props.enterPassword1} 
              />
              <input 
                type="password" 
                placeholder="Confirm password" 
                value={this.props.password2}
                onChange={this.props.enterPassword2} 
              />
              {this.props.errorMessage !== null &&
                <p className="loginError">
                  {this.props.errorMessage}
                </p>
              }

              <button 
                type="submit" 
              >
              SIGN UP
              </button>
          </form>
          <button onClick={this.logOut}>TEST LOG OUT</button><br />
          <button onClick={this.checkUser}>TEST CHECK USER</button><br />

          <Link to='/signin'>Already have an account? Sign in!</Link>
        </div>
      </div>

    )
  }
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(index)
export default SignUp
