import React, { useEffect, useState } from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

export default function Menu(props) {

  const Logout = () => {
        const api = axios.create({
          baseURL : '/api',
          timeout : 1000,
          headers : {'X-Custom-Header' : 'foobar'}
        });
        api.put('/user/logout')
          .then( response => {
            console.log(response.data.response)
            props.setLogout();
          })
          .catch( err => {
          })
    }

    return (
      <>
      {
        (window.innerWidth<600)?
        
        <div className="menu">
          <div className="petitbouton" onClick={event => {props.getConnected()}}>
          <h3>🏠</h3>
          </div>
        
          <div className="petitbouton" onClick={event => {props.setPseudo()}}>
            <h3>👤</h3>
          </div>
          
          <div className="petitbouton" onClick = { event => {props.setPageOptions(1)}}>
            <h3>⚙️</h3>
          </div>
          
          <div className="petitbouton" onClick = { event => {props.setLogout()} } >
            <h3>🪦</h3>
          </div>
        </div>
        
      
        :
        
        <div className="menu">
          <div className="petitbouton" onClick={event => {props.getConnected()}}>
          <h3>Home</h3>
          </div>
        
          <div className="petitbouton" onClick={event => {props.setPseudo()}}>
            <h3>Profile</h3>
          </div>
          
          <div className="petitbouton" onClick = { event => {props.setPageOptions(1)}}>
            <h3>Options</h3>
          </div>
          
          <div className="petitbouton" onClick = { event => {Logout()} } >
            <h3>Sign Out</h3>
          </div>
        </div>
        
      
      }
      </>
      
    )

}
