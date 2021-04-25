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
    })
    .catch(err => {
      console.log(err)
      })
    
  }

  render(){

    return (
          
          
      
      <main id="loginPage">
      <div class="container">
      <article id="log">
      <section class="container">
      
      <div class="login-box">
      <label><h3>Username</h3></label>
      <input type="text" name="login" onChange={this.handleChange}value={this.state.login}/>
      </div>
      
      <div class="login-box">
      <label><h3>Password</h3></label>
      <input type="password" name="password" onChange={this.handleChange}value={this.state.password}/>
      </div>
      </section>
      
      <div key={this.state.status}>
      {
        
        (this.state.status != "")
        ? <span style={{color:"red"}}>{this.state.texterror}</span>
        : <span></span>
      }
      
      <section class="bigbutton" onClick = { (event => this.send()) }>
      <h3> se connécter</h3>
      </section> 
      
      <section class="link" onClick={this.props.getSignUp}>
      <h3> Oops, s'inscrire </h3>
      </section> 
      
      
      </div>
      </article>
      </div>
      </main>
      );
  };
}

export default SignIn;


