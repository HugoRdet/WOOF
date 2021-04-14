import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MessageList from './MessageList'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function ProfileFeed() {

  const [messages, getMessages] = useState('');
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = () => {
    api.get('/user/display/profile')
    .then( response => {
      const messages = response.data;
      getMessages(messages);
    })
    .catch(err => {
      console.log(err);
    });
  }
    return (
      <MessageList messages={messages}/>      
    )

}
