import React from 'react'
import BannerTop from './BannerTop'
import NavBarLeft from './NavBarLeft'
import MessagesFeed from './MessagesFeed'
import SignIn from './SignIn'
import SignUp from './SignUp'
import HostPage from './HostPage'
import axios from 'axios'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'host',
      isConnected : false,
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
  }




  render() {
    if(this.state.currentPage === 'host') {
      return (
        <div className='MainPage'>
          <main>
            <HostPage setLogout={this.setLogout} getSignUp={this.getSignUp}/>
          </main>
        </div>
      )
    }
    if(this.state.currentPage === 'signIn') {
      return (
        <div className='MainPage'>
          <main>
            <SignIn getConnected={this.getConnected} getSignUp={this.getSignUp}/>
          </main>
        </div>
      )
    }
    if(this.state.currentPage === 'signUp') {
      return (
        <div className='MainPage'>
          <main>
            <SignUp setLogout={this.setLogout}/>
          </main>
        </div>
      )
    }
    else {
      return (
        <div className="MainPage">
          <BannerTop isConnected={this.state.isConnected} setLogout={this.setLogout}/>
          <main>
            <NavBarLeft/>
            {this.state.currentPage === 'messages' 
            && 
            <MessagesFeed api={this.api}/>
          }
          </main>
        </div>
      )
    }
  }

  getConnected() {
    const nextPage = 'messages'; 
    const isConnected = true;
    this.setState({
      currentPage : nextPage,
      isConnected : isConnected,        
     });
  }
  
  getSignUp() {
    const nextPage = 'signUp';
    this.setState( {
      currentPage : nextPage,
    });
  }

  setLogout() {
    const nextPage = 'signIn';
    const isConnected = false;
    this.setState({
      currentPage : nextPage,
      isConnected : isConnected,
    });
  }
}

export default MainPage
