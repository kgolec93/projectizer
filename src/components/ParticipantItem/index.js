import React, { Component } from 'react'


export class index extends Component {
    constructor() {
        super();
        this.state = {
            isParticipantDetailsVisible: false,
            mousePositionX: 1,
            mousePositionY: 1
        }
    }

    toggleDetails = (e) => {
        this.setState({
            isParticipantDetailsVisible: !this.state.isParticipantDetailsVisible,
            mousePositionX: e.clientX,
            mousePositionY: e.clientY,
        })
        console.log(`${this.state.mousePositionX}`)
    }

    render() {
        return (
            <div onClick={this.toggleDetails}>
                <p>{this.props.function}: {this.props.name}</p>
                {this.state.isParticipantDetailsVisible === true &&
                <div onMouseLeave={this.toggleDetails}className="participantDetails" style={{top: this.state.mousePositionY, left: this.state.mousePositionX}}>
                    <ul>
                        <li>{this.props.function}: {this.props.name}</li>
                        <li>Email: {this.props.email ? this.props.email : 'N/A'}</li>
                        <li>Phone number: {this.props.number ? this.props.number : 'N/A'}</li>
                    </ul>
                </div>
                }
            </div>
        )
    }
}

export default index
