import React from 'react'

class SignIn extends React.Component {
  login = () => {
    this.props.login();
  }
  render() {
    return (
      <form>
        <button class="signInButton" onClick={this.login}>
          Sign In
        </button>
        <input type="password" class="inputDefault" placeholder="password" required/>
        <input type="text" class="inputDefault" placeholder="login" required/>
      </form>
    )
  }
}

export default SignIn
