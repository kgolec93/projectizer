import React, { Component } from 'react'
import { userdata } from '../../testData/DevDatabase'
import ProjectButton from '../ProjectButton'

export class index extends Component {
  render() {
    return (
      <div>
        {userdata.projects.map(item => (
            <ProjectButton 
                projectName={item.projectName}
                projectLeader={item.projectData.projectLeader}
                deadline={item.projectData.deadline}
                currentStatus={item.currentStatus}
            />
        ))}
      </div>
    )
  }
}

export default index
