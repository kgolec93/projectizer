import React, { Component } from 'react'
import { userdata } from '../../testData/DevDatabase'
import ProjectButton from '../ProjectButton'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../ProjectPage'
import CurrentProjects from '../ProjectList/CurrentProjects'
import NewProject from '../../components/NewProject/NewProject'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedProject: state.global.selectedProject
  }
}

class index extends Component {
  render() {
    return (
      <Router>
        <div>

        <Link className='link' to='/projectpage'>TEST LINK TO PROJECT PAGE</Link><br />
        <Link className='link' to='/projects'>TEST LINK TO PROJECTS</Link><br />
        {/* <Link className='link' to='/projects/newproject'>TEST LINK TO NEW PROJECT</Link> */}
        <CurrentProjects />
        {/* <Route 
            exact path='/projects' 
            projectName="janusz1"
            component={CurrentProjects}            
          /> */}
          {this.props.selectedProject !== null &&
            <ProjectPage 
              selectedProject={this.props.selectedProject}
            />
          }
          <Route 
            path='/projects/newproject'
            component={NewProject}            
          />
          {/* <ProjectPage /> */}
          

        </div>

      </Router> 

    )
  }
}

export const ProjectList = connect(mapStateToProps)(index)
export default ProjectList
