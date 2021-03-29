import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="login"/>
        <input type="password" placeholder="password"/>
        <button className="loginButton">
          Login
        </button>
      </form>
    )
  }
}

export default Login
