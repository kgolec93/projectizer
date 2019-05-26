import React, { Component } from 'react'
import { connect } from 'react-redux'
import  firebase from 'firebase'
import Loader from '../Loader'
import ProjectTask from '../ProjectTask'
import ProjectComment from '../ProjectComment'
import Moment from 'react-moment'
import ParticipantItem from '../ParticipantItem'
import { Link } from 'react-router-dom'

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
    ).reverse(),
    participantsList: Object.keys(state.projectPage.participants || {}).map(
      key => ({
        ...state.projectPage.participants[key],
        key: key,
      })
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
      participantFunction: '',
      participantName: '',
      participantEmail: '',
      participantNumber: '',
      isParticipantFormVisible: false,
      isConfirmationWindow: false,
      isParticipantDetailsVisible: false,
      editName: false,
      editNameInput: '',
      editLeader: false,
      editLeaderInput: '',
      editCustomStatus: false,
      editCustomStatusInput: '',
      editStatusList: false,
      editStatusListInput: ''
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
      customStatus: this.state.editCustomStatusInput
    })
    this.setState({editCustomStatus: false, editCustomStatusInput: ''})
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

  enterValue = (e) => {
    switch (e.target.name) {
      case 'editName':
        this.setState({editNameInput: e.target.value})
        break
      case 'editLeader':
        this.setState({editLeaderInput: e.target.value})
        break      
      case 'editCustomStatus':
        this.setState({editCustomStatusInput: e.target.value})
        break
      default:
        return (this.state)
    }
  }

  toggleParticipantForm = () => {
    this.setState({isParticipantFormVisible: !this.state.isParticipantFormVisible})
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

  toggleDetails = () => {
    this.setState({isParticipantDetailsVisible: !this.state.isParticipantDetailsVisible})
  }

  toggleConfirmationWindow = () => {
    this.setState({isConfirmationWindow: !this.state.isConfirmationWindow})
  }

  //// Edit project name functionality 
  toggleEditName = () => {
    this.setState({editName: !this.state.editName, editNameInput: this.props.data.name})
  }

  updateName = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      name: this.state.editNameInput
    })
    this.setState({editName: false, editNameInput: ''})
  }

  //// Edit project leader functionality 
  toggleEditLeader = () => {
    this.setState({editLeader: !this.state.editLeader, editLeaderInput: this.props.data.leader})
  }

  updateLeader = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      leader: this.state.editLeaderInput
    })
    this.setState({editLeader: false, editLeaderInput: ''})
  }

  //// Edit custom status functionality
  toggleEditCustomStatus = () => {
    this.setState({editCustomStatus: !this.state.editCustomStatus, editCustomStatusInput: this.props.data.customStatus})
  }

  updateCustomStatus = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      customStatus: this.state.editLeaderInput
    })
    this.setState({editCustomStatus: false, editCustomStatusInput: ''})
  }

  toggleEditStatusList = () => {
    this.setState({editStatusList: !this.state.editStatusList})
  }

  changeStatus = (e) => {
    // this.props.changeStatus(e.target.value);
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      status: e.target.value
    })
    this.toggleEditStatusList();
  }

  testPart = (e) => {
    console.log(e.target.key)
  }

  ////////////////////////////////////////

  render() {
    if (this.props.data !== null) {
      return (
        <div className="projectWindow">
          <Link to="/projects" className="link">
            <p onClick={this.closeWindow}>Go back</p>
          </Link>

          {/* EDITABLE PROJECT NAME */}
          <div className='projectHeader'>
            {this.state.editName ? 
            <div style={{flex: 5}}>
              <input 
                name='editName'
                value={this.state.editNameInput}
                onChange={this.enterValue}
                type="text"
              />
              <button onClick={this.updateName}>Update</button>
            </div>
            :
            <div style={{flex: 5}} className="hover" onClick={this.toggleEditName}>
              <h2>{this.props.data.name}</h2>
            </div>
            }

            {/* PROJECT DEADLINE */}
            <p style={{flex: 1}} className='statusButton'>Deadline:&nbsp; 
              <Moment format="YYYY/MM/DD">
                  {this.props.data.deadline}
              </Moment>
            </p>

            {/* STATUS LIST CHANGE */}          
            {this.state.editStatusList ? 
              <select style={{flex: 1}} onChange={this.changeStatus}>
                  <option value='' disabled selected>Change status</option>
                  <option value='To do'>To do</option>
                  <option value='In progress'>In progress</option>
                  <option value='Done'>Done</option>
              </select>
              :
              <p onClick={this.toggleEditStatusList} className='statusButton hover'>
                {this.props.data.status} 
              </p>
            }
          </div>
          <div className='projectTextContainer'>
            <p style={{fontWeight: 100, fontSize: '0.8rem'}}>Started on&nbsp;
              <Moment format="YYYY/MM/DD">
                {this.props.data.dateAdded}
              </Moment>
            </p>
          </div>
          
          <div className='projectHeader2'>
            {/* EDITABLE PROJECT LEADER */}
            {this.state.editLeader ? 
            <div>
              <input 
                name='editLeader'
                value={this.state.editLeaderInput}
                onChange={this.enterValue}
                type="text"
              />
              <button onClick={this.updateLeader}>Update</button>
            </div>
            :
            <div className="hover projectTextContainer" onClick={this.toggleEditLeader}>
              <h4 style={{fontWeight: 200}}>Project leader: <span style={{fontWeight: 400}}>{this.props.data.leader}</span></h4>
            </div>
            }
          </div>

        {/* CHANGE CUSTOM STATUS */}
          {this.state.editCustomStatus ?
            <div>
              <form onSubmit={this.changeCustomStatus}>
                <input 
                  required 
                  type="text" 
                  name='editCustomStatus'
                  value={this.state.editCustomStatusInput} 
                  onChange={this.enterValue} 
                />
                <button type="submtit">
                  Update
                </button>
              </form>
            </div>
            :
            <div className="hover projectTextContainer" onClick={this.toggleEditCustomStatus}>
              <h4 style={{fontWeight: 200}}>Status: <span style={{fontWeight: 400}}>{this.props.data.customStatus}</span></h4>
            </div>
          }
          <hr className='projectHR' />

        {/* PARTICIPANTS LIST */}
          <h3>Participants</h3>     

          {/* map of project participants */}
          {this.props.participantsList !== null &&
            this.props.participantsList.map(item => (
              <ParticipantItem 
                function={item.function}
                name={item.name}
                email={item.email}
                number={item.number}
                itemKey={item.key}
              />
            ))
          }

          {this.state.isParticipantFormVisible ? 
            <div>
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
              <button onClick={this.toggleParticipantForm}>CANCEL</button>
            </div>
            :          
            <button className='projectpageAddButton' onClick={this.toggleParticipantForm}>Add participant</button>
          }
          
        <hr className='projectHR' />
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

            {this.props.taskInputVisible ?
              <div>
                <input 
                  value={this.props.taskInput}
                  onChange={this.props.enterTask}
                />
                <button onClick={this.addTask}>Add!</button>
                <button onClick={this.props.toggleNewTask}>Cancel</button>
              </div>
              :
              <button className='projectpageAddButton' onClick={this.props.toggleNewTask}>Add task</button>
            }

          <hr className='projectHR' />


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

            {this.props.commentInputVisible ?
              <div>
                <textarea name="" id="" cols="30" rows="10"
                  value={this.props.commentInput}
                  onChange={this.props.enterComment}
                ></textarea><br />
                <button onClick={this.addComment}>Add!</button>
                <button onClick={this.props.toggleNewComment}>Cancel</button>
              </div>
              :
              <button className='projectpageAddButton' onClick={this.props.toggleNewComment}>Add comment</button>
            } 
            <br />
            <p onClick={this.toggleConfirmationWindow}>REMOVE PROJECT (TEST)</p>
            
            {/* Remove project confirmation */}
            {this.state.isConfirmationWindow === true &&
            <div>
              <p>Are you sure? You cannot undo this action!</p>
              <button onClick={this.removeProject}>Yes, remove project</button>
              <button onClick={this.toggleConfirmationWindow}>Cancel</button>
            </div>
            }
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
