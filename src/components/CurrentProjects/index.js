import React, { Component } from 'react'
import { userdata } from '../../testData/DevDatabase'
import ProjectButton from '../ProjectItem'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProjectPage from '../ProjectPage'
import { connect } from 'react-redux'
import NewProject from '../NewProject/NewProject';
import firebase from 'firebase'
import Loader from '../Loader'

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
        selectedProject: state.global.selectedProject,
        userData: state.global.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateData: (data) => dispatch({type: 'UPDATE_DATA', payload: data}),
        createList: (data) => dispatch({type: 'CREATE_TASKS_LIST', payload: data})
    }
}

export class index extends Component {

  componentDidMount() {
    if (this.props.firebaseUserData !== undefined) {
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}`)
        .on('value', snapshot => {
            this.props.updateData(snapshot.val());
            this.props.createList(snapshot.val());
        })
    }
  }

handleClick = () => {
    console.log(this.key)
}

removeProject = (proj) => {
    proj.remove();
}

render() {
    return (
        <div>
            {this.props.userData === null &&
                <Loader/>
            }
            {this.props.userData !== null && 
                    <div>

                        {this.props.projectList.length === 0 &&
                            <h2 className='nullListMessage'>You have no projects started. Click here to start a new one</h2>
                        }

                        {this.props.projectList.length !== 0 &&
                            <div>
                                {this.props.projectList.map(item => (
                                    
                                <Link to='/projects/projectpage' className="link">
                                    <ProjectButton 
                                        projectKey={item.key}
                                        projectName={item.name}
                                        projectLeader={item.leader}
                                        deadline={item.deadline}
                                        status={item.status}
                                    />
                                </Link>
                                ))}
                            </div>
                        }
                    </div> 
           
            }  
        </div>
    )
  }
}

export const CurrentProjects = connect(mapStateToProps, mapDispatchToProps)(index)
export default CurrentProjects