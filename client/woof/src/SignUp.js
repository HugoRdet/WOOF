import React from 'react'

class SignUp extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="login" required/>
        <input type="text" placeholder="name" required/>
        <input type="password" placeholder="password" required/>
        <button className="signUpButton" onClick={this.signUp()}>
          Login
        </button>
      </form>
    )
  }

  signUp() {
    /* connexion serveur */
    /* login unique --> 
     * css warning 
     * si login existant */
  }


}

export default SignUp
