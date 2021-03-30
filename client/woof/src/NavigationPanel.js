import React from 'react'
import Login from './Login'
import Logout from './Logout'

class NavigationPanel extends React.Component{
  
  login = () => {
    this.props.login();
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    if(this.props.isConnected){
      return (
        <nav className="navigationPanel">
          <Logout logout={this.logout}/>
        </nav>
      )
    }
    else {
      return (
        <nav className="navigationPanel">
          <Login login={this.login}/>
        </nav>
      )
    }
  }
}

export default NavigationPanel
