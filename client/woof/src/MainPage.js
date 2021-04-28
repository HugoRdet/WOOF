import React from 'react'
import BannerTop from './BannerTop'
import Feed from './Feed'
import InfosProfilNbTweets from './InfosProfilNbTweets'
import SignIn from './SignIn'
import SignUp from './SignUp'
import HostPage from './HostPage'
import NewMessage from './NewMessage'
import InfosProfilNbFollowers from './InfosProfilNbFollowers'
import InfosProfilNbFollows from './InfosProfilNbFollows'
import Cookies from 'js-cookie'


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'host',
      isConnected : false,
      pseudo: '',
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
    this.setPseudo = this.setPseudo.bind(this);
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
            <SignIn getConnected={this.getConnected} setPseudo={this.setPseudo} getSignUp={this.getSignUp}/>
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
        <div className="baniere">
        <div className="nom">
        <h1>{this.state.pseudo}</h1>
        </div>
        <div className="content_b">
          <InfosProfilNbTweets/>
        </div>
        <div className="content_b">
        <InfosProfilNbFollowers/>
        </div>
        <div className="content_b">
        <InfosProfilNbFollows/>
        </div>
        </div>
        
        <Feed page={this.state.currentPage} pseudo={this.state.pseudo}/>
        <div className="menu">
        <div className="petitbouton">
        <h3>Home</h3>
        </div>
        <div className="petitbouton">
        <h3>Profil</h3>
        </div>
        <div className="petitbouton">
        <h3>Options</h3>
        </div>
        <div className="petitbouton" onClick = { event => {this.setLogout()} } >
        <h3>deconnexion</h3>
        </div>
        </div>
        <div className="espace_tweet">
          <div className="contenu_animation">
            <NewMessage parent_id={"-1"} page={this.state.currentPage} />
          </div>
        </div>
        
        </main>
        </div>
      )
    }
  }

  getConnected() {
    const nextPage = 'profile'; 
    const isConnected = true;
    this.setPseudo();
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

  setPseudo( pseudo ) {
    if(pseudo) {
      this.setState( { pseudo: pseudo } )
    }
    else {
      let defaultPseudo = Cookies.get('userpseudo');
      this.setState( {pseudo : defaultPseudo} );
    }
    this.setState( {currentPage : 'profile'} );
  }
}

export default MainPage
  
