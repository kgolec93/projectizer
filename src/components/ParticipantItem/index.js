import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

const mapStateToProps = state => {
    return{
        selectedParticipant: state.projectPage.selectedParticipant,
        firebaseUserData: state.global.firebaseUserData,
        selectedProject: state.global.selectedProject,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectParticipant:(key) => dispatch({type: 'SELECT_PARTICIPANT', payload: key})
    }
}

class index extends Component {

    constructor() {
        super();
        this.state={
            isEditing: false,
            functionInput: '',
            nameInput: '',
            emailInput: '',
            numberInput: ''
        }
    }

    selectParticipant = () => {
        if (this.props.selectedParticipant === null || this.props.selectedParticipant !== this.props.itemKey) {
            this.props.selectParticipant(this.props.itemKey)
        }
        else {
            this.props.selectParticipant(null)
        }
    }

    editItem = () => {
        this.setState({
            isEditing: true,
            functionInput: this.props.function,
            nameInput: this.props.name,
            emailInput: this.props.email,
            numberInput: this.props.number
        })
    }

    updateItem = (e) => {

        firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/participants/${this.props.itemKey}`)
        .set({
          function: this.state.functionInput,
          name: this.state.nameInput,
          email: this.state.emailInput,
          number: this.state.numberInput,
        })

        this.setState({
            isEditing:false,
            functionInput: '',
            nameInput: '',
            emailInput: '',
            numberInput: ''
        })

        e.preventDefault();
    }

    removeItem = () => {
        firebase.database().ref(`users/${this.props.firebaseUserData.uid}/projects/${this.props.selectedProject}/participants/${this.props.itemKey}`)
        .remove()
    }

    enterValue = (e) => {
        switch (e.target.name) {
            case 'functionInput':
                this.setState({functionInput: e.target.value});
                break;
            case 'nameInput':
                this.setState({nameInput: e.target.value});
                break;   
            case 'emailInput':
                this.setState({emailInput: e.target.value});
                break;  
            case 'numberInput':
                this.setState({numberInput: e.target.value});
                break;
            default:
                return this.state;
        }
    }

    render() {
        return (
            <div className='participantContainer'>
                
                {this.state.isEditing ? 
                <form 
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    onSubmit={this.updateItem}>
                    <input 
                        className='participantInput'
                        name='functionInput'
                        type="text"
                        value={this.state.functionInput}
                        onChange={this.enterValue}
                        placeholder='Function *'
                    />
                    <input 
                        className='participantInput'
                        name='nameInput'
                        type="text"
                        value={this.state.nameInput}
                        onChange={this.enterValue}
                        placeholder='Name *'
                    />
                    <input 
                        className='participantInput'
                        name='emailInput'
                        type="email"
                        value={this.state.emailInput}
                        onChange={this.enterValue}
                        placeholder='Email'
                    />
                    <input 
                        className='participantInput'
                        name='numberInput'
                        type="text"
                        value={this.state.numberInput}
                        onChange={this.enterValue}
                        placeholder='Phone number'
                    />
                    <button 
                        type="submit"
                        className='projectPageAddContentButton hover' 
                        style={{flex: 1, backgroundColor: '#373f61'}} 
                    >
                    Update</button>
                </form>
                :
                <div>
                    <div className='participantBasic'>
                        <p className='hover' onClick={this.selectParticipant} style={{flex: 4, fontWeight: 200}}>{this.props.function}: </p>
                        <p className='hover' onClick={this.selectParticipant} style={{flex: 8, fontWeight: 400}}>{this.props.name}</p>
                        <p className='projectPageAddContentButton projectEditParticipantButton hover' onClick={this.editItem}>EDIT</p>
                        <p className='projectPageAddContentButton projectEditParticipantButton hover' onClick={this.removeItem} >REMOVE</p>
                    </div>
                    
                    {this.props.itemKey == this.props.selectedParticipant &&
                    <div className='participantDetails'>
                        <p>Email: {this.props.email ? this.props.email : 'N/A'}</p>
                        <p>Phone number: {this.props.number ? this.props.number : 'N/A'}</p>
                    </div>
                    }
                </div>
                }
            </div>
        )
    }
}

export const ParticipantItem = connect(mapStateToProps, mapDispatchToProps)(index)
export default ParticipantItem
