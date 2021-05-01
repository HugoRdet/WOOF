import React from 'react'
import axios from 'axios'

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}


class FollowButton extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      followed: this.props.followed
    }
  }

  follow(){
    const api = axios.create({
      baseURL : '/api',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    if( this.state.followed ) {
      api.put('/user/unfollow', {pseudo : this.props.pseudo})
        .then( 
          this.setState({ followed : false })
        )
    }
    else{
      api.put('/user/follow', {pseudo : this.props.pseudo})
        .then( 
          this.setState({ followed : true })
        )
    }
  }

  render(){
  return (
    <div className="petitbouton" onClick={ event => {this.follow()} }>
      {
        (this.state.followed)?
          <label>Unfollow</label>
        :
          <label>Follow</label>
      }
    </div>
  )
  }
}

export default FollowButton
