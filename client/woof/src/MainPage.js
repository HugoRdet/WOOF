import React from 'react'
import Feed from './Feed'
import InfosProfilNbTweets from './InfosProfilNbTweets'
import SignIn from './SignIn'
import SignUp from './SignUp'
import HostPage from './HostPage'
import NewMessage from './NewMessage'
import InfosProfilNbFollowers from './InfosProfilNbFollowers'
import InfosProfilNbFollows from './InfosProfilNbFollows'
import Cookies from 'js-cookie'
import SearchBar from './SearchBar'
import ProfileSearch from './ProfileSearch'


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'host',
      precPage: 'profile',
      isConnected : false,
      pseudo: '',
      sendMessage:-1,
      selfPseudo: '',
      searchInput: ''
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
    this.setPseudo = this.setPseudo.bind(this);
    this.setPage_   = this.setPage_.bind(this);
    this.setSelfPseudo = this.setSelfPseudo.bind(this);
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
            <SignIn getConnected={this.getConnected} setPseudo={this.setSelfPseudo}  getSignUp={this.getSignUp}/>
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
    
    if(this.state.currentPage === 'message') {
      return (
        <div className='MainPage'>
          <main>
            <div className='article_tweet'>
              <div className="title">
              <h2>Envoyer un nouveau message</h2>
              </div>
              
              
              <NewMessage parent_id={this.state.sendMessage} setPage_={this.setPage_} />
              
            </div>
          </main>
        </div>
      )
    }
    
    // PAGES USUELLES
    
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
              <InfosProfilNbTweets  pseudo={this.state.pseudo}/>
            </div>
        
            <div className="content_b">
              <InfosProfilNbFollowers pseudo={this.state.pseudo}/>
            </div>
        
            <div className="content_b">
              <InfosProfilNbFollows pseudo={this.state.pseudo}/>
            </div>
          </div>
        
        {this.state.currentPage === 'profile' &&
          <Feed page={this.state.currentPage} pseudo={this.state.pseudo}
            setPage_={this.setPage_}
          />
        }
        
        <div className="menu">
          <div className="petitbouton" onClick={event => {this.getConnected()}}>
          <h3>Home</h3>
          </div>
        
          <div className="petitbouton" onClick={event => {this.setPseudo()}}>
            <h3>Profile</h3>
          </div>
          
          <div className="petitbouton">
            <h3>Options</h3>
          </div>
          
          <div className="petitbouton" onClick = { event => {this.setLogout()} } >
            <h3>Sign Out</h3>
          </div>
        </div>
        
        <div className="espace_tweet">
          <div className="contenu_animation">
            <section class="petitbouton_tweet" onClick = { (event => this.setPage_("message",-1) ) 
            }> 
            <h4> 🖍 New Post </h4>
            </section>
          </div>
        </div>
        
      </main>
    </div>
      )
    
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

  setPage_(PageToSet,idmessage) {
    const nextPage = PageToSet;
    
    if (nextPage==""){
      this.setState({
        currentPage : this.state.precPage
      });
      
    }else{
      if (nextPage=="message"){
        
        this.setState({
          sendMessage: idmessage,
          precPage: this.state.currentPage,
          currentPage : nextPage
        });
        
      }else{
        this.setState({
          sendMessage: -1,
          precPage: this.state.currentPage,
          currentPage : nextPage
        });
      }
    }
  }
  
  setLogout() {
    const nextPage = 'signIn';
    const isConnected = false;
    this.setState({
      currentPage : nextPage,
      isConnected : isConnected,
    });
  }

  setSelfPseudo( pseudo ) {
    this.setState( { selfPseudo: pseudo, currentPage: 'home'} )
  }

  setPseudo( pseudo ) {
    if(pseudo) {
      this.setState( { pseudo: pseudo } )
    }
    else {
      this.setState( {pseudo : this.state.selfPseudo} );
    }
    this.setState( {currentPage : 'profile'} );
  }
  
  profileSearch( input ) {
    const currentPage = 'search'
    this.setState({ currentPage: currentPage, searchInput: input })
  }
  
}

export default MainPage
  
  