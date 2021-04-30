import { useEffect, useState } from 'react'
import axios from 'axios'

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}
export default function FeedFetch(number, multiplier, page, pseudo, id, input) {


  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false)

  function getUrl() {
    if (page === 'profile') {
      return '/user/display/profile/'+pseudo+'&'+number+'&'+multiplier
    }
    if (page === 'home') {
      return '/user/display/newsfeed'+number+'&'+multiplier
    }
    if (page === 'search' && input !='')
      return '/message/search/'+input+'&'+number+'&'+multiplier
    if (page === 'comments'){
      return 'message/display/comments/'+id+'&'+number+'&'+multiplier
    }
  }

  useEffect( () => {
    setLoading(true);
    const api = axios.create({
      baseURL : '/api',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    api.get(getUrl())
      .then( res => {
        setMessages(prevMessages => {
          return [...prevMessages, ...res.data].slice(0, number*(multiplier+1));
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch(e => {
      })
  }, [number, multiplier, page, pseudo]);

  return {
    loading,
    messages,
    hasMore
  }
}
