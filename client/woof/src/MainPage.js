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
import SearchBar from './SearchBar'
import ProfileSearch from './ProfileSearch'


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'host',
      isConnected : false,
      pseudo: '',
      searchInput: ''
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
    this.setPseudo = this.setPseudo.bind(this);
    this.profileSearch = this.profileSearch.bind(this);
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

    // PAGES USUELLES
      return (
        <div className="MainPage">
        <header>
          <SearchBar profileSearch={this.profileSearch}/>
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
        {this.state.currentPage === 'search' &&
          <ProfileSearch input={this.searchInput} setPseudo={this.setPseudo}/>
          }
        {this.state.currentPage === 'profile' || this.state.currentPage === 'home' || this.state.currentPage === 'search' &&
          <Feed page={this.state.currentPage} pseudo={this.state.pseudo} input={this.state.searchInput}/>
          }
        <div className="menu">
        <div className="petitbouton">
        <h3>Home</h3>
        </div>
          <div className="petitbouton" onClick={event => {this.setPseudo}}>
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
            <NewMessage parent_id={"-1"} page={this.state.currentPage} />
          </div>
        </div>
        
        </main>
        </div>
      )
    }
  

  getConnected() {
    const nextPage = 'home'; 
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

  profileSearch( input ) {
    const currentPage = 'search'
    this.setState({ currentPage: currentPage, searchInput: input })
  }
}

export default MainPage
  
