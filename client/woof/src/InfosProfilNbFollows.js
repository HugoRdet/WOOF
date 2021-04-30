import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function InfosProfilNbFollows(props) {

  const [nb_follows, getnb_follows] = useState(0);
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    getALLnb_follows();
  }, []);

  const getALLnb_follows = () => {
    var chemin='/user/display/count/follows/'+props.pseudo;
    api.get(chemin)
    .then( response => {
      const nb_follows__ = response.data.FollowsCount;
      getnb_follows(nb_follows__);
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