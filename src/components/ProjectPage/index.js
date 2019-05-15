import React, { Component } from 'react'
import { connect } from 'react-redux'
import { projectData as data } from '../../testData/DevDatabase';
import  firebase from 'firebase';

const mapStateToProps = state => {
  return{
    commentInputVisible: state.projectPage.isCommentInputVisible,
    taskInputVisible: state.projectPage.isTaskInputVisible,
    taskInput: state.projectPage.taskInput,
    data: state.projectPage.currentProjectData,
    loggedUser: state.signIn.loggedUser,
    commentInput: state.projectPage.commentInput
  }
}

const mapDispatchToProps = dispatch => {
  return{
    toggleNewComment:() => dispatch({type: 'TOGGLE_NEW_COMMENT'}),
    toggleNewTask:() => dispatch({type: 'TOGGLE_NEW_TASK'}),
    loadDataToState:(data) => dispatch({type: 'LOAD_DATA', payload: data}),
    enterTask:(e) => dispatch({type: 'ENTER_TASK', payload: e.target.value}),
    enterComment:(e) => dispatch({type: 'ENTER_COMMENT', payload: e.target.value}),
    addTask:() => dispatch({type: 'ADD_TASK'}),
    addComment:() => dispatch({type: 'ADD_COMMENT'}),
  }
}



const taskStyle = {
  display: 'flex',
  width: '90%',
  padding: '10px',
  justifyContent: 'space-between',
  backgroundColor: '#b0b4ba',
  margin: '5px auto'
}
const commentStyle = {
  width: '90%',
  padding: '10px',
  justifyContent: 'space-between',
  backgroundColor: '#b0b4ba',
  margin: '5px auto'
}

export class index extends Component {

  addTask = () => {
    data.tasks.push({
      name: this.props.taskInput,
      date: '14.04.2019',
      isDone: false
    });
    this.props.addTask();
  }

  addComment = () => {
    data.comments.push({
      author: this.props.loggedUser,
      date: '14.04.2019',
      text: this.props.commentInput
    });
    this.props.addComment();
  }

  render() {
    if (this.props.data !== null) {
      return (
        <div>
          <h2>{data.name}</h2>
          <p>Project leader: {this.props.data.leader}</p>
          <p>{this.props.data.status}</p>
          <p>{this.props.data.statusCustom}</p>
          <h3>Tasks</h3>
            {this.props.data.tasks.map(item => (
              <div style={taskStyle}>
                <p>{item.name}</p>
                <p>{item.date}</p>
              </div>
            ))}
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
            <h3>Comments</h3>
            {this.props.data.comments.map(item => (
              <div style={commentStyle}>
                <div style={{display: 'flex'}}>
                  <p>{item.author}</p>
                  <p>{item.date}</p>
                </div>
                <div>
                  <p>{item.text}</p>
                </div>
              </div>
  
            ))}
            
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
      )
    }
    else {
      return(
        <p>Data loading</p>
      )
    }
  }

  // componentDidMount() {
  //   this.props.loadDataToState(data);
  // }


}

export const ProjectPage = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectPage
