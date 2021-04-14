import React from 'react'

export default function MessageList(props) {

  const displayMessages = (props) => {
    const {messages} = props;

    if (messages.length > 0) {
      return (
        messages.map( (message, index) => {
          return (
            <div className="Message" key={message._id}>
              <h4 className="MessageHeader">{message.author_id}</h4>
              <p className="MessageBody">{message.content}</p>
              <span className="MessageFooter">{message.likes.length}</span>
            </div>
          )
        })
      )
    } else { 
      return (<h4>Pas encore de messages</h4>)
    }
  }
  return (
    <>
      {displayMessages(props)}
    </>
  )
}
