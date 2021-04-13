import React from 'react'
import LogoutButton from './LogoutButton'
import SearchBar from './SearchBar'

class BannerTop extends React.Component{
  
  render() {
    if(this.props.isConnected){
      return (
        <nav className="BannerTop">
          <SearchBar/>
          <LogoutButton setLogout={this.props.setLogout}/>
        </nav>
      )
    }
    else {
      return (
        <nav className="BannerTop">
          <SearchBar/>
        </nav>
      )
    }
  }
}

export default BannerTop
