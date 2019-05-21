import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


/// ICONS ///
import iconProject from '../../assets/icons/project.svg'
import iconTaskList from '../../assets/icons/task-list.svg'
import iconUser from '../../assets/icons/man-user.svg'

const mapStateToProps = state => {
  return {
    isLogged: state.global.isLogged,
    username: state.global.loggedUser
  }

}

const mapDispatchToProps = dispatch => {
  return {
    logUserOut: () => dispatch({type: 'LOG_OUT'})
  }
}

export class index extends Component {
  render() {
    return (
        <header>
            <Link className='link' style={{color:'white'}} to='/'>WorkItUp!</Link>
            <div>
              {this.props.isLogged ? (
                <ul>
                  <li>Welcome {this.props.username}</li>
                  <li>
                    <Link className='link' to='/projects'>
                      <img src={iconProject} className='headerIcon' alt=""/>
                    </Link>
                  </li>
                  <li>
                  <Link className='link' to='/tasks'>
                    <img src={iconTaskList} className='headerIcon' alt=""/>
                  </Link>
                  
                  </li>

                  <li><img src={iconUser} className='headerIcon' alt=""/></li>
                  <li onClick={this.props.logUserOut}>Log out</li>
                </ul>
              ) : (
                <ul>
                  <li>SIGN IN</li>
                  <li>SIGN UP</li>
                </ul>
              )}
            </div>


        </header>
    )
  }
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(index)
export default Header

