import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

class HostPage extends React.Component {
  render() {
    return (
      <div className="hostPage">
        <h3>Already have an account ?</h3>
        <button className="signInButton" onClick={this.props.setLogout}>
          Sign In
        </button>
          <h3>Create one</h3>
        <button className="signUpButton" onClick={this.props.getSignUp}>
          Sign Up
        </button>
      </div>
    )
  }
}

export default HostPage
