import React from 'react'
import BannerTop from './BannerTop'
import NavBarLeft from './NavBarLeft'
import MessagesFeed from './MessagesFeed'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'signIn',
      isConnected : true,
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
  }


  render() {
    return (
      
      <div className="MainPage">
        <BannerTop isConnected={this.state.isConnected} login={this.getConnected} logout={this.setLogout}/>
        <main>
          <NavBarLeft/>
          {this.state.currentPage === 'messages' 
            && 
            <MessagesFeed/>
          }
        </main>
      </div>
    )

  }

  getConnected() {
    const nextPage = 'messages'; 
    const isConnected = true;
    this.setState({
      currentPage : nextPage,
      isConnected : isConnected,        
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
