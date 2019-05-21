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


export class index extends Component {

removeItem = () => {
    console.log(this.props.itemKey);
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/comments/${this.props.itemKey}`)
    .remove()
}

render() {
    return (
        <div onClick={this.test} style={commentStyle}>
            <p>{this.props.author}</p>
            <p>
                <Moment format="YYYY/MM/DD">
                    {this.props.date}
                </Moment>
            </p>
            <p onClick={this.removeItem}>REMOVE</p>
            <br />                
            <div>
                <p>{this.props.text}</p>
            </div>
        </div>
    )
  }
}

const commentStyle = {
    width: '90%',
    padding: '10px',
    justifyContent: 'space-between',
    backgroundColor: '#b0b4ba',
    margin: '5px auto'
}

export const ProjectComment = connect(mapStateToProps)(index)
export default ProjectComment



