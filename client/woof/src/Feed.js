import React, {useCallback, useRef, useEffect, useState } from 'react'
import Message from './Message'
import axios from 'axios'


export default function Feed(props) {

  const [number, setNumber] = useState(3);
  const [multiplier, setMultiplier] = useState(0);
  const [id, setId] = useState(new Set()) 
  
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false)
  
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    setMessages([])
    setMultiplier(0)
  }, [props.pseudo,props.page, props.id, props.input])

  useEffect(() => {
    let url = getUrl()
    feedFetch(url)
  }, [multiplier])
  
  const getUrl = () => {
      if (props.page === 'profile') {
        return '/user/display/profile/'+props.pseudo+'&'+number+'&'+multiplier
      }
      if (props.page === 'home') {
        return '/user/display/newsfeed/'+number+'&'+multiplier
      }
      if (props.page === 'search' && props.input !='')
        return '/message/search/'+props.input+'&'+number+'&'+multiplier
      if (props.page === 'comments'){
        return 'message/display/comments/'+props.id+'&'+number+'&'+multiplier
      }
  }
  
  const feedFetch = (url) => {
    setLoading(true);
    api.get(url)
      .then( res => {
        console.log(res)
        const prev= messages
        const currMessages = [...prev, ...res.data]
        console.log("HAHA",currMessages,"   ",messages);
        setMessages(currMessages);
        console.log("OHO",currMessages,"   ",messages);
        
        setLoading(false)
      })
      .catch(e => {}) 
  }
  
  
  const DisplayFeed = (props) =>{

    const observer = useRef();
    const lastMessageRef = useCallback(node => {
      if(loading)
        return null;
      if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && hasMore){
          setMultiplier(prevMultiplier => prevMultiplier + 1);
        }
      }, {threshold : 0.95} );
      if(node) observer.current.observe(node);
    }, [loading, hasMore]);

    if (messages.length!=0){
    return (
      <div className="feed">
        
        {messages.map( (message,index) => {
          if( !id.has(message._id) ) {
            id.add(message._id);
          if (messages.length == index+1){
              return (
                <div ref={lastMessageRef}>
                <Message message_={message} setPage_={props.setPage_} setPseudo={props.setPseudo}/>
                </div>
              )
            } else {
              return (
                <>
                <Message message_={message} setPage_={props.setPage_} setPseudo={props.setPseudo}/>
                </> 
              )
            }
        }
        }
      )}
      </div>
      
    );
  }
  }
  

  return (
    <>
      { console.log(messages)}
      {DisplayFeed(props)}
    </>
  )
  
  
} 
  
