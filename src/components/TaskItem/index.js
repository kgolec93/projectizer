import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import './TaskItemStyle.css'
import tickIcon from '../../assets/icons/tick.svg'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => {
    return{
        firebaseUserData: state.global.firebaseUserData
    }
}


class index extends Component {

    constructor() {
        super();
        this.state = {
            isEditing: false,
            newText: '',
            newDate: ``
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

        /// test
        console.log(this.state.newDate)
    }

    // EDITING TODO ITEM
    editItem = () => {
        this.setState({
            isEditing: true,
            newText: this.props.text,
            newDate: this.props.date
        })
    }

    // SAVE CHANGES IN TODO ITEM
    saveItem = () => {
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}/text`)
        item.set(this.state.newText);
        if (this.state.newDate !== ''){
            firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}/date`)
            .set(this.state.newDate)
        }
        this.setState({
            isEditing: false,
            newText: '',
            newDate: ''
        })
    }

    // CONTROLLED INPUT
    handleChange = (e) => {
        this.setState({
            newText: e.target.value
        })
    }

    dateUpdate = (newDate) => {
        this.setState({
            newDate: `newDate`
        })
        // console.log(date)
    }
    

    render() {
        if (this.state.isEditing === false) {
            return (
                <div className={this.props.status ? 'taskItemDone taskItem' : 'taskItem'}>
                    <div style={{flex: '1'}} onClick={this.toggleStatus}>
                        {this.props.status ? 
                            <div className="taskStatusButton">
                                <img src={tickIcon} className='tickIcon' alt=""/>
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
                    <p style={{flex: '1'}} onClick={this.editItem}>EDIT</p>
                    <p style={{flex: '1'}} onClick={this.removeItem}>X</p>
                </div>
            )
        }

        else if (this.state.isEditing === true) {
            return (
                <div className='taskItem'
                    onClick={console.log(this.state)}>
                    <input 
                        value={this.state.newText}
                        onChange={this.handleChange} 
                    />
                    <DatePicker
                        onChange={this.dateUpdate}
                        selected={this.state.newDate}
                        placeholderText="Change deadline date"
                    />
                    <p onClick={this.saveItem}>SAVE</p>
                </div>
            )
        }
    }
}

export const ProjectTask = connect(mapStateToProps)(index)
export default ProjectTask
  



