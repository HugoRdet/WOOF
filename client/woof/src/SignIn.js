import React from 'react'

class SignIn extends React.Component {
  login = () => {
    this.props.login();
  }
  render() {
    return (
      <form>
        <input type="text" placeholder="login"/>
        <input type="password" placeholder="password"/>
        <button className="signInButton" onClick={this.login}>
          Sign In
        </button>
      </form>
    )
  }
}

export default SignIn
