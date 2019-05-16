import React, { Component } from 'react'

import { connect } from 'react-redux'
import  firebase from 'firebase';

const mapStateToProps = state => {
  return{
    projectName: state.newProject.projectName,
    projectLeader: state.newProject.projectLeader,
    deadline: state.newProject.deadline,
    userData: state.global.firebaseUserData
  }
}

const mapDispatchToProps = dispatch => {
  return{
    enterProjectName: (e) => dispatch({type: 'ENTER_PROJECTNAME', payload: e.target.value}),
    enterProjectLeader: (e) => dispatch({type: 'ENTER_PROJECTLEADER', payload: e.target.value}),
    test: () => dispatch({type:'TEST_MESSAGE'}),
    addProject: (uid) => dispatch({type: 'ADD_PROJECT', payload: uid})
  }
}

export class index extends Component {

  addProject = (event) => {
    firebase.database().ref(`users/${this.props.userData.uid}/projects`)
      .push({
      name: this.props.projectName,
      leader: this.props.projectLeader
    })
    this.props.addProject();
    event.preventDefault();
  }

  // firebase.database().ref(`users/${this.props.userData.uid}`)
  // .once('value', (snapshot)=>this.props.fetchUserData(snapshot.val()))

  render() {
    return (
      <div>
        <form onSubmit={this.addProject}>
            <p>Project name:</p>
            <input 
                type="text"
                value={this.props.projectName}
                onChange={this.props.enterProjectName}
            
            />
            <p>Project leader:</p>
            <input 
                type="text"
                value={this.props.projectLeader}
                onChange={this.props.enterProjectLeader}
            />
            <p>Deadline (TEST SO FAR):</p>
            <input type="text"/>
            <br />
            <button type="submit">
                Start project!
            </button>
        </form>
      </div>
    )
  }
}

export const NewProject = connect(mapStateToProps, mapDispatchToProps)(index)
export default NewProject