import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../ProjectPage'
import CurrentProjects from '../ProjectList/CurrentProjects'
import NewProject from '../../components/NewProject/NewProject'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedProject: state.global.selectedProject,
    isNewProjectShown: state.newProject.isNewProjectShown
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNewProjectForm: () => dispatch({type:'TOGGLE_NEWPROJECT'})
  }
}

class index extends Component {

  render() {
    return (
        <div>
          <CurrentProjects />
          {this.props.selectedProject !== null &&
            <ProjectPage 
              selectedProject={this.props.selectedProject}
            />
          }

          {this.props.isNewProjectShown === true &&
            <NewProject />
          }

          <div onClick={this.props.toggleNewProjectForm} className="projectButton addProjectButton">
              <p>Start a new project!</p>
          </div>   
        </div>


    )
  }
}

export const ProjectList = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectList
