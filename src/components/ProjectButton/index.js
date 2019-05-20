import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/icons/delete.svg'
import Moment from 'react-moment'
import moment from 'moment'
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedProject: (key) => dispatch({type: 'SELECT_PROJECT', payload: key})
    }
}

export class index extends Component {

    handleClick = () => {
        this.props.selectedProject(this.props.projectKey)
    }

    render() {
        return (
            <div className="projectButton" onClick={this.handleClick}>
                <div className="projectBasicData">
                    <p style={{flex: 3}}>{this.props.projectName}</p>
                    <p style={pStyle}>{this.props.projectLeader}</p>
                    <Moment style={pStyle} format="YYYY/MM/DD">
                        {this.props.deadline}
                    </Moment>
                </div>
            </div>

        )
    }
}


const pStyle = {flex: 2, borderLeft: '1px solid #c9c9c9'}


export const ProjectButton = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectButton