import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'


/// ICONS ///
import iconProject from '../../assets/icons/project.svg'
import iconTaskList from '../../assets/icons/task-list.svg'
import iconUser from '../../assets/icons/man-user.svg'
import iconMenu from '../../assets/icons/menu.svg'

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

  constructor() {
    super();
    this.state = {
      showMenu: false,
    }
  }

  test = (e) => {
    console.log(e.target.offsetLeft);
    console.log(e.target.offsetWidth)
  }

  toggleMenu = () => {
    console.log(this.state)
    this.setState({showMenu: !this.state.showMenu})
  }

  render() {
    return (
        <header>
            <Link className='link' style={{color:'white'}} to='/'>Projectizer</Link>
            <div>
              {this.props.isLogged ? (
                <div className='headerMenuContainer'>
                  <ul>
                    <li className='welcomeText'>Welcome {this.props.username}</li>
                    <li>
                      <NavLink className='link' to='/projects' activeClassName="navActive">
                        <img 
                          onMouseOver={this.test} 
                          name='Projects'
                          src={iconProject} 
                          className='headerIcon' 
                          alt=""
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='link' to='/tasks' activeClassName="navActive">
                        <img src={iconTaskList} className='headerIcon' alt=""/>
                      </NavLink>
                    </li>
                    <NavLink className='link' to='/user' activeClassName="navActive"> 
                      <li><img src={iconUser} className='headerIcon' alt=""/></li>
                    </NavLink>
                    <li>
                      <Link className="link" to='/'>
                        <p className='logoutButton' onClick={this.props.logUserOut}>Log out</p>
                      </Link>
                    </li>
                  </ul>
                  <img 
                    onClick={this.toggleMenu}
                    src={iconMenu} 
                    className='headerMenuIcon'
                    alt=""
                  />
                  {this.state.showMenu === true && 
                    <div>
                      <ul className='headerMobileMenu'>
                        <NavLink className='link' to='/projects' activeClassName="navActive">
                          <li onClick={this.toggleMenu}>
                              <p>Projects</p>
                          </li>
                        </NavLink>
                        <NavLink className='link' to='/tasks' activeClassName="navActive">
                          <li onClick={this.toggleMenu} >
                              <p>Tasks</p>
                          </li>
                        </NavLink>
                        <NavLink className='link' to='/user' activeClassName="navActive">
                          <li onClick={this.toggleMenu}>
                              <p>User settings</p>
                          </li>
                        </NavLink>
                        <Link className='link' to='/'>
                          <li onClick={this.toggleMenu}>
                              <p onClick={this.props.logUserOut}>Log out</p>
                          </li>
                        </Link>

                      </ul>
                    </div>
                  }
                </div>

              ) : (
                <ul>
                  <Link className="link" to='/signin'>
                    <li className='headerButton'>SIGN IN</li>              
                  </Link>
                  <Link className="link" to='/signup'>                  
                    <li className='headerButton'>SIGN UP</li>
                  </Link>
                </ul>
              )}
            </div>
            
            {/* <div className='nameWindow'><p></p></div> */}


        </header>
    )
  }
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(index)
export default Header

