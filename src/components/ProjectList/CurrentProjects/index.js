import React, { Component } from 'react'
import { userdata } from '../../../testData/DevDatabase'
import ProjectButton from '../../ProjectButton'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../../ProjectPage'

export class index extends Component {
  render() {
    return (
        <div>
            <p>Current projects</p>
            {userdata.projects.map(item => (
                <Link to={item.projectName}>
                <ProjectButton 
                    projectName={item.projectName}
                    projectLeader={item.projectData.projectLeader}
                    deadline={item.projectData.deadline}
                    currentStatus={item.currentStatus}
                />
                </Link>
            ))}
            <p>Finished projects</p>
            {userdata.projects.map(item => (
                <ProjectButton 
                    projectName={item.projectName}
                    projectLeader={item.projectData.projectLeader}
                    deadline={item.projectData.deadline}
                    currentStatus={item.currentStatus}
                />
            ))}
            <div className="projectButton addProjectButton">
                <p>Start a new project!</p>
            </div>
        </div>

    )
  }
}

export default index
