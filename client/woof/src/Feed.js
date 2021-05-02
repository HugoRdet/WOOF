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
    setId(new Set())
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
        let addRes = res.data
          .slice( - (number * (multiplier + 1)))
          .filter( (message) => 
          ( !id.has(message._id))
        )
        addRes
          .map( message => { 
            setId( prevId => prevId.add( message._id ) ) 
          })
          setMessages( prevState => {
            return [...prevState, ...addRes]
          })

          setLoading(false)
      })
      .catch(e => {}) 
  }
  
  
  const DisplayFeed = (props) =>{

    const observer = useRef();
    const lastMessageRef = useCallback(node => {
      if(loading)
        return
      if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          setMultiplier(prevMultiplier =>{
            return prevMultiplier + 1});
        }
      }, {threshold : 0.99});
      if(node) observer.current.observe(node);
    }, [loading]);

    if (messages.length!=0){
    return (
      <>
      <div className="feed">
        {
          messages.map( (message, index) => {
              if (index+1 === id.size){
              return (
                <div key={message._id} ref={lastMessageRef}>
                <Message message_={message} setPage_={props.setPage_} setPseudo={props.setPseudo}/>
                </div>
              )
            } else {
              return (
                <div key={message._id}>
                <Message message_={message} setPage_={props.setPage_} setPseudo={props.setPseudo}/>
                </div> 
              )
            }
        }
      )}
      </div>
      </>
    );
  }
  }
  

  return (
    <>
      {
        DisplayFeed(props)
      }
    </>
  )
  
  
} 
  
