import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../ProjectPage'
import CurrentProjects from '../CurrentProjects'
import NewProject from '../../components/NewProject/NewProject'
import { connect } from 'react-redux'
import addIcon from '../../assets/icons/add.svg'

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
            {/* Selected project page window */}
            {this.props.selectedProject !== null &&
              <ProjectPage 
                selectedProject={this.props.selectedProject}
              />
            }

            {/* New project form window */}
            {this.props.isNewProjectShown === true &&
              <NewProject />
            }

            {/* List of projects */}
            <CurrentProjects />



            <div onClick={this.props.toggleNewProjectForm} className="addButton hover">
              <p>Start a new project!</p><img src={addIcon} style={iconStyle} alt=""/>
            </div>  
        </div>



    )
  }
}

const iconStyle = {
  display: 'inline-block',
  height: '40px',
  width: 'auto',
  opacity: '0.5'
}

export const ProjectList = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectList
