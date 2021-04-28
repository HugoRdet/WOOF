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
    const api = axios.create({
      baseURL : '/api',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    api.get( '/user/search/'+input
      .then( res => {
          setProfiles([input])
        })
      .catch(e => {
      })
    )
  }, [input]);

  return (
    <div className="profileSearch">
      {profiles != [] && 
      <div className='profileResult' onClick = {event => props.setPseudo(input)}>
      </div>
      }
      {profiles === [] && 
      <h3>No Matching Profile</h3>
      }
    </div>
  )
}
