import { useEffect, useState } from 'react'
import axios from 'axios'

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}
export default function ProfileSearch(props) {

  const [profile, setProfile] = useState('');

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
        setProfile(props.input)
        })
      .catch(e => {
      })
    }
  }, [props.input]);

  return (
    <div className="profileSearch">
          <div className='profileResult' onClick = {event => props.setPseudo(props.input)}>
          <h3>{profile}</h3>  
          </div>
      {profile === '' && 
          <h3>No Matching Profile</h3>
      }
    </div>
  )
}
