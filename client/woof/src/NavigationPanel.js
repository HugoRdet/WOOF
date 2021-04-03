import React from 'react'
import SignIn from './SignIn'
import Logout from './Logout'
import SearchBar from './SearchBar'

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
          <SearchBar/>
        </nav>
      )
    }
    else {
      return (
        <nav className="navigationPanel">
          <SignIn login={this.login}/>
          <SearchBar/>
        </nav>
      )
    }
  }
}

export default NavigationPanel
