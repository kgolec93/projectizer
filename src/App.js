import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
// import Signup from './components/Signup'
// import Texts from './components/Texts';
import SignIn from './components/SignIn';
import SignUp from './components/Signup'
import ProjectButton from './components/ProjectButton'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import ProjectList from './components/ProjectList'
import ProjectPage from './components/ProjectPage'
import { store } from './Redux'
import NewProject from './components/NewProject/NewProject';
import firebase from 'firebase'
import  { FirebaseContext } from './components/Firebase';
import Loader from './components/Loader'
import Header from './components/Header'
import Tasks from './components/Tasks'
import ForgotPassword from './components/ForgotPassword'

//////////////////////////////////////////////////////////////////////////////////////////
/////// CZĘŚĆ REDUXOWA ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////




/// tutaj stan ze store przekazuje się do propsów
const mapStateToProps = state => {
  return {
      isLogged: state.global.isLogged,
      nazwa_uzytkownika: state.global.loggedUser,
      userData: state.global.firebaseUserData,
      userDatabase: state.global.userData,
      selectedProject: state.global.selectedProject
  }
}

  // a tutaj do propsów przekazują się akcje do wywołania
  const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: 'INCREMENT'}),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        logUserIn: (user) => dispatch({ type: 'LOG_USER', payload: user}),
        logUserOut: () => dispatch({ type: 'LOG_OUT' }),
        fetchUserData: (data) => dispatch({ type: 'FETCH_DATA', payload: data }),
    }
  }



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


export class MainApp extends Component {

  onSignIn = (user) => {
    this.props.logUserIn(user)
    .then(
      firebase.database().ref(`users/${this.props.userData.uid}`)
      .once('value', (snapshot)=>{this.props.fetchUserData(snapshot.val())})
    )
    
  }

  fetchData = () => {
    console.log(this.props.userData)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? this.onSignIn(user) : this.props.logUserOut()
    });
  }

  render() {
    if (this.props.isLogged === null && this.props.userDatabase === null)
      return (
        <div>
          <Loader className="loader-main" />
        </div>
      )
    if (this.props.isLogged === false) {
      return (
          
          <Router>
            <Header />
            <Route exact path="/" component={SignIn} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} /> 
            <Route path="/forgotpassword" component={ForgotPassword }/>
          </Router>

      )
    }
    if (this.props.isLogged !== false ) {
      return (
        <Router>

        <div>
          <div className="landingPage">
          <Header />
            <main>
              {/* <ProjectPage /> */}
                <Route exact path ='/' component={ProjectList}/>
                <Route path ='/projects' component={ProjectList}/>
                <Route path='/tasks' component={Tasks}/>




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


const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MainApp);

export class App extends Component {

  constructor() {
    super();
    this.state = {      
      isLogged: false,
      loggedUser: '',
      currentProject: ''
    }
  }

  //   // FORM VALIDATION

  //   // Check if username is not taken

  //   // Check if email is not taken

  //   // 


  //   // ///////////////////////////////////////
  //   // //// FIREBASE CREATE USER FUNCTION ////
  //   // ///////////////////////////////////////


    

  // }

  // doSignIn = (email, password) => {
  //   if (email === userdata.email && password === userdata.password) {
  //     this.setState({isLogged: true, loggedUser: userdata.username})
  //   }
  //   else {
  //     alert("Wrong email or password")
  //   }
  // }

  render() {
    return(
      <Provider store={store}>
        <ConnectedComponent/>
      </Provider>
    )
  }
}

export default App;



      
window.store = store