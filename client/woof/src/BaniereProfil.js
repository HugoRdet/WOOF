import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Baniere(props) {

  const [nb_followers, getnb_followers] = useState(0);
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    getALLnb_followers();
  }, []);
  
  const getALLnb_followers = () => {
    var chemin='/user/display/count/followers/'+props.pseudo;
    api.get(chemin)
    .then( response => {
      const nb_followers__ = response.data.FollowersCount;
      getnb_followers(nb_followers__);
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