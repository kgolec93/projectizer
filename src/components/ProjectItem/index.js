import React, { Component } from 'react';
import Moment from 'react-moment'
// import moment from 'moment'
import {connect} from 'react-redux'
import warningIcon from '../../assets/icons/warning.svg'
import './projectItem.scss'

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

    constructor() {
        super();
        this.state = {
            className: ''
        }
    }

    componentDidMount() {
        this.statusClass(this.props.status)
    }

    handleClick = () => {
        this.props.selectedProject(this.props.projectKey)
    }
    
    statusClass = (status) => {
        switch (status) {
            case 'To do':
                this.setState({
                    className: 'itemIsTodo projectButton'
                })
                break
            case 'In progress':
                this.setState({
                    className: 'projectButton'
                })
                break
            case 'Done':
                this.setState({
                    className: 'itemIsDone projectButton'
                })
                break
            case 'Pending':
                this.setState({
                    className: 'itemIsPending projectButton'
                })
                break
            default:
                this.setState({
                    className: 'projectButton'
                })
        }
    }


    render() {
        return (
            <div className={this.state.className} onClick={this.handleClick}>
                <div className="projectBasicData hover">
                    <p style={{flex: 3}}>{this.props.projectName}</p>
                    <p style={pStyle}>{this.props.projectLeader}</p>
                    <Moment style={pStyle} format="YYYY/MM/DD">
                        {this.props.deadline}
                    </Moment>
                    <p style={pStyle}>{this.props.status}</p>
                    <p style={pStyle}>{this.props.customStatus}</p>
                    <div>
                        <img src={warningIcon} alt=""/>
                    </div>
                </div>
            </div>

        )
    }
}


const pStyle = {flex: 2, borderLeft: '1px solid #c9c9c9'}


export const ProjectButton = connect(mapStateToProps, mapDispatchToProps)(index)
export default ProjectButton