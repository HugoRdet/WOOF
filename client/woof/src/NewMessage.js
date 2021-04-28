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
      parent_id : this.props.parent_id,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  response_new_message(response){
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
      <div className="NewMessage">
        <div class="NewMessageBox">
          <input type="text"
            class="NewMessageInput"
            name="content"
            id="input"
            placeholder="Woof ?"
            onChange={this.handleChange}
            value={this.state.content}
          />
          <button class="NewMessageButton" 
            onClick = { (event => this.send()) }>
            Bark
          </button>
        </div>
      </div>
    )

  }
}

export default NewMessage
