import React, {useState, useRef ,useCallback} from 'react'
import FeedFetch from './FeedFetch'
import Message from './Message'

export default function Feed(props) {
  
  const [number, setNumber] = useState(3);
  const [multiplier, setMultiplier] = useState(0);
  const [pseudo, setPseudo] = useState(props.pseudo);
  const [page, setPage] = useState(props.page);
  const [input, setInput] = useState(props.input)
  const [id, setId] = useState(props.id)
  
    const {
      loading,
      messages,
      hasMore
    } = FeedFetch(number, multiplier, page, pseudo, id, input);
    let ids = new Set();
    
  const observer = useRef();
    const lastMessageRef = useCallback(node => {
      if(loading)
        return ;
      if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && hasMore){
          setNumber(prevNumber => prevNumber);
          setMultiplier(prevMultiplier => prevMultiplier + 1);
        }
      }, {threshold : 0.95} );
      if(node) observer.current.observe(node);
    }, [loading, hasMore, props.pseudo]);
    return (
      <div className="feed">
        {messages.map( (message,index) => {
          if( !ids.has(message._id) ) {
            ids.add(message._id);
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

