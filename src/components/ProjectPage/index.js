import React, { Component } from 'react'
import { connect } from 'react-redux'
import  firebase from 'firebase'
import Loader from '../Loader'
import ProjectTask from '../ProjectTask'
import ProjectComment from '../ProjectComment'
import Moment from 'react-moment'

const statusList = 
[
  '',
  'To do',
  'In progress',
  'Done'
]

const mapStateToProps = state => {return {
    commentList: Object.keys(state.projectPage.comments || {}).map(
      key => ({
        ...state.projectPage.comments[key],
        key: key,
      }),
    ).reverse(),    
    taskList: Object.keys(state.projectPage.tasks || {}).map(
      key => ({
        ...state.projectPage.tasks[key],
        key: key,
      }),
    ),
    data: state.projectPage.currentProjectData,
    commentInputVisible: state.projectPage.isCommentInputVisible,
    taskInputVisible: state.projectPage.isTaskInputVisible,
    taskInput: state.projectPage.taskInput,
    loggedUser: state.global.loggedUser,
    commentInput: state.projectPage.commentInput,
    firebaseUserData: state.global.firebaseUserData,
    selectedProject: state.global.selectedProject,
    status: state.projectPage.status,
    customStatus: state.projectPage.statusInput,
    statusInput: state.projectPage.isStatusInputVisible,
    statusList: state.projectPage.isStatusListVisible
  }
}

const mapDispatchToProps = dispatch => {
  return{
    //// TO BE CHANGED TO COMPONENT STATE
    toggleNewComment:() => dispatch({type: 'TOGGLE_NEW_COMMENT'}),
    //// TO BE CHANGED TO COMPONENT STATE
    toggleNewTask:() => dispatch({type: 'TOGGLE_NEW_TASK'}),
    //// TO BE CHANGED TO COMPONENT STATE
    enterTask:(e) => dispatch({type: 'ENTER_TASK', payload: e.target.value}),
    //// TO BE CHANGED TO COMPONENT STATE
    enterComment:(e) => dispatch({type: 'ENTER_COMMENT', payload: e.target.value}),
    //// TO BE CHANGED TO COMPONENT STATE
    changeCustomStatus: (e) => dispatch({type: 'ENTER_STATUS', payload: e.target.value}),
    //// TO BE CHANGED TO COMPONENT STATE
    addTask:() => dispatch({type: 'ADD_TASK'}),
    //// TO BE CHANGED TO COMPONENT STATE
    addComment:() => dispatch({type: 'ADD_COMMENT'}),  
    //// TO BE CHANGED TO COMPONENT STATE
    toggleStatusInput: () => dispatch({type: 'TOGGLE_STATUS_INPUT'}),
    //// TO BE CHANGED TO COMPONENT STATE
    toggleStatusList: () => dispatch({type: 'TOGGLE_STATUS_LIST'}),

    projectData: (data) => dispatch({type: 'LOAD_DATA', payload: data}),
    createList: (data) => dispatch({type: 'CREATE_PROJECT_LISTS', payload: data}),
    closeProject: () => dispatch({type: 'CLOSE_PROJECTPAGE'}),
    changeStatus: (status) => dispatch({type: 'CHANGE_STATUS', payload: status}),
  }
}



export class index extends Component {
  constructor() {
    super();
    this.state = {
      customStatus: this.props,
      participantFunction: '',
      participantName: '',
      participantEmail: '',
      participantNumber: ''
    }
  }

  componentDidMount() {
    if (this.props.selectedProject !== null) {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
      .on('value', snapshot => {
        console.log("CHANGE DATA");
        console.log(snapshot.val());
        this.props.projectData(snapshot.val());
        this.props.createList(snapshot.val());
      })
    }
  }

