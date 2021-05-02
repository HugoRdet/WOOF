import React, { useEffect, useState } from 'react'


export default function Menu(props) {

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
          
          <div className="petitbouton" onClick = { event => {props.setLogout()} } >
            <h3>Sign Out</h3>
          </div>
        </div>
        
      
      }
      </>
      
    )

}
