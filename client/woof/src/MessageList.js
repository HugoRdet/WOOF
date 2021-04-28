import React from 'react'

import Message from './Message'





export default function MessageList(props) {

  const displayMessages = (props) => {
    const {messages} = props;

    if (messages.length > 0) {
      return (
        messages.slice(0).reverse().map( (message, index) => {
          return (
            <Message message_={message}/> 
          )
        })
      )
    } else { 
      return (
        <article>
        <h3>Pas encore de messages</h3>
        </article>
      )
    }
  }
  return (
    <>
      {displayMessages(props)}
    </>
  )
}
