import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function InfosProfilNbTweets() {

  const [nb_tweets, getnb_tweets] = useState('');
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    getALLnb_tweets();
  }, []);

  const getALLnb_tweets = () => {
    api.get('/user/display/count/messages/Hugo_babe')
    .then( response => {
      const nb_tweets = response.data.nb_tweets;
      getnb_tweets(nb_tweets);
    })
    .catch(err => {
      console.log(err);
    });
  }
    return (
      <div>
      <h2>{nb_tweets} posts</h2>
      </div>
    )

}
