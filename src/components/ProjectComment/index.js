import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import iconDelete from '../../assets/icons/delete.svg'

const mapStateToProps = state => {
    return{
        firebaseUserData: state.global.firebaseUserData,
        selectedProject: state.global.selectedProject
    }
}


export class index extends Component {

removeItem = () => {
    firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/comments/${this.props.itemKey}`)
    .remove()
}

render() {
    return (
        <div className='projectCommentContainer' onClick={this.test}>
            <div className='projectCommentHeader'>
                <p style={{flex: 10}} className='commentAuthor'>Added by {this.props.author}</p>
                <div className='commentDate'>
                    <p>
                        <Moment format="YYYY/MM/DD HH:mm">
                            {this.props.date}
                        </Moment>
                    </p>
                    <img 
                        onClick={this.removeItem} 
                        src={iconDelete} 
                        className='commentDeleteIcon hover' 
                        alt=""
                    />
                </div>
            </div>

            <br />                
            <div className='commentContent'>
                <p>{this.props.text}</p>
            </div>
        </div>
    )
  }
}

export const ProjectComment = connect(mapStateToProps)(index)
export default ProjectComment



