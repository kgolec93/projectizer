import React, { Component } from 'react'

import { connect } from 'react-redux'
import  firebase from 'firebase';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => {
  return{
    projectName: state.newProject.projectName,
    projectLeader: state.newProject.projectLeader,
    deadline: state.newProject.deadline,
    userData: state.global.firebaseUserData,
    calendarIsOpened: state.newProject.calendarIsOpened
  }
}

const mapDispatchToProps = dispatch => {
  return{
    enterProjectName: (e) => dispatch({type: 'ENTER_PROJECTNAME', payload: e.target.value}),
    enterProjectLeader: (e) => dispatch({type: 'ENTER_PROJECTLEADER', payload: e.target.value}),
    test: () => dispatch({type:'TEST_MESSAGE'}),
    addProject: (uid) => dispatch({type: 'ADD_PROJECT', payload: uid}),
    calendarChange: (date) => dispatch({type: 'SELECT_DEADLINE', payload: date}),
    toggleCalendar: () => dispatch({type: 'TOGGLE_CALENDAR'}),
    toggleNewProjectForm: () => dispatch({type:'TOGGLE_NEWPROJECT'})
  }
}

export class index extends Component {


  ////// ADD PROJECT TO THE DB //////
  addProject = (event) => {
    firebase.database().ref(`users/${this.props.userData.uid}/projects`)
      .push({
        name: this.props.projectName,
        leader: this.props.projectLeader,
        deadline: `${this.props.deadline}`,
        dateAdded: Date.now(),
        status: 'To do',
        customStatus: 'Initial status'
      })
    this.props.toggleNewProjectForm();
    this.props.addProject();
    event.preventDefault();
  }

  render() {
    return (
      <div className="blackout">
        <h1 onClick={this.props.toggleNewProjectForm}>X</h1>
        <form onSubmit={this.addProject}>
            <p>Project name:</p>
            <input 
                required
                type="text"
                value={this.props.projectName}
                onChange={this.props.enterProjectName}
            
            />
            <p>Project leader:</p>
            <input 
                required
                type="text"
                value={this.props.projectLeader}
                onChange={this.props.enterProjectLeader}
            />

            {/* DATE PICKER */}
            <p>Deadline:</p>
            <DatePicker
              required
              onChange={this.props.calendarChange}
              selected={ this.props.deadline }
            />

            
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