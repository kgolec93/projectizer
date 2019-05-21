import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Moment from 'react-moment'

const mapStateToProps = state => {
    return{
        firebaseUserData: state.global.firebaseUserData,
        selectedProject: state.global.selectedProject
    }
}


class index extends Component {

    // REMOVING CERTAIN ITEM
    removeItem = () => {
        console.log(this.props.itemKey);
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks/${this.props.itemKey}`)
        .remove()
    }

    toggleStatus = () => {
        const item = firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/tasks/${this.props.itemKey}/isDone`)
        item.once('value', snapshot => {
           const status = !snapshot.val();
           item.set(status);
           console.log(status);
        })
    }
    

    render() {
        return (
            <div style={taskStyle}>
                <p onClick={this.toggleStatus}>{this.props.status ? 'DONE' : 'TO DO'}</p>
                <p>{this.props.text}</p>
                <p>
                    <Moment format="YYYY/MM/DD">
                        {this.props.date}
                    </Moment>
                </p>
                <p onClick={this.removeItem}>X</p>
            </div>
        )
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


  export const ProjectToDo = connect(mapStateToProps)(index)
  export default ProjectToDo
  