  addTask = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks`)
    .push({
      date: Date.now(),
      text: this.props.taskInput,
      isDone: false
    })
    this.props.addTask();
  }

  changeStatus = (e) => {    

    this.props.changeStatus(e.target.value);
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      status: e.target.value
    })
    this.props.toggleStatusList();

  }

  addComment = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/comments`)
    .push({
      author: this.props.loggedUser,
      date: Date.now(),
      text: this.props.commentInput
    })
    this.props.addComment();
  }

  closeWindow = () => {
    this.props.closeProject();
  }

  removeProject = () => {
    
    this.props.closeProject();
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .remove();
    this.closeWindow();
  }

  participantDetails = () => {
    console.log('works')
  }

  changeCustomStatus = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      customStatus: this.props.customStatus
    })
    this.props.toggleStatusInput();
  }

  enterParticipant = (e) => {
    switch (e.target.name) {
      case 'participantFunction':
      this.setState({participantFunction: e.target.value});
        break

      case 'participantName':
        this.setState({participantName: e.target.value});
        break
        
      case 'participantEmail':
        this.setState({participantEmail: e.target.value});
        break

      case 'participantNumber':
        this.setState({participantNumber: e.target.value});
        break

      default:
        return (this.state)
    }
  }

  addParticipant = (event) => {
    event.preventDefault();
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/participants`)
    .push({
      function: this.state.participantFunction,
      name: this.state.participantName,
      email: this.state.participantEmail,
      number: this.state.participantNumber,
    })
    this.setState({
      participantName: '',
      participantFunction: '',
      participantEmail: '',
      participantNumber: '',
    })
  }

  render() {
    if (this.props.data !== null) {
      return (
        <div className="blackout" >
          <div className="projectWindow">
          <h1 onClick={this.closeWindow}>X</h1>
          <h2 style={textStyle}>{this.props.data.name}</h2>
          <p style={textStyle}>Project leader: {this.props.data.leader}</p>
          <p style={textStyle}>Deadline:&nbsp; 
            <Moment format="YYYY/MM/DD">
                {this.props.data.deadline}
            </Moment>
          </p>
          <p style={textStyle}>Started on&nbsp;
            <Moment format="YYYY/MM/DD">
              {this.props.data.dateAdded}
            </Moment>
          </p>

        {/* STATUS LIST CHANGE - IN PROGRESS */}
          {this.props.statusList ? 
            <select onChange={this.changeStatus}>
              {statusList.map(item => (
                <option>{item}</option>
              ))}
            </select>
            :
            <p onClick={this.props.toggleStatusList}>
              {this.props.status}
            </p>
          }

        {/* CHANGE CUSTOM STATUS */}
          
          {this.props.statusInput ?
            <div>
              <form onSubmit={this.changeCustomStatus}>
                <input required type="text" value={this.props.customStatus} onChange={this.props.changeCustomStatus} />
                <button type="submtit">
                  Update
                </button>
              </form>

            </div>
            :
            <p style={textStyle} onClick={this.props.toggleStatusInput}>{this.props.data.customStatus ? this.props.data.customStatus : 'No status set'}</p>
          }

          <br />
          <br />
          <p onClick={this.removeProject}>REMOVE PROJECT (TEST)</p>
          <hr />


        {/* PARTICIPANTS LIST */}
          <h3>Participants</h3>
          {/* project leader is outside the list!! */}
          <p>Project Leader: {this.props.data.leader}</p>

          
          {/* map of project participants */}
          <p onMouseOver={this.participantDetails}>Project manager: Andrzej Nowak</p>
          {/* map of project participants end */}

          <form onSubmit={this.addParticipant}>
            <input
              type='text'
              required
              name='participantFunction'
              onChange={this.enterParticipant}
              value={this.state.participantFunction}
              placeholder="Function"
            />
            <input
              type='text'
              required
              name='participantName'
              onChange={this.enterParticipant}
              value={this.state.participantName}
              placeholder="Name"
            />
            <input
              type='email'
              name='participantEmail'
              onChange={this.enterParticipant}
              value={this.state.participantEmail}
              placeholder="Email"
            />
            <input
              type='number'
              name='participantNumber'
              onChange={this.enterParticipant}
              value={this.state.participantNumber}
              placeholder="Phone number"
            />
            <button type="submit">Add participant</button>
          </form>


        {/* TASK LIST & TASK INPUT */}
          <h3>Tasks</h3>
          {this.props.taskList !== null && 
            <div>
              {this.props.taskList.map(item => (
                <ProjectTask
                  text={item.text}
                  date={item.date}
                  status={item.isDone}
                  itemKey={item.key}
                />
              ))}
            </div>
          }

            <button onClick={this.props.toggleNewTask}>Add task</button>
            {this.props.taskInputVisible === true &&
              <div>
                <input 
                  value={this.props.taskInput}
                  onChange={this.props.enterTask}
                />
                <button onClick={this.addTask}>Add!</button>
              </div>
            }
          <hr />


        {/* COMMENT LIST & COMMENT INPUT */}
          <h3>Comments</h3>
          {this.props.commentList !== null &&
            <div>
              {this.props.commentList.map(item => (
                <ProjectComment 
                      author={item.author}   
                      date={item.date}    
                      text={item.text}   
                      itemKey={item.key}          
                />
              ))}
            </div>
          }

          <button onClick={this.props.toggleNewComment}>Add comment</button>
            {this.props.commentInputVisible === true &&
              <div>
                <textarea name="" id="" cols="30" rows="10"
                  value={this.props.commentInput}
                  onChange={this.props.enterComment}
                ></textarea><br />
                <button onClick={this.addComment}>Add!</button>
              </div>
            } 

          </div>
        </div>
      )
    }
    else {
      return(
        <Loader />
      )
    }
  }
}

const textStyle = {
  color: 'white'
}





export const ProjectPage = connect(mapStateToProps, mapDispatchToProps )(index)
export default ProjectPage
