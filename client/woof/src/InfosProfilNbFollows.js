import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function InfosProfilNbFollows() {

  const [nb_follows, getnb_follows] = useState('');
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    getALLnb_follows();
  }, []);

  const getALLnb_follows = () => {
    api.get('/user/display/count/follows/Hugo_babe')
    .then( response => {
      const nb_follows = response.data.FollowsCount;
      getnb_follows(nb_follows);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  
  
    return (
      <div>
      <h2> {nb_follows} abonnements</h2>
      </div>
    )

}