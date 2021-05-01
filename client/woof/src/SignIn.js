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
      status : "",
      pseudo: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  response_login(response) {
      if (response.data["status"] == 200) {
          
        const pseudo = response.data["pseudo"];
        this.setState({status:"", pseudo: pseudo})
        this.props.setPseudo(this.state.pseudo);
        this.props.getConnected();
      } else {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
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
          
      <div id="loginPage">
        <article id="log">
          
      <div className="title">
      <h2>@Woof</h2>
      </div>
          
          <div className="content_form">
          
          
          
          <div key={this.state.status}>
          {
            (this.state.status != "")?
            
            <div>
            
                        
          <div className="login-box_erreur">
            <label><h3>Login</h3></label>
            <input type="text" name="login" onChange={this.handleChange}value={this.state.login}/>
          </div>
      
          <div className="login-box_erreur">
            <label><h3>Password</h3></label>
            <input type="password" name="password"  onChange={this.handleChange}value={this.state.password}/>
          </div>
            
            <div className="texte_erreur">
            <h3>{this.state.texterror}</h3>
            </div>
            </div>
            : 
            <div>
            
                      
          <div className="login-box">
            <label><h3>Login</h3></label>
            <input type="text" name="login" onChange={this.handleChange}value={this.state.login}/>
          </div>
      
          <div className="login-box">
            <label><h3>Password</h3></label>
            <input type="password" name="password"  onChange={this.handleChange}value={this.state.password}/>
          </div>
          
            </div>
          }    
      
            <section className="bigbutton" onClick = { (event => this.send()) }>
              <h3> se connecter</h3>
            </section> 
        
            <section className="link" onClick={this.props.getSignUp}>
              <h3> Oops, s'inscrire </h3>
            </section> 
          </div>
          </div>
        </article>
      </div>
      );
  };
}

export default SignIn;


