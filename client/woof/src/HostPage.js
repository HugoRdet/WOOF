import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import './index.css'

class HostPage extends React.Component {
  render() {
    return (
    
      <main id="HostPage">
          <article id="log">
            
              <h1>Woof!</h1>
      
              <div class="bigbutton" onClick={this.props.setLogout}>
                <h2> se connecter</h2>
              </div> 
      
              <div class="bigbutton" onClick={this.props.getSignUp}>
                <h2> s'inscrire</h2>
              </div> 
          </article>
    </main>
      
      
    )
  }
}

export default HostPage
