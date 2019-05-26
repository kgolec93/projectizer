import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return{
        selectedParticipant: state.projectPage.selectedParticipant
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectParticipant:(key) => dispatch({type: 'SELECT_PARTICIPANT', payload: key})
    }
}

class index extends Component {

    selectParticipant = () => {
        if (this.props.selectedParticipant === null || this.props.selectedParticipant !== this.props.itemKey) {
            this.props.selectParticipant(this.props.itemKey)
        }
        else {
            this.props.selectParticipant(null)
        }
    }

    render() {
        return (
            <div className='participantContainer'>
                <div className='participantBasic'>
                    <p className='hover' onClick={this.selectParticipant} style={{flex: 2, fontWeight: 200}}>{this.props.function}: </p>
                    <p className='hover' onClick={this.selectParticipant} style={{flex: 4, fontWeight: 400}}>{this.props.name}</p>
                    <p style={{flex: 1}}>EDIT</p>
                    <p style={{flex: 1}}>REMOVE</p>
                </div>

                {this.props.itemKey == this.props.selectedParticipant &&
                <div className='participantDetails'>
                    <p>Email: {this.props.email ? this.props.email : 'N/A'}</p>
                    <p>Phone number: {this.props.number ? this.props.number : 'N/A'}</p>
                </div>
                }
            </div>
        )
    }
}

export const ParticipantItem = connect(mapStateToProps, mapDispatchToProps)(index)
export default ParticipantItem
