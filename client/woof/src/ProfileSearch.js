import { useEffect, useState } from 'react'
import axios from 'axios'

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}
export default function ProfileSearch(props) {

  const [profiles, setProfiles] = useState([]);

  useEffect( () => {
    if(props.input && props.input != ''){
    const api = axios.create({
      baseURL : '/api',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    api.get( '/user/search/'+props.input)
      .then( res => {
        setProfiles( [...res.data] )
        })
      .catch(e => {
      })
    }
  }, [props.input]);
  
  
  return(
      <div className="baniere_search">
      <div className="title_search">
      <h2>Profiles</h2>
      </div>
      {profiles.map( profile => {
        return(
          
          <div className='petitbouton_search' onClick = {event => props.setPseudo(props.input)}>
          <h3>{profile.login} @{props.input}</h3>  
          </div>
        )
        } 
      )}
      {(profiles.length == 0)? 
        <>
          <h2>No Matching Profile</h2>
        </>
        :
        <>
        </>
      }
    </div>
  )
}
