import React from 'react'
import axios from 'axios'


const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : "",
      parent_id : this.props.parent_id
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  response_new_message(response){
     this.props.setPage_('');
     document.getElementById("input").value = "";
  }
  

  send() {
    
    const api = axios.create({
      baseURL : '/api',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    api.put('/message/write', {
      "content": this.state.content,
      "parent_id": this.state.parent_id,
    })
      .then( response => {
        this.response_new_message(response);
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    return (
        <div className='MainPage'>
          <main>
            <div className='article_tweet'>
              <div className="title">
              <h2>Envoyer un nouveau message</h2>
              </div>
      
          <textarea type="text"
            className="espace_tweet_form"
            name="content"
            id="input"
            placeholder="écrire.."
            onChange={this.handleChange}
            value={this.state.content}
          />
          
          <div>
          <div className="bigbutton_options" 
          onClick = { (event => this.response_new_message()) }>
          Annuler
          </div>
          
          <div className="bigbutton_options" 
            onClick = { (event => this.send()) }>
            Poster
          </div>
          
            </div>
          </div>
        </main>
      </div>

    )

  }
}

export default NewMessage
  
