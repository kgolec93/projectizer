import React, { Component } from 'react'
import { connect } from 'react-redux'
import  firebase from 'firebase'
import Loader from '../Loader'
import ProjectTask from '../ProjectTask'
import ProjectComment from '../ProjectComment'
import Moment from 'react-moment'
import ParticipantItem from '../ParticipantItem'
import { Link } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import iconPencil from '../../assets/icons/pencil.svg'

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
    enterTask:(e) => dispatch({type: 'ENTER_TASK', payload: e.target.value}),
    //// TO BE CHANGED TO COMPONENT STATE
    enterComment:(e) => dispatch({type: 'ENTER_COMMENT', payload: e.target.value}),
    //// TO BE CHANGED TO COMPONENT STATE
    changeCustomStatus: (e) => dispatch({type: 'ENTER_STATUS', payload: e.target.value}),
    //// TO BE CHANGED TO COMPONENT STATE
    addTask:() => dispatch({type: 'ADD_TASK'}),
    //// TO BE CHANGED TO COMPONENT STATE
    addComment:() => dispatch({type: 'ADD_COMMENT'}),  

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
      isTaskInputVisible: false,
      isCommentInputVisible: false,
      editName: false,
      editNameInput: '',
      editLeader: false,
      editLeaderInput: '',
      editCustomStatus: false,
      editCustomStatusInput: '',
      editStatusList: false,
      editStatusListInput: '',
      taskErrorMessage: 'Enter task name',
      commentErrorMessage: '',
      isDeadlineEdited: false,
      isHighlited: ''
    }
  }

  componentDidMount() {
    if (this.props.selectedProject !== null) {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
      .on('value', snapshot => {
        this.props.projectData(snapshot.val());
        this.props.createList(snapshot.val());
      })
    }
  }

  toggleNewTask = () => {
    this.setState({isTaskInputVisible: !this.state.isTaskInputVisible})
  }

  addTask = () => {
    if (this.props.taskInput.trim() !== '') {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks`)
      .push({
        date: Date.now(),
        text: this.props.taskInput,
        isDone: false
      })
      this.props.addTask();
      this.toggleNewTask();
    }
    else {
      this.setState({
        taskErrorMessage: 'You need to type something!'
      })
    }

  }

  toggleNewComment = () => {
    this.setState({isCommentInputVisible: !this.state.isCommentInputVisible})
  }

  addComment = () => {
    if (this.props.commentInput.trim() !== '') {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/comments`)
      .push({
        author: this.props.loggedUser,
        date: Date.now(),
        text: this.props.commentInput
      })
      this.props.addComment();
      this.toggleNewComment();
    }
    else {
      this.setState({
        commentErrorMessage: 'You need to write something!'
      })
    }
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
      isParticipantFormVisible: false
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

  toggleDeadline = () => {
    this.setState({isDeadlineEdited: !this.state.isDeadlineEdited})
  }

  editDeadline = (date) => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .update({
      deadline: `${date}`
    })
    this.toggleDeadline();
  }

  highlightItem = (e) => {
      this.setState({isHighlited: e.target.id})
  }

  removeHighlight = () => {
    this.setState({isHighlited: ''})
    console.log(this.state.isHighlited)
  }


  ////////////////////////////////////////

  render() {
    if (this.props.data !== null) {
      return (
        <div className="projectWindow">
          <div>
            <Link to="/projects" className="link">
              <button className='statusButton hover' style={{padding: '4px', background: 'none'}} onClick={this.closeWindow}>Go back</button>
            </Link>
          </div>


          {/* EDITABLE PROJECT NAME */}
          <div className='projectHeader'>
            {this.state.editName ? 
            <div style={{flex: 5}} className='projectHeaderForm'>
              <input 
                className='projectHeaderInput'
                name='editName'
                value={this.state.editNameInput}
                onChange={this.enterValue}
                type="text"
              />
              <button className='projectHeaderButton' onClick={this.updateName}>Update</button>
            </div>
            :
            <div style={{
              flex: 5,
              display: 'flex',
              alignItems: 'center'

              }}>
              <h2 
                id="projectNameHighlight" 
                className="hover" 
                onClick={this.toggleEditName}
                onMouseEnter={this.highlightItem}
                onMouseLeave={this.removeHighlight}
              >
              {this.props.data.name}</h2>
              <img 
                className={this.state.isHighlited === 'projectNameHighlight' && 'pencilVisible'} 
                src={iconPencil} 
                style={iconStyle}
                alt=""
              />
            </div>
            }

            {/* PROJECT DEADLINE */}
            {this.state.isDeadlineEdited ? 
            <div>
              <DatePicker 
                className='editDeadline hover'
                onChange={this.editDeadline}
                selected={new Date(this.props.data.deadline)}                
              />
              <button onClick={this.toggleDeadline} className='addContentButtonDark hover'>Cancel</button>
            </div>
            :
            <p style={{flex: 1}} onClick={this.toggleDeadline} className='statusButton hover'>Deadline:&nbsp; 
              <Moment format="YYYY/MM/DD">
                  {this.props.data.deadline}
              </Moment>
            </p>
            }


            {/* STATUS LIST CHANGE */}          
            {this.state.editStatusList ? 
              <select style={{flex: 1}} onChange={this.changeStatus} >
                  <option value='' defaultValue>Change status</option>
                  <option value='To do'>To do</option>
                  <option value='In progress'>In progress</option>
                  <option value='Done'>Done</option>
              </select>
              :
                <p onClick={this.toggleEditStatusList} className='statusButton hover' >
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
            <div className='projectHeaderForm'>
              <input 
                className='projectHeaderInput'
                name='editLeader'
                value={this.state.editLeaderInput}
                onChange={this.enterValue}
                type="text"
              />
              <button 
                className='projectHeaderButton' 
                onClick={this.updateLeader}
              >
              Update
              </button>
            </div>
            :
            <div 
              className="projectTextContainer" 
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <h4 
                style={{fontWeight: 200}}
              >
              Project leader: &nbsp;
                <span 
                  id='projectLeaderHighlight'
                  onMouseEnter={this.highlightItem}
                  onMouseLeave={this.removeHighlight} 
                  className="hover" 
                  onClick={this.toggleEditLeader} 
                  style={{fontWeight: 400}}
                >{this.props.data.leader}</span></h4>
              <img 
                className={this.state.isHighlited === 'projectLeaderHighlight' && 'pencilVisible'} 
                src={iconPencil} 
                style={iconStyle}
                alt=""
              />
            </div>
            }
          </div>

        {/* CHANGE CUSTOM STATUS */}
          {this.state.editCustomStatus ?
            <div>
              <form 
                onSubmit={this.changeCustomStatus}
                className='projectHeaderForm'
              >
                <input 
                  className='projectHeaderInput'
                  required 
                  type="text" 
                  name='editCustomStatus'
                  value={this.state.editCustomStatusInput} 
                  onChange={this.enterValue} 
                />
                <button
                  className='projectHeaderButton'
                  type="submtit"
                >
                  Update
                </button>
              </form>
            </div>
            :
            <div 
              className="projectTextContainer" 
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <h4 style={{fontWeight: 200}}>
                Status: &nbsp;
                <span
                  id='projectStatusHighlight'
                  onMouseEnter={this.highlightItem}
                  onMouseLeave={this.removeHighlight}  
                  className="hover" 
                  onClick={this.toggleEditCustomStatus} 
                  style={{fontWeight: 400}}
                >
                {this.props.data.customStatus}</span></h4>
                <img 
                  className={this.state.isHighlited === 'projectStatusHighlight' && 'pencilVisible'} 
                  src={iconPencil} 
                  style={iconStyle}
                  alt=""
                />
            </div>
          }
          <hr className='projectHR' />

        {/* PARTICIPANTS LIST */}
          <h3>Participants</h3>     

          {this.state.isParticipantFormVisible ? 
            <div className='projectpageAddButton' >
              <form onSubmit={this.addParticipant} 
                style={
                  {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }
                }>
                <input 
                  className='participantInput'
                  type='text'
                  required
                  name='participantFunction'
                  onChange={this.enterParticipant}
                  value={this.state.participantFunction}
                  placeholder="Function"
                />
                <input
                  className='participantInput'
                  type='text'
                  required
                  name='participantName'
                  onChange={this.enterParticipant}
                  value={this.state.participantName}
                  placeholder="Name"
                />
                <input
                  className='participantInput'
                  type='email'
                  name='participantEmail'
                  onChange={this.enterParticipant}
                  value={this.state.participantEmail}
                  placeholder="Email"
                />
                <input
                  className='participantInput'
                  type='number'
                  name='participantNumber'
                  onChange={this.enterParticipant}
                  value={this.state.participantNumber}
                  placeholder="Phone number"
                />
                <button className='projectPageAddContentButton hover' style={{flex: 1}} type="submit">Add</button>
                <button className='projectPageAddContentButton hover' style={{flex: 1}}  onClick={this.toggleParticipantForm}>Cancel</button>
              </form>
            </div>
            :          
            <div className='projectpageAddButton hover' onClick={this.toggleParticipantForm}>
              <p style={{width: '100%', fontSize: '0.9rem'}}>Add participant</p>
            </div>
          }

          {/* map of project participants */}
          {this.props.participantsList.length !== 0 &&
            <div>
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
            </div>
          }
          {this.props.participantsList.length === 0 &&
            <p className='emptyListMessage'>You have added no participants yet!</p>
          }

          
        <hr className='projectHR' />
        {/* TASK LIST & TASK INPUT */}
          <h3>Tasks</h3>

          {this.state.isTaskInputVisible ?
            <div className='projectpageAddButton' >
              <input 
                placeholder={this.state.taskErrorMessage}
                className='participantInput'
                style={{flex: 5}}
                value={this.props.taskInput}
                onChange={this.props.enterTask}
              />
              <button 
                style={{flex: 1}}
                className='projectPageAddContentButton hover' 
                onClick={this.addTask}
              >
              Add!
              </button>
              <button 
                style={{flex: 1}}
                className='projectPageAddContentButton hover' 
                onClick={this.toggleNewTask}
              >
              Cancel
              </button>
            </div>
            :
            <button 
              className='projectpageAddButton hover' 
              onClick={this.toggleNewTask}
            >
              <p style={{width: '100%', fontSize: '0.9rem'}}>Add task</p>
            </button>
          }

          {this.props.taskList.length !== 0 &&
            <div>
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
            </div>
          }
          {this.props.taskList.length === 0 &&
            <p className='emptyListMessage'>You have added no tasks yet!</p>          
          }

          <hr className='projectHR' />


        {/* COMMENT INPUT */}
          <h3>Comments</h3>
          {this.state.isCommentInputVisible ?
            <div>
              <textarea 
                placeholder={this.state.commentErrorMessage}
                className='projectCommentInput'
                name="" 
                cols="20" 
                rows="10"
                value={this.props.commentInput}
                onChange={this.props.enterComment}
              ></textarea><br />
              <div 
                style={{
                    width: '50%',
                    display: 'flex'
                }}
              >
                <button 
                  className='projectPageAddContentButton hover' 
                  onClick={this.addComment}
                  style={{
                    flex: 1,
                    backgroundColor: '#373f61'
                  }}
                >
                Add!
                </button>
                <button 
                  style={{
                    flex: 1,
                    backgroundColor: '#373f61'
                  }}
                  className='projectPageAddContentButton hover' 
                  onClick={this.toggleNewComment}
                >
                Cancel
                </button>
              </div>
            </div>
            :
            <button className='projectpageAddButton hover' onClick={this.toggleNewComment}>
              <p style={{width: '100%', fontSize: '0.9rem'}}>Add comment</p>
            </button>
          } 
          {/* COMMENTS LIST */}

          {this.props.commentList.length !== 0 &&
            <div>
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
            </div>
          }
          {this.props.commentList.length === 0 && 
            <p className='emptyListMessage'>You have added no comments yet!</p>                    
          }

            <br />


            <div
              className='projectpageAddButton hover'
              style={{fontSize: '0.9rem'}}
            >
              {this.state.isConfirmationWindow ? 
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <p
                    style={{flex: 5, textAlign:'left'}}
                  >Are you sure? You cannot undo this action!</p>
                  <button 
                    style={{flex: 1}}
                    className='projectPageAddContentButton hover'
                    onClick={this.removeProject}
                  >
                  Yes, remove project
                  </button>
                  <button 
                    style={{flex: 1}}
                    className='projectPageAddContentButton hover'
                    onClick={this.toggleConfirmationWindow}
                  >
                  Cancel</button>
                </div>
                :
                <p
                  style={{width: '100%', textAlign: 'center'}} 
                  onClick={this.toggleConfirmationWindow}
                >
                Remove project
                </p> 
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

const iconStyle = {
  display: 'none',
  height: '16px',
  width: 'auto',
  margin: '0px 8px',
  opacity: '0.7'
}

export const ProjectPage = connect(mapStateToProps, mapDispatchToProps )(index)
export default ProjectPage
