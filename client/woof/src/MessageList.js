import React from 'react'

export default function MessageList(props) {

  const displayMessages = (props) => {
    const {messages} = props;

    if (messages.length > 0) {
      return (
        messages.map( (message, index) => {
          return (
            <article key={message._id}>
              <div className="title">
                <h2>@{message.author_id}</h2>
              </div>
              
              
            
              
              <section className="content">
                {message.content}
                
                {message.likes.length}
              </section>
            </article>
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
