import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function SupressAcount(props) {

  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });


  const Supress = () => {
    var chemin='/user/delete';
    api.put(chemin)
    .then( response => {
      if ( response.data.confirmation==1){
        props.setLogout();
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  
  
  
    return (
        <div className='MainPage'>
          <main>
            <article>
              <div className="title">
              <h2>Options</h2>
              </div>
              
              <div className="petitbouton_message" onClick={event => {Supress()}}>
              <h3>Supprimer son compte</h3>
              </div>
              
              <section class="bigbutton_options" onClick = { (event => props.setPageOptions(0)) }>
              <h3> retour </h3>
              </section>
              
            </article>
          </main>
        </div>
    )

}