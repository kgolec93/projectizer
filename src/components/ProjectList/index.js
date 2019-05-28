import React, { Component } from 'react'
import CurrentProjects from '../CurrentProjects'
import { connect } from 'react-redux'
import addIcon from '../../assets/icons/add.svg'
import firebase from 'firebase'


import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => {
  if (state.global.userData !== null) {
    return {
        projectList: Object.keys(state.global.userData.projects || {}).map(
          key => ({
            ...state.global.userData.projects[key],
            key: key,
          }),
        ),
    firebaseUserData: state.global.firebaseUserData,
    selectedProject: state.global.selectedProject,
    isNewProjectShown: state.newProject.isNewProjectShown
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateData: (data) => dispatch({type: 'UPDATE_DATA', payload: data}),
    createList: (data) => dispatch({type: 'CREATE_TASKS_LIST', payload: data})
  }
}

class index extends Component {

  constructor() {
    super();
    this.state = {
      isNewProjectFormVisible: false,
      newProjectName: '',
      newProjectLeader: '',
      newProjectDeadline: '',
    }
  }

  addNewProject = (e) => {
    this.setState({
      isNewProjectFormVisible: false,
      newProjectName: '',
      newProjectLeader: '',
      newProjectDeadline: '',
    })
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects`)
      .push({
        name: this.state.newProjectName,
        leader: this.state.newProjectLeader,
        deadline: `${this.state.newProjectDeadline}`,
        dateAdded: Date.now(),
        status: 'To do',
        customStatus: 'Initial status'
      })

      
    e.preventDefault();
  }

  toggleNewProjectForm = () => {
    this.setState({
      isNewProjectFormVisible: !this.state.isNewProjectFormVisible
    })
  }

  enterValue = (e) => {
    switch (e.target.name) {
      case 'newProjectName': 
        this.setState({
          newProjectName: e.target.value
        })
        break
      case 'newProjectLeader': 
        this.setState({
          newProjectLeader: e.target.value
        })
        break
      default: 
        return (this.state)
    }
  }

  selectDeadline = (input) => {
    this.setState({
      newProjectDeadline: input
    })
  }

  render() {
    return (
        <div>
            {/* Add project button */}
              <div className="addButton hover">

              {this.state.isNewProjectFormVisible ?
                <form onSubmit={this.addNewProject}>
                  <input 
                    type="text"
                    value={this.state.newProjectName}
                    onChange={this.enterValue}
                    name='newProjectName'
                  />
                  
                  <input 
                    type="text"
                    value={this.state.newProjectLeader}
                    onChange={this.enterValue}
                    name='newProjectLeader'
                  />
                  <DatePicker
                    required
                    onChange={ this.selectDeadline }
                    selected={ this.state.newProjectDeadline }
                  />
                  <button type='submit'>Add project</button>
                  <button onClick={this.toggleNewProjectForm}>Cancel</button>
                </form>

              :
                <div onClick={this.toggleNewProjectForm} >
                  <p>Start a new project!</p><img src={addIcon} style={iconStyle} alt=""/>
                </div>
              }
              </div> 

            {/* List of projects */}
            <CurrentProjects />
        </div>
    )
  }
}

const iconStyle = {
  display: 'inline-block',
  height: '40px',
  width: 'auto',
  opacity: '0.5',
  margin: '8px'
}

export const ProjectList = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectList
