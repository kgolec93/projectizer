import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import '../TaskItem/TaskItemStyle.css'
import tickIcon from '../../assets/icons/tick.svg'
import editIcon from '../../assets/icons/edit.svg'
import deleteIcon from '../../assets/icons/delete.svg'

const mapStateToProps = state => {
    return{
        firebaseUserData: state.global.firebaseUserData,
        selectedProject: state.global.selectedProject
    }
}

class index extends Component {

    constructor() {
        super();
        this.state = {
            isEditing: false,
            newText: ''
        }
    }

    // REMOVING CERTAIN ITEM
    removeItem = () => {
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks/${this.props.itemKey}`)
        .remove()
    }

    // CHANGE STATUS
    toggleStatus = () => {
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks/${this.props.itemKey}/isDone`)
        item.once('value', snapshot => {
           const status = !snapshot.val();
           item.set(status);
        })
    }

    // EDITING TODO ITEM
    editItem = () => {
        this.setState({
            isEditing: true,
            newText: this.props.text
        })
    }

    // SAVE CHANGES IN TODO ITEM
    saveItem = () => {
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks/${this.props.itemKey}/text`)
        item.set(this.state.newText);
        
        this.setState({
            isEditing: false
        })
    }

    // CONTROLLED INPUT
    handleChange = (e) => {
        this.setState({
            newText: e.target.value
        })
    }
    

    render() {
        if (this.state.isEditing === false) {
            return (
                <div className='projectTaskContainer' className={this.props.status ? 'taskItemDone projectTaskContainer' : 'projectTaskContainer'}>
                    <div style={{flex: '1'}} onClick={this.toggleStatus}>
                        {this.props.status ? 
                            <div className="taskStatusButton">
                                <img src={tickIcon} className='taskItemIcon' alt=""/>
                            </div> 
                            : 
                            <div className="taskStatusButton">
                                
                            </div> 
                        }
                    </div>
                    <p style={{flex:10}}>{this.props.text}</p>
                    {/* <p style={{flex:2}}>
                        <Moment format="YYYY/MM/DD">
                            {this.props.date}
                        </Moment>
                    </p> */}
                    <div style={{flex: '1'}} >
                        <div onClick={this.editItem} className="taskIconButton">
                            <img src={editIcon} className='taskItemIcon' />
                        </div>
                    </div>
                    <div style={{flex: '1'}}>
                        <div onClick={this.removeItem} className="taskIconButton">
                            <img src={deleteIcon} className='taskItemIcon' style={{padding: '4px'}} />
                        </div>
                    </div>
                </div>
            )
        }

        else if (this.state.isEditing === true) {
            return (
                <div className='projectTaskContainer'>
                    <input 
                        value={this.state.newText}
                        onChange={this.handleChange} 
                    />
                    <div onClick={this.saveItem} className='taskSaveButton hover'><p>SAVE</p></div>
                </div>
            )
        }
    }
}



  export const ProjectTask = connect(mapStateToProps)(index)
  export default ProjectTask
  



