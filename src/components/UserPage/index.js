import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

const mapStateToProps = state => {
    return {
        userData: state.global.firebaseUserData
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
                <p>Email: {this.props.userData.email}</p>
                <p>Username: {this.props.userData.displayName ? this.props.userData.displayName : 'No username set' }</p>
                <br />
                <p>Delete account </p>
            </div>
        )
    }
}

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(index)
export default UserPage
