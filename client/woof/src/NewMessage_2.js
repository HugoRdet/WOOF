import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function NewMessage(props) {

  const [nb_followers, getnb_followers] = useState('');
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    getALLnb_followers();
  }, []);

  const getALLnb_followers = () => {
    api.get('/user/display/count/followers/Hugo_babe')
    .then( response => {
      const nb_followers = response.data.FollowersCount;
      getnb_followers(nb_followers);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  
  
    return (
      <div>
      <h2> {nb_followers} abonnés</h2>
      </div>
    )

}
