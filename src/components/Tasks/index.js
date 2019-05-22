import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskItem from '../TaskItem'
import firebase from 'firebase'
import Loader from '../Loader'



const mapStateToProps = state => {
  return {
    taskList: Object.keys(state.task.tasks || {}).map(
      key => ({
        ...state.task.tasks[key],
        key: key,
      })
    ),
    firebaseUserData: state.global.firebaseUserData,
    userData: state.global.userData,
    tasks: state.task.tasks
  }
}

const mapDispatchToProps = dispatch => {
    return {
      updateData: (data) => dispatch({type: 'UPDATE_TASK_DATA', payload: data}),
      createTaskList: (data) =>dispatch({type: 'CREATE_TASK_LIST', payload: data})
    }
}

class index extends Component {
  componentDidMount() {
    if (this.props.firebaseUserData !== undefined) {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}`)
      .on('value', snapshot => {
          this.props.updateData(snapshot.val())
          this.props.createTaskList(snapshot.val())
      })
    }
  }

  constructor() {
    super();
    this.state = {
      taskInput: ''
    }
  }

  addTask = () => {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks`)
      .push({
        date: Date.now(),
        text: this.state.taskInput,
        isDone: false
      })
    this.setState({
      taskInput: ''
    })
  }

  taskInput = (e) => {
    this.setState({
      taskInput: e.target.value
    })
  }

  test = () => {
    console.log(this.props.taskList)
  }

  render() {
    return (
      <div>
        {/* Until the list data is fetched */}
        {this.props.tasks === null &&
          <div>
            <Loader />
          </div>
        }

        {this.props.userData !== null && 

          <div>
            {/* If no tasks on the loaded list */}
            {this.props.taskList.length === 0 &&
              <p>You have no tasks started!</p>
            }

            {/* If there are tasks on the list */}
            {this.props.taskList.length !== 0 &&
              <div>
                {this.props.taskList.map(item => (
                  <TaskItem
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

        {/* New task input form */}
        <div>
          <input 
            value={this.state.taskInput}
            onChange={this.taskInput}
          />
          <button onClick={this.addTask}>Add!</button>
        </div>

      </div>
    )
  }
}

export const Tasks = connect(mapStateToProps, mapDispatchToProps)(index)
export default Tasks

