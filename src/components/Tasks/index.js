import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskItem from '../TaskItem'
import firebase from 'firebase'
import Loader from '../Loader'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import addIcon from '../../assets/icons/add.svg'


const mapStateToProps = state => {
  return {
    taskList: Object.keys(state.task.tasks || {}).map(
      key => ({
        ...state.task.tasks[key],
        key: key,
      })
    ).reverse(),
    firebaseUserData: state.global.firebaseUserData,
    userData: state.global.userData,
    tasks: state.task.tasks,
    deadline: state.task.deadline
  }
}

const mapDispatchToProps = dispatch => {
    return {
      updateData: (data) => dispatch({type: 'UPDATE_TASK_DATA', payload: data}),
      createTaskList: (data) =>dispatch({type: 'CREATE_TASK_LIST', payload: data}),
      calendarChange: (date) => dispatch({type: 'SELECT_TASK_DEADLINE', payload: date.getTime()}),

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
      taskInput: '',
      isInputVisible: false,
      errorMsg: false,
      date: new Date(),
    }
  }

  addTask = () => {
    if (this.state.taskInput !== '') {
      firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks`)
      .push({
        date: new Date(this.state.date).toString(),
        text: this.state.taskInput,
        isDone: false
      })
      this.setState({
        isInputVisible: false,
        taskInput: '',
        date: new Date(),
        errorMsg: false
      })
      console.log(`${this.state.date}`)
    }
    else {
      this.setState({errorMsg: true})
    }

  }

  taskInput = (e) => {
    this.setState({
      taskInput: e.target.value
    })
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.addTask()
    }
  }

  test = () => {
    console.log(this.props.taskList)
  }

  toggleTaskInput = () => {
    this.setState({
      isInputVisible: !this.state.isInputVisible,
      errorMsg: false
    })
  }

  enterDate = (date) => {
    this.setState({
      date: date
    })
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
          {/* New task input form */}
          {this.state.isInputVisible === true &&
            <div className='newTask'>
              <input 
                required
                value={this.state.taskInput}
                onChange={this.taskInput}
                placeholder="Enter task name"
                onKeyUp={this.handleEnter}
              />
              <DatePicker
                className='taskDatepicker'
                onChange={this.enterDate}
                selected={this.state.date}
                placeholderText="Choose deadline date"
              />
              <button 
                className='hover'
                onClick={this.addTask} 
                style={{flex: 1}}>Add!
              </button>
              <button 
                className='hover'
                onClick={this.toggleTaskInput} 
                style={{flex: 1}}>Cancel
              </button>

              {this.state.errorMsg ?
                <p>
                  Name field cannot be empty
                </p>
                :
                <p></p>
              }
            </div>
          }

          {/* If no tasks on the loaded list */}
          {this.props.taskList.length === 0 &&
            <h2 className='nullListMessage hover' onClick={this.toggleTaskInput}>You have no tasks started. Click here to add the first one</h2>
          }

            {/* If there are tasks on the list */}
            {this.props.taskList.length !== 0 &&
              <div>

              {this.state.isInputVisible === false &&
                <div onClick={this.toggleTaskInput} className='addButton hover'> 
                  <p>Add new task!</p><img src={addIcon} style={iconStyle} alt=""/>
                </div>
              }

                {this.props.taskList.map(item => (
                  <TaskItem
                    text={item.text}
                    date={item.date}
                    date2={item.date}
                    status={item.isDone}
                    itemKey={item.key}
                  />
                ))}
              </div>
            }
          </div>
        }  




      </div>
    )
  }
}


const iconStyle = {
  display: 'inline-block',
  height: '40px',
  width: 'auto',
  opacity: '0.5',
  margin: '8px'
}

export const Tasks = connect(mapStateToProps, mapDispatchToProps)(index)
export default Tasks



