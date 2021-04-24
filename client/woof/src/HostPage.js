import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import './index.css'

class HostPage extends React.Component {
  render() {
    return (
    
      <main id="HostPage">
        <div class="container">
          <article id="log">
            <section class="container">
              <h2>Woof!</h2>
      
              <section class="button" onClick={this.props.setLogout}>
                <h1> se connécter</h1>
              </section> 
      
              <section class="button" onClick={this.props.getSignUp}>
                <h1> s'inscrire</h1>
              </section> 
        
            </section>
          </article>
      </div>
    </main>
      
      
    )
  }
}

export default HostPage
