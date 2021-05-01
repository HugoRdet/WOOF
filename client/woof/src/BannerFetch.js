import { useEffect, useState } from 'react'
import axios from 'axios'

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}
export default function BannerFetch(pseudo) {


  const [followers, setFollowers] = useState(0);
  const [follows, setFollows] = useState(0);
  const [tweets, setTweets] = useState(0);
  const [followed, setFollowed] = useState(false)

  useEffect( () => {
    let isMounted = true;
    const api = axios.create({
      baseURL : '/api',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    
    api.get('/user/display/count/followers/'+pseudo)
        .then( res => {
          setFollowers(res.data.FollowersCount);
          return api.get('/user/display/count/follows/'+pseudo)
                  .then( res => {
                    setFollows(res.data.FollowsCount);
                    return api.get('/user/display/count/messages/'+pseudo)
                            .then( res => {
                              setTweets(res.data.nb_tweets);
                              return api.get('/user/follow/'+pseudo)
                                      .then( res => {
                                        setFollowed(res.data.response);
                                      })
                            })
                  })

        })
    .catch(e => {
    })
  }, [pseudo]);

  return {
    followers,
    follows,
    tweets,
    followed
  }
}
