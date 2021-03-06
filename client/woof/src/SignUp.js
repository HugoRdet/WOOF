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
      if(response.data["status"] != 201) {
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
      
        {
          (this.state.status != "")? 
          
        <div>
        <div className="login-box_erreur">
        <label><h3>login</h3></label>
        <input type="text" name="login" onChange={this.handleChange} value={this.state.login}/>
        </div>
      
      
        <div className="login-box_erreur">
        <h3>pseudo</h3>
        <input type="text" name="pseudo" onChange={this.handleChange} value={this.state.pseudo}/>
        </div>
      
        <div className="login-box_erreur">
        <h3>Password</h3>
        <input type="password" name="password" onChange={this.handleChange}value={this.state.password}/>
        </div>
          
        <div className="texte_erreur">
        <h3>{this.state.texterror}</h3>
        </div>
        
        </div>
        : 
          <div>
        <div className="login-box">
        <label><h3>login</h3></label>
        <input type="text" name="login" onChange={this.handleChange} value={this.state.login}/>
        </div>
      
      
        <div className="login-box">
        <h3>pseudo</h3>
        <input type="text" name="pseudo" onChange={this.handleChange} value={this.state.pseudo}/>
        </div>
      
        <div className="login-box">
        <h3>Password</h3>
        <input type="password" name="password" onChange={this.handleChange}value={this.state.password}/>
        </div>  
        </div>
          
        }
      
      
        
        <section className="bigbutton" onClick = { (event => this.send()) }>
        <h3> s'inscrire</h3>
        </section> 
            

        <section className="link" onClick={this.props.setLogout}>
        <h3> Oops, se connecter </h3>
        </section> 
      
      
      
      
          </div>
          
        </article>
      </div>
      
      
      
      );
  };
}

export default SignUp;


  
