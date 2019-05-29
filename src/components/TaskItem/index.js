import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import './TaskItemStyle.css'
import tickIcon from '../../assets/icons/tick.svg'
import editIcon from '../../assets/icons/edit.svg'
import deleteIcon from '../../assets/icons/delete.svg'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => {
    return{
        firebaseUserData: state.global.firebaseUserData,
        itemIsEdited: state.task.itemIsEdited
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editItem: (key)=> dispatch({type: 'TOGGLE_EDIT', payload: key})
    }
}

class index extends Component {

    constructor() {
        super();
        this.state = {
            thisItem: '',
            isEditing: false,
            newText: '',
            newDate: ''
        }
    }

    // REMOVING CERTAIN ITEM
    removeItem = () => {
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}`)
        .remove()
    }

    // CHANGE STATUS
    toggleStatus = () => {
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}/isDone`)
        item.once('value', snapshot => {
           const status = !snapshot.val();
           item.set(status);
        })
    }

    // EDITING TODO ITEM
    editItem = () => {
        const selected = this.props.itemKey
              
        this.setState({
            thisItem: selected,
            isEditing: true,
            newText: this.props.text,
            newDate: new Date(this.props.date),
        })
    }

    // SAVE CHANGES IN TODO ITEM
    saveItem = () => {
        console.log(this.state.date)
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}`)
        item.update({
            text: this.state.newText, 
        });
        this.setState({
            isEditing: false,
            newText: '',
            newDate: ''
        })


        this.props.editItem('')
    }

    // CONTROLLED INPUT
    handleChange = (e) => {
        this.setState({
            newText: e.target.value
        })
    }  

    enterDate = (d) => {
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}`)
        .update({
            date: `${d}`, 
        });

        this.setState({
            newDate: d
        })
        console.log(this.state)
    }

    render() {
        if (this.state.isEditing === false) {
            return (
                <div className={this.props.status ? 'taskItemDone taskItem' : 'taskItem'}>
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
                    <p style={{flex: '10'}}>{this.props.text}</p>
                    <p style={{flex: '3'}}>
                        <Moment format="YYYY/MM/DD">
                            {this.props.date}
                        </Moment>
                    </p>
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
                <div className='taskItem'>
                    <input 
                        value={this.state.newText}
                        onChange={this.handleChange} 
                    />
                    <DatePicker 
                        className='taskDatepicker'
                        onChange={this.enterDate}
                        selected={this.state.newDate}
                    />
                    <div onClick={this.saveItem} className='taskSaveButton hover'><p>SAVE</p></div>
                </div>
            )
        }
    }
}

export const ProjectTask = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectTask
  
// selected={this.state.newDate}


