import React, { Component } from 'react'

import { connect } from 'react-redux'
import  firebase from 'firebase';

const mapStateToProps = state => {
  return{
    projectname: state.newProject.projectName,
    projectleader: state.newProject.projectLeader,
    deadline: state.newProject.deadline,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    enterProjectName: (e) => dispatch({type: 'ENTER_PROJECTNAME', payload: e.target.value}),
    enterProjectLeader: (e) => dispatch({type: 'ENTER_PROJECTLEADER', payload: e.target.value})
  }
}

export class index extends Component {
  render() {
    return (
      <div>
        <form action="">
            <p>Project name:</p>
            <input 
                type="text"
                value={this.props.projectName}
                onChange={this.props.enterProjectName}
            
            />
            <p>Project leader:</p>
            <input 
                type="text"
                value={this.props.projectLeader}
                onChange={this.props.enterProjectLeader}
            />
            <p>Deadline (TEST SO FAR):</p>
            <input type="text"/>
            <br />
            <button>
                Start project!
            </button>
        </form>
      </div>
    )
  }
}

export const NewProject = connect(mapStateToProps, mapDispatchToProps)(index)
export default NewProject