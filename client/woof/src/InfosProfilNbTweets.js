import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function InfosProfilNbTweets(props) {

  const [nb_tweets_state, getnb_tweets] = useState(0);
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    get_nb_tweets();
  }, []);

  const get_nb_tweets = () => {
    var chemin='/user/display/count/messages/'+props.pseudo;
    api.get(chemin)
    .then( response => {
      const nb_tweets_ = response.data.nb_tweets;
      getnb_tweets(nb_tweets_);
    })
    .catch(err => {
      console.log(err);
    });
  }
    return (
      <div>
      <h2>{nb_tweets_state} posts</h2>
      </div>
    )

}
