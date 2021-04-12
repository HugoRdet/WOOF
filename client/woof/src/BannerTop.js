import React from 'react'
import SignIn from './SignIn'
import Logout from './Logout'
import SearchBar from './SearchBar'

class BannerTop extends React.Component{
  
  login = () => {
    this.props.login();
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    if(this.props.isConnected){
      return (
        <nav className="BannerTop">
          <SearchBar/>
          <Logout logout={this.logout}/>
        </nav>
      )
    }
    else {
      return (
        <nav className="BannerTop">
          <SearchBar/>
          <SignIn login={this.login}/>
        </nav>
      )
    }
  }
}

export default BannerTop
