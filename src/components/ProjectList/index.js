import React, { Component } from 'react'
import { userdata } from '../../testData/DevDatabase'
import ProjectButton from '../ProjectButton'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../ProjectPage'
import CurrentProjects from '../ProjectList/CurrentProjects'

export class index extends Component {
  render() {
    return (
      <Router>
        <div>

        <Link className='link' to='/projectpage'>TEST LINK TO PROJECT PAGE</Link><br />
        <Link className='link' to='/projects'>TEST LINK TO PROJECTS</Link>
        <Route 
            path='/projects' 
            projectName="janusz1"
            component={CurrentProjects}            
          />
          <Route 
            path='/projectpage' 
            projectName="janusz1"
            component={ProjectPage}            
          />
          {/* <ProjectPage /> */}
          

        </div>

      </Router> 

    )
  }
}

export default index
