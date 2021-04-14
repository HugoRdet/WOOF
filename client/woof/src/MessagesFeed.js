import React from 'react'
import axios from 'axios'
import Message from './Message'

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

class MessagesFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 5,
      multiplier: 0,
      messages: null,
    }

    this.displaySelf = this.displaySelf.bind(this);
    this.displayFollowed = this.displayFollowed.bind(this);
    this.displaySearchResult = this.displaySearchResult.bind(this);
  }

  displaySelf() {
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    }) ;
    api.get('/user/display/profile', {"pseudo" : "baba"})
      .then( response => {
        this.setState({messages : response.data});
      })
      .catch(err => {
        console.log(err);
      })
  }
  displayFollowed() {}
  /*  const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    }) ;
    api.get('/user/display/:pseudo')
      .then( response => {
        const messages = response.map((messageJSON) => {
          (<Message message={messageJSON}/>)
        });
        const messageList = (
          <ul>{messages}</ul>
        );
        return messageList;
      })
  }
  */
  displaySearchResult() {}
    /*const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    }) ;
    api.get('/user/display/:pseudo')
      .then( response => {
        const messages = response.map((messageJSON) => {
          (<Message message={messageJSON}/>)
        });
        const messageList = (
          <ul>{messages}</ul>
        );
        return messageList;
      })
  }*/

  render() {
    if(this.props.currentPage === 'profile'){
      return (
        <div className="MessagesFeed">
          {this.displaySelf()} 
          <div className="MessageList">
            {this.state.messages ? function(){
                  return (
                    <Message message={this.state.messages[0]}/>
                  )
                
            } : <div>Loading...</div> }
          </div>
        </div>
      )
    }
    if(this.props.currentPage === 'messages') {
      return(
        <div className="MessagesFeed">
          {this.displayFollowed}
        </div>
      )
    }
    if(this.props.currentPage === 'searchResult'){
      return(
        <div className="MessagesFeed">
          {this.displaySearchResult}
        </div>
      )
    }

  }
}

export default MessagesFeed
