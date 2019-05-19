import React, { Component } from 'react'
import { userdata } from '../../../testData/DevDatabase'
import ProjectButton from '../../ProjectButton'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../../ProjectPage'
import { connect } from 'react-redux'
import NewProject from '../../NewProject/NewProject';
import firebase from 'firebase'
import Loader from '../../Loader'

const mapStateToProps = (state) => {
    if (state.global.userData !== null) {
        return {
            projectList: Object.keys(state.global.userData.projects || {}).map(
                key => ({
                  ...state.global.userData.projects[key],
                  key: key,
                }),
              )
        }
    }
    return {
        firebaseUserData: state.global.firebaseUserData,
        userData: state.global.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateData: (data) => dispatch({type: 'UPDATE_DATA', payload: data})
    }
}

export class index extends Component {

  componentDidMount() {
      setTimeout(() => {
          console.log(this.props.projectList)
      }, 4000)
    // console.log(this.props.projectList)
    if (this.props.firebaseUserData !== undefined) {
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}`)
        .on('value', snapshot => {
            this.props.updateData(snapshot.val())
        })
    }
  }

handleClick = () => {
    console.log(this.key)
}

  render() {
    return (
        <div>
            <p>Current projects</p>
            {this.props.userData === null &&
                <Loader/>
            }
            {this.props.userData !== null && 
                <div>
                    {this.props.projectList.map(item => (
                        <ProjectButton 
                            projectKey={item.key}
                            projectName={item.name}
                            projectLeader={item.leader}
                        />
                    ))}
                </div>
            }
            



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