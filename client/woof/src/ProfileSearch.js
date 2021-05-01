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

  console.log(props.input)


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

  if (profiles.length!=0){
    
  }else {
        <div className="baniere">
      {profiles.map( profile => {
        return(
          <>
          <h2>Profile</h2>
          <div className='profileResult' onClick = {event => props.setPseudo(props.input)}>
          <h3>{profile.login} @{props.input}</h3>  
          </div>
          </>
        )
        } 
      )}
      {profiles === [] && 
          <h3>No Matching Profile</h3>
      }
    </div>
  }
  return (
    <div className="baniere">
    <h2>Pas de nom d'utilisateur correspondant</h2>
    </div>
  )
}
