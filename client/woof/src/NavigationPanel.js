import React from 'react'
import Login from './Login'
import Logout from './Logout'

class NavigationPanel extends React.Component{
  render() {
    if(this.props.isConnected){
      return (
        <nav className="navigationPanel">
          <Logout/>
        </nav>
      )
    }
    else {
      return (
        <nav className="navigationPanel">
          <Login/>
        </nav>
      )
    }
  }
}

export default NavigationPanel
