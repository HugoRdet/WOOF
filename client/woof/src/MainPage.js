import React from 'react'
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'index.html',
      isConnected : false,
    }
  }

  render() {
    return (
      <div className="MainPage">Woof Woof</div>
    );
  }

  getConnected() {
    const nextPage = 'index.html'; 
    const isConnected = true;
    this.setState({
      currentPage : nextPage,
        
    })
  

  }
}



export default MainPage
