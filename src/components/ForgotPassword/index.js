import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
    return {
        emailInput: state.signIn.emailInput
    }
}

const mapDispatchToProps = dispatch => {
    return {
        enterEmail: (e) => dispatch({type: 'ENTER_EMAIL', payload: e.target.value })
    }
}


class index extends Component {

    onSubmit = (e) => {
        console.log(this.props.emailInput)
        e.preventDefault();
    }

  render() {
    return (
      <div className="blackout">
        <div className="signupWindow">
                <h4>Reset password</h4>
                <form onSubmit={this.onSubmit} className="loginForm">
                
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={this.props.emailInput} 
                        onChange={this.props.enterEmail}
                    />
                    {this.props.errorMessage !== null &&
                        <p className="loginError">
                        {this.props.errorMessage}
                        </p>
                    }
                    <button 
                        type="submit"
                    >
                    Reset password
                    </button>
                    </form>

                <Link to='/signin'>Go back</Link>
            </div>
      </div>
    )
  }
}

export const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(index)
export default ForgotPassword
