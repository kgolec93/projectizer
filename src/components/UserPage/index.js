import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import iconPencil from '../../assets/icons/pencil.svg'
import { blockStatement } from '@babel/types';

const mapStateToProps = state => {
    return {
        userData: state.global.firebaseUserData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch({type: 'LOG_OUT'})
    }
}

class index extends Component {
    constructor() {
        super();
        this.state = {
            emailInput: '',
            displayNameInput: '',
            companyName: '',
            numberInput: '',
            websiteInput: '',
            isPencilVisible: '',
            isEdited: '',
            changeEmailError: '',
            changeDisplaynameError: '',
            deleteAccountError: '',
            showConfirmationWindow: false,
        }
    }

    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.props.userData.email)
        .then(() => {
            this.setState({passMessage: 'An email to reset password has been sent to you'})
        })
        .catch((error) => {
            this.setState({passMessage: error})
        })
    }    

    showPencil = (e) => {
        this.setState({isPencilVisible: e.target.id});
    }
    hidePencil = () => {
        this.setState({isPencilVisible: ''})
    }

    toggleEditInput = (e) => {
        this.setState({
            emailInput: this.props.userData.email,
            displayNameInput: this.props.userData.displayName,
        })
        if (this.state.isEdited !== e.target.id) {
            this.setState({isEdited: e.target.id})
        }
        else {
            this.setState({isEdited: ''})
        }
    }

    updateEmail = (e) => {
        firebase.auth().currentUser.updateEmail(this.state.emailInput).then(() => {
            this.setState({changeEmailError: '', isEdited: ''})
        }).catch((error) => {
            this.setState({changeEmailError: error.message})
        });
        e.preventDefault();
    }

    setDisplayName = (e) => {
        firebase.auth().currentUser.updateProfile({displayName: this.state.displayNameInput}).then(() => {
            this.setState({changeDisplaynameError: '', isEdited: ''})
        }).catch((error) => {
            this.setState({changeDisplaynameError: error.message})
        });
        e.preventDefault();
    }

    enterValue = (e) => {
        switch (e.target.name) {
            case 'email':
                this.setState({emailInput: e.target.value})
                break
            case 'displayname':
                this.setState({displayNameInput: e.target.value})
                break
            default:
                this.setState(this.state)
        }
    }

    cancelEmailUpdate = () => {
        this.setState({emailInput: this.props.userData.email, isEdited: '', changeEmailError: ''})
    }

    cancelDisplaynameUpdate = () => {
        this.setState({displayNameInput: this.props.userData.email, isEdited: '', changeDisplaynameError: ''})
    }

    toggleConfirmationWindow = () => {
        this.setState({showConfirmationWindow: !this.state.showConfirmationWindow})
    }

    deleteAccount = () => {
        firebase.auth().currentUser.delete()
        .then(() => {
            this.props.logOut()
        }).catch((error) => {
            this.setState({deleteAccountError: error.message})
        });
    }

    render() {
        return (
            <div className='userSettingsWindow'> 
                <div className='userDataContainer'>
                    {this.state.isEdited !== 'email' &&
                    <div className='userpagePar'>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <p  
                                id='email' 
                                onMouseEnter={this.showPencil} 
                                onMouseLeave={this.hidePencil} 
                                onClick={this.toggleEditInput} 
                                className='hover'
                            >
                            Email: {this.props.userData.email}</p>
                            <img 
                                src={iconPencil} 
                                style={iconStyle} 
                                className={this.state.isPencilVisible === 'email' && 'pencilVisible'} 
                                alt=""
                            />
                        </div>
                    </div>
                    }
                    {this.state.isEdited === 'email' &&
                        <div>
                            <form onSubmit={this.updateEmail} className='userpagePar'>
                                <input 
                                    className='projectHeaderInput'
                                    style={{flex: 5}} 
                                    type="text"
                                    value={this.state.emailInput}
                                    onChange={this.enterValue}
                                    name='email'
                                    placeholder='Email'
                                />
                                <button style={{flex: 1}} className='addContentButtonDark' type="submit">Update</button>
                                <button style={{flex: 1}} className='addContentButtonDark' onClick={this.cancelEmailUpdate}>Cancel</button>

                            </form>
                            <p>{this.state.changeEmailError}</p>
                        </div>
                    }

                    
                </div>

                <div className='userDataContainer'>
                    {this.state.isEdited !== 'displayname' &&
                    <div className='userpagePar'>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <p  
                                id='displayname' 
                                onMouseEnter={this.showPencil} 
                                onMouseLeave={this.hidePencil} 
                                onClick={this.toggleEditInput} 
                                className='hover'
                            >
                            Display name: {this.props.userData.displayName ? this.props.userData.displayName : 'No username set' }</p>
                            <img 
                                src={iconPencil} 
                                style={iconStyle} 
                                className={this.state.isPencilVisible === 'displayname' && 'pencilVisible'} 
                                alt=""
                            />
                        </div>

                    </div>
                    }
                    {this.state.isEdited === 'displayname' &&
                        <div>
                            <form onSubmit={this.setDisplayName} className='userpagePar'>
                                <input 
                                    className='projectHeaderInput'
                                    style={{flex: 5}}
                                    type="text"
                                    value={this.state.displayNameInput}
                                    onChange={this.enterValue}
                                    name='displayname'
                                    placeholder='Display name'
                                />
                                <button style={{flex: 1}} className='addContentButtonDark hover' type="submit">Update</button>
                                <button style={{flex: 1}} className='addContentButtonDark hover' onClick={this.cancelDisplaynameUpdate}>Cancel</button>
                            </form>
                            <p>{this.state.changeDisplaynameError}</p>
                        </div>
                    }
                    
                </div>

                <button className='addContentButtonDark hover fullWidth' onClick={this.resetPassword}>Reset password</button><br />
                <p>{this.state.passMessage}</p>
                <br />


                <button className='addContentButtonDark hover fullWidth' onClick={this.toggleConfirmationWindow}>Delete account </button>
                {this.state.showConfirmationWindow === true && 
                    <div>
                        <p>Are you sure? You cannot undo this action!</p>
                        <button className='addContentButtonDark hover' style={{backgroundColor: '#b94848'}} onClick={this.deleteAccount}>Yes, delete account</button>
                        <button className='addContentButtonDark hover' onClick={this.toggleConfirmationWindow}>Cancel</button>
                        <p>{this.state.deleteAccountError}</p>

                    </div>
                }
            </div>
        )
    }
}

const iconStyle = {
    display: 'none',
    height: '16px',
    width: 'auto',
    margin: '0px 8px',
    opacity: '0.7'
}

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(index)
export default UserPage
