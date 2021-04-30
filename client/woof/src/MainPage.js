import React from 'react'
import Feed from './Feed'
import InfosProfilNbTweets from './InfosProfilNbTweets'
import SignIn from './SignIn'
import SignUp from './SignUp'
import HostPage from './HostPage'
import NewMessage from './NewMessage'
import InfosProfilNbFollowers from './InfosProfilNbFollowers'
import InfosProfilNbFollows from './InfosProfilNbFollows'
import SearchBar from './SearchBar'
import ProfileSearch from './ProfileSearch'
import SuppressAccount from './SuppressAccount'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 'host',
      precPage: 'profile',
      isConnected : false,
      pseudo: '',
      sendMessage:'',
      selfPseudo: '',
      searchInput: '',
      messageId: '',
    }
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
    this.setPseudo = this.setPseudo.bind(this);
    this.setPage_   = this.setPage_.bind(this);
    this.setPageOptions   = this.setPageOptions.bind(this);
    this.setSelfPseudo = this.setSelfPseudo.bind(this);
    this.search = this.search.bind(this);
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
    
    if(this.state.currentPage === 'options') {
      return (
          <SuppressAccount setLogout={this.setLogout} setPageOptions={this.setPageOptions} />
      )
    }
    
    if(this.state.currentPage === 'message') {
      return (
        
              <NewMessage parent_id={this.state.sendMessage} setPage_={this.setPage_} />
              )
    }
    
    // PAGES USUELLES
    
      return (
        <div className="MainPage">
        
        <header>
          <h3>Woof!</h3>
            <SearchBar search={this.search}/>
        </header>
        
        <main>
        { 
          (this.state.currentPage === 'profile')?
          <>
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
          <Feed page={this.state.currentPage} pseudo={this.state.pseudo}
            setPage_={this.setPage_} setPseudo={this.setPseudo}
          />
          </>
        : <></>
        }
        {this.state.currentPage === 'home' &&
          <Feed page={this.state.currentPage} setPage_={this.setPage_}/>
        }
        {this.state.currentPage === 'comments' &&
          <Feed page={this.state.currentPage} setPage_={this.setPage_} setPseudo={this.setPseudo} id={this.state.messageId}/>
        }
        {this.state.currentPage === 'search' && 
          <>
          <ProfileSearch input={this.state.searchInput} setPseudo={this.setPseudo}/>
          <Feed page={this.state.currentPage} setPage_={this.setPage_} input={this.state.searchInput}/>
          </>
        }
        
        <div className="menu">
          <div className="petitbouton" onClick={event => {this.getConnected()}}>
          <h3>Home</h3>
          </div>
        
          <div className="petitbouton" onClick={event => {this.setPseudo()}}>
            <h3>Profile</h3>
          </div>
          
          <div className="petitbouton" onClick = { event => {this.setPageOptions(1)}}>
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
  
  setPageOptions(arg){
    if (arg==1){
      this.setState({
        sendMessage: -1,
        currentPage : 'options'
      })
    }else{
        this.setState({
        sendMessage: -1,
      })
      this.getConnected()
    }
  }
  
  setPage_(PageToSet,idmessage) {
    const nextPage = PageToSet;
    
    if (nextPage==""){
      this.setState({
        searchInput: '',
        currentPage : this.state.precPage
      }); 
    }else{
      if (nextPage=="message"){
        this.setState({
          sendMessage: idmessage,
          precPage: this.state.currentPage,
          currentPage : nextPage
        })
      }
      if (nextPage=='comments'){
        if(this.state.currentPage==='comments'){
          this.setState({currentPage : ''}, () => {
            this.setState({
              precPage:this.state.precPage,
              messageId:idmessage,
              currentPage:'comments'
            })
            
          })
        }else{
          this.setState({
            precPage: this.state.currentPage,
            messageId: idmessage,
            currentPage: nextPage
          })
        }
      }  
      else{
        this.setState({
          searchInput: '',
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
  
  search( input ) {
    if(this.state.currentPage==='search'){
      this.setState({currentPage : '', searchInput: ''}, () => {
        this.setState({
          currentPage:'search',
          searchInput: input
        })
     })
    }
    else{
    this.setState({ currentPage: 'search', searchInput: input })
    }
  }
  
}

export default MainPage
  
  
