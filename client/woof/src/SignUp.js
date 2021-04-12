import React from 'react'

class SignUp extends React.Component {
  render() {
    return (
      <form>
        <button className="signUpButton" onClick={this.signUp()}>
          Login
        </button>
        <input type="password" class="inputDefault" placeholder="password" required/>
        <input type="text" class="inputDefaul" tplaceholder="name" required/>
        <input type="text" class="inputDefault" placeholder="login" required/>
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
