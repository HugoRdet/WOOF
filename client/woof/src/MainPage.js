import React from 'react'
import NavigationPanel from './NavigationPanel'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'index.html',
      isConnected : true,
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
  }


  render() {
    return (
      <div className="MainPage">
        <NavigationPanel isConnected={this.state.isConnected}/>
      </div>
    )

  }

  getConnected() {
    const nextPage = 'index.html'; 
    const isConnected = true;
    this.setState({
      currentPage : nextPage,
      isConnected : isConnected,        
     });
  }

  setLogout() {
    const nextPage = 'sign_in.html';
    const isConnected = false;
    this.setState({
      currentPage : nextPage,
      isConnected : isConnected,
    });
  }
}

export default MainPage
