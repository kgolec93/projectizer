import React, { Component } from 'react'
import ProjectButton from '../ProjectItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
              ).reverse()
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
        createList: (data) => dispatch({type: 'CREATE_TASKS_LIST', payload: data}),
        toggleInput: () => dispatch({type:'TOGGLE_NEWPROJECT'})

    }
}


const ProjectLegend = () => {
    return (
        <div className='projectButton projectLegend'>
            <div className="projectBasicData">
                <p style={{flex: 3}}>Project name</p>
                <p style={pStyle}>Project leader</p>
                <p style={pStyle}>Deadline</p>
                <p style={pStyle}>State</p>
                <p style={pStyle}>Current Status</p>
                {/* <p style={pStyleMod}></p> */}
            </div>
        </div>
    )
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

render() {
    return (
        <div>
            {this.props.userData === null &&
                <Loader/>
            }
            {this.props.userData !== null && 
                <div>

                    {this.props.projectList.length === 0 &&
                        <h2 className='nullListMessage hover' onClick={this.props.toggleInput}>You have no projects started. Click here to start a new one</h2>
                    }

                    {this.props.projectList.length !== 0 &&
                        <div>
                            <ProjectLegend />
                            {this.props.projectList.map(item => (
                                <Link to='/projects/projectpage' className="link">
                                    <ProjectButton 
                                        projectKey={item.key}
                                        projectName={item.name}
                                        projectLeader={item.leader}
                                        deadline={item.deadline}
                                        status={item.status}
                                        customStatus={item.customStatus}
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

const pStyle = {flex: 2, borderLeft: '1px solid #c9c9c9'}
const pStyleMod = {flex: 1, borderLeft: '1px solid #c9c9c9'}


export const CurrentProjects = connect(mapStateToProps, mapDispatchToProps)(index)
export default CurrentProjects