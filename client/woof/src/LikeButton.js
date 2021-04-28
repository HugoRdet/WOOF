import React from 'react';
import axios from 'axios';

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

class LikeButton extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      like_state :this.init_like()
    };
    
  }
  
  init_like(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    api.get('/message/getlike',{
      "messageId":this.props.message
    })
    .then(response => {
      this.state.like_state=response;
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  
  send_like() {
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    api.put('/message/like',{
      "messageId":this.state.message_id
    })
    .then(response => {
      this.state.like_state=response;
    })
    .catch(err => {
      console.log(err)
    })
    
  }
    
    
    render(){
    return (
      <div>
       <h3> {this.state.like_state} </h3>
      </div>
    );
  };
}

export default LikeButton;
  