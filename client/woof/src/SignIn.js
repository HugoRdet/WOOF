import React from 'react';
import axios from 'axios';

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login : "",
      password : "",
      status : ""
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  response_login(response) {
      if(response.data["status"] == 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
      } else {
          this.setState({status:""})
          this.props.getConnected();
      }
  }

  send() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.post('/user/login/',{
              "login":this.state.login,
              "password":this.state.password,
            })
    .then(response => {
      this.response_login(response);
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
              Sign In
              </button>
          </div>
          </div>
      );
  };
}

export default SignIn;


