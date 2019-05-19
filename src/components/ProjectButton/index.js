import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class index extends Component {
    constructor() {
        super();
        this.state = {

        };
        
    }

    handleClick = () => {
        console.log(this.props.projectKey)
    }

    render() {
        return (
            <div className="projectButton" onClick={this.handleClick}>
                <div className="projectBasicData">
                    <p style={{flex: 4}}>{this.props.projectName}</p>
                    <p style={pStyle}>{this.props.projectLeader}</p>
                    {/* <p style={pStyle}>{this.props.projectKey}</p> */}
                    <p style={pStyle}>{this.props.currentStatus}</p>
                </div>
            </div>

        )
    }
}

export default index

const pStyle = {flex: 1, borderLeft: '1px solid #c9c9c9'}