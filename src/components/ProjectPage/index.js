import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { projectData as data } from '../../testData/DevDatabase';
import  firebase from 'firebase';
import NewProject from '../NewProject/NewProject';
import Loader from '../Loader'
import ProjectTask from '../ProjectTask'
import ProjectComment from '../ProjectComment'
import Moment from 'react-moment'

const statusList = 
[
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
  }
}

const mapDispatchToProps = dispatch => {
  return{
    toggleNewComment:() => dispatch({type: 'TOGGLE_NEW_COMMENT'}),
    toggleNewTask:() => dispatch({type: 'TOGGLE_NEW_TASK'}),
    enterTask:(e) => dispatch({type: 'ENTER_TASK', payload: e.target.value}),
    enterComment:(e) => dispatch({type: 'ENTER_COMMENT', payload: e.target.value}),
    addTask:() => dispatch({type: 'ADD_TASK'}),
    addComment:() => dispatch({type: 'ADD_COMMENT'}),
    projectData: (data) => dispatch({type: 'LOAD_DATA', payload: data}),
    createList: (data) => dispatch({type: 'CREATE_PROJECT_LISTS', payload: data}),
    closeProject: () => dispatch({type: 'CLOSE_PROJECTPAGE'}),
    changeStatus: (status) => dispatch({type: 'CHANGE_STATUS', payload: status})
  }
}



export class index extends Component {
  constructor() {
    super();
    this.state = {
      
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
    this.props.changeStatus(e.target.value)
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

  test = () => {
    console.log(this.props.taskList.length)
  }

  removeProject = () => {
    
    this.props.closeProject();
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}`)
    .remove();
    this.closeWindow();
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
          <select onChange={this.changeStatus}>
            {statusList.map(item => (
              <option>{item}</option>
            ))}
          </select>





          {/* FUNCTION TO BE DONE */}
          <p style={textStyle}>{this.props.data.customStatus}</p>
          <p>EDIT STATUS</p>


          <br />
          <br />
          <p onClick={this.removeProject}>REMOVE</p>
          <hr />

        {/* TASK LIST & TASK INPUT */}
          <h3 onClick={this.test}>Tasks</h3>
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
