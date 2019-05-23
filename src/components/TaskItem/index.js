import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import './TaskItemStyle.css'

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
            newText: ''
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
        this.setState({
            isEditing: true,
            newText: this.props.text
        })
    }

    // SAVE CHANGES IN TODO ITEM
    saveItem = () => {
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/tasks/${this.props.itemKey}/text`)
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
                <div className={this.props.status ? 'taskItemDone taskItem' : 'taskItem'}>
                    <p style={{flex: '1'}} onClick={this.toggleStatus}>{this.props.status ? 'DONE' : 'TO DO'}</p>
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
                <div className='taskItem'>
                    <input 
                        value={this.state.newText}
                        onChange={this.handleChange} 
                    />
                    <p onClick={this.saveItem}>SAVE</p>
                </div>
            )
        }
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


  export const ProjectTask = connect(mapStateToProps)(index)
  export default ProjectTask
  



