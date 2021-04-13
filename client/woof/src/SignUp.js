import React from 'react';
import axios from 'axios';

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login : "",
      password : "",
      pseudo: "",
      status : ""
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  response_sign_up(response) {
      if(response.data["status"] == 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
      } else {
          this.setState({status:""})
          this.props.setLogout();
      }
  }

  send() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.put('/user/create/',{
              "login":this.state.login,
              "pseudo":this.state.pseudo,
              "password":this.state.password,
            })
    .then(response => {
      this.response_sign_up(response);
      this.props.getConnected();
    })
    .catch(err => {
      console.log(err)
      })
    
  }

  render(){

    return (
          <div>
          <div>
              <span>
                  <div>Login</div>
                  <input
                      type="text"
                      name="login"
                      onChange={this.handleChange}
                      value={this.state.login}
                  />
              </span>
              <span>
                  <div>
                      Username
                  </div>
                  <input
                      type="text"
                      name="pseudo"
                      onChange={this.handleChange}
                      value={this.state.pseudo}
                  />
              </span>
              <span>
                  <div>
                      Password
                  </div>
                  <input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                  />
              </span>
          </div>
          <div key={this.state.status}>
              {
                (this.state.status == "error")
                ? <span style={{color:"red"}}>{this.state.texterror}</span>
                : <span></span>
              }
              <button
                onClick = { (event => this.send()) }
              >
              Create Account
              </button>
          </div>
          </div>
      );
  };
}

export default SignUp;


