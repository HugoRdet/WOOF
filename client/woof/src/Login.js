import React from 'react'

class Login extends React.Component {
  login = () => {
    this.props.login();
  }
  render() {
    return (
      <form>
        <input type="text" placeholder="login"/>
        <input type="password" placeholder="password"/>
        <button className="loginButton" onClick={this.login}>
          Login
        </button>
      </form>
    )
  }
}

export default Login
