import React from 'react'
import BannerTop from './BannerTop'
import NavBarLeft from './NavBarLeft'
import ProfileFeed from './ProfileFeed'
import SignIn from './SignIn'
import SignUp from './SignUp'
import HostPage from './HostPage'
import NewMessage from './NewMessage'

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
    
    if(this.state.currentPage === 'profile'){
      return (
        <div className="MainPage">
        <header>
        <h3>Woof!</h3>
        </header>
        
          <main>
            <NavBarLeft/>
            <div>
              <ProfileFeed/>
              <NewMessage parent_id={"-1"}/>
            </div>
          </main>
        </div>
      )
    }
  }

  getConnected() {
    const nextPage = 'profile'; 
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
