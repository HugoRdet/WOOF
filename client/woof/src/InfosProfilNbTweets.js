import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function InfosProfilNbTweets(props) {

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
    var chemin='/user/display/count/messages/'+props.pseudo;
    api.get(chemin)
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
