import React, { Component } from 'react'
import { userdata } from '../../../testData/DevDatabase'
import ProjectButton from '../../ProjectButton'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../../ProjectPage'
import { connect } from 'react-redux'
import NewProject from '../../NewProject/NewProject';
import firebase from 'firebase'

const mapStateToProps = (state) => {
    return {
        projectList: Object.keys(state.global.userData.projects || {}).map(
            key => ({
              ...state.global.userData.projects[key],
              uid: key,
            }),
          ),

        userData: state.global.firebaseUserData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateData: (data) => dispatch({type: 'UPDATE_DATA', payload: data})
    }
}

export class index extends Component {

  componentDidMount() {
        firebase.database().ref(`users/${this.props.userData.uid}`)
        .on('value', snapshot => {
            this.props.updateData(snapshot.val())
        })
  }

  render() {
    return (
        <div>
            <p>Current projects</p>

            <div>
                {this.props.projectList.map(item => (
                    <Link to={item.name}>
                    <ProjectButton 
                        projectName={item.name}
                        projectLeader={item.leader}
                    />
                    </Link>
                ))}
            </div>
            


            <p>Finished projects</p>
            {userdata.projects.map(item => (
                <ProjectButton 
                    projectName={item.projectName}
                    projectLeader={item.projectData.projectLeader}
                    deadline={item.projectData.deadline}
                    currentStatus={item.currentStatus}
                />
            ))}
            <Link to="/projects/newproject">
                <div className="projectButton addProjectButton">
                    <p>Start a new project!</p>
                </div>            
            </Link>

            <NewProject />
        </div>

    )
  }
}

export const CurrentProjects = connect(mapStateToProps, mapDispatchToProps)(index)
export default CurrentProjects