import React, { Component } from 'react';
import './App.css';
// import { createStore } from 'redux';
// import {connect, Provider } from 'react-redux';
// import Signup from './components/Signup'
// import Texts from './components/Texts';
import SignIn from './components/SignIn';
import { userdata } from './testData/DevDatabase'
import ProjectButton from './components/ProjectButton'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectList from './components/ProjectList'
import ProjectPage from './components/ProjectPage'

// import  firebase from 'firebase';



//////////////////////////////////////////////////////////////////////////////////////////
/////// CZĘŚĆ REDUXOWA ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// const reducer = (state, action) => {
//   switch (action.type) {
//       case 'CHANGE':
//           return {...state, username: state.username, email: state.email, password: state.password}
//       default:
//           return state;
//   }
// }

// const defaultState = {
//   username: 'tajfun',
//   email: 'janusz@kowalski.pl',
//   password: '1234'
// }

// const AppStore = createStore(reducer, defaultState);



// const mapStateToProps = state => {
//   return {
//       username: state.username,
//       email: state.email,
//       password: state.password
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//       increment: () => dispatch({ type: 'INCREMENT'}),
//       decrement: () => dispatch({ type: 'DECREMENT' })
//   }
// }

// const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Signup);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////



export class App extends Component {

  constructor() {
    super();
    this.state = {
      username: 'Kamil',
      email: 'k@g.pl',
      password: 'chuj',
      // isLogged: false,
      // loggedUser: null,
      
      isLogged: true,
      loggedUser: 'kgolec93',
      currentProject: ''
    }
  }

  doCreateUser = (username, email, password, password2) => {
    // this.setState({
    //   username: username,
    //   email: email,
    //   password: password  
    // })

    // FORM VALIDATION

    // Check if username is not taken

    // Check if email is not taken

    // 


    // ///////////////////////////////////////
    // //// FIREBASE CREATE USER FUNCTION ////
    // ///////////////////////////////////////

    // // Firebase Auth Create User //
    // firebase.auth().createUserWithEmailAndPassword(email, password);
    
    // // Adding user to the database //
    // firebase.database().ref('users/' + username).set({
    //   username: username,
    //   email: email
    // });
  }

  doSignIn = (email, password) => {
    if (email === userdata.email && password === userdata.password) {
      this.setState({isLogged: true, loggedUser: userdata.username})
    }
    else {
      alert("Wrong email or password")
    }
  }

  render() {
    if (this.state.isLogged === false) {
      return (
          <SignIn doSignIn={this.doSignIn}/>
      )
    }
    if (this.state.isLogged !== false ) {
      return (
        <Router>
        <div>
          {/* <Signup doCreateUser={this.doCreateUser}/> */}
          <div className="landingPage">
            <header>
              <p>WorkItUp!</p>
              <ul>
                <li>Notif.</li>
                <li>Tasks</li>
                <li>Mail</li>
                <li>{this.state.loggedUser}</li>
                <li>User fot.</li>
              </ul>
            </header>
            <main>

              <h1>PROJECTS</h1>
              <h1>TASKS</h1>

              <Route exact path='/projects' component={ProjectList}/>
              {/* needs to set the change of state, but to many levels to pass, so redux needed */}
              <Route path={`/projects/${this.state.currentProject}`} component={ProjectPage}/>


              <div className="projectButton addProjectButton">
                <p>Start a new project!</p>
              </div>

            </main>
            <footer>
              <p>kgolec93</p>
            </footer>
          </div>

        </div>
        </Router>

      );
    }
  }
}

export default App;

      // {/* <Provider store={AppStore}>
      //   <ConnectedComponent/>
      // </Provider> */}
