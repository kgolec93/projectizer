import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

class index extends Component {
  render() {
    return (
      <div>
        <ul style={{listStyle:'none'}}>
            <li>Task 1</li>
            <li>Task 2</li>
            <li>Task 3</li>
            <li>Task 4</li>
            <li>Task 5</li>
        </ul>
        <input type="text"/>
        <button>ADD TASK</button>
      </div>
    )
  }
}

export const Tasks = connect(mapStateToProps, mapDispatchToProps)(index)
export default Tasks

