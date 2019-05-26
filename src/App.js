import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
// import Signup from './components/Signup'
// import Texts from './components/Texts';
import SignIn from './components/SignIn';
import SignUp from './components/Signup'
import ProjectButton from './components/ProjectItem'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
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
import UserPage from './components/UserPage';
import NoMatch from './components/NoMatch'


const mapStateToProps = state => {
  return {
      isLogged: state.global.isLogged,
      nazwa_uzytkownika: state.global.loggedUser,
      userData: state.global.firebaseUserData,
      userDatabase: state.global.userData,
      selectedProject: state.global.selectedProject,
      isNewProject: state.newProject.isNewProjectShown
  }
}

  const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: 'INCREMENT'}),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        logUserIn: (user) => dispatch({ type: 'LOG_USER', payload: user}),
        logUserOut: () => dispatch({ type: 'LOG_OUT' }),
        fetchUserData: (data) => dispatch({ type: 'FETCH_DATA', payload: data }),
    }
  }


  const HomePage = () => {
    return (
      <div className="homePage">
        <div style={{flex: 2}}>
          left side
        </div>
        <div className='signupContainer' style={{flex: 1}}>
          {/* <SignUp /> */}
        </div>

      </div>
    )
  }


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
            <div className='landingPage'>
              <Header />
              <main>
                <Switch> 
                  <Route exact path="/" component={HomePage} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} /> 
                  <Route path="/forgotpassword" component={ForgotPassword }/>
                  <Route component={NoMatch} />
                </Switch>
              </main>
              <footer>
                <p>kgolec93</p>
              </footer>
            </div>

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
              <Switch>
                <Route path="/signin" render={() => (<Redirect to="/" />)} /> 
                <Route exact path ='/' component={ProjectList}/>
                <Route exact path ='/projects' component={ProjectList}/>
                <Route path ='/projects/projectpage' component={ProjectPage}>
                  {this.props.selectedProject === null &&
                    <Redirect to="/projects" />
                  }
                </Route>
                <Route path='/projects/newproject' component={NewProject}>
                  {this.props.isNewProject === false &&
                    <Redirect to="/projects" />
                  }
                </Route>
                <Route path='/tasks' component={Tasks}/>
                <Route path='/user' component={UserPage}/>
                <Route component={NoMatch} />
              </Switch>
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