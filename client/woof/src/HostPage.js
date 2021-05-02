import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import './index.css'

class HostPage extends React.Component {
  render() {
    return (
    
      <div id="HostPage">
          <article id="log">
            
            <div className="title">
            <h2>@Woof</h2>
            </div>
          
            <div className="content">
              <div className="bigbutton" onClick={this.props.setLogout}>
                <h2> se connecter</h2>
              </div> 
      
              <div className="bigbutton" onClick={this.props.getSignUp}>
                <h2> s'inscrire</h2>
              </div> 
          </div>
        </article>
    </div>
      
      
    )
  }
}

export default HostPage
