import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Baniere(props) {

  const [nb_followers, getnb_followers] = useState(0);
  const [nb_follows, getnb_follows] = useState(0);
  const [nb_tweets_state, getnb_tweets] = useState(0);
  const [follow_button_state, getfollow_button_state] = useState(0);
  const [pseudo,getpseudo]=useState(props.pseudo);
  const [etat_b_S, get_etat_b_S] = useState("suivre");
  
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  
  
  
  
  
  const init_follow_b= () =>{
        var chemin='/user/display/getfollow/'+props.pseudo;
      api.get(chemin)
      .then( response => {
        const b_init__ = response.data.response;
        getfollow_button_state(b_init__);
        
        if (b_init__){
          get_etat_b_S("ne plus suivre");
        }else{
          get_etat_b_S("suivre");
        }
        
        })
      .catch(err => {
        console.log(err);
        });
  }
  
  
  
  
  const follow_button_maj = () => {
    if (follow_button_state==0){
      var chemin='/user/follow';
      api.put(chemin,{pseudo:props.pseudo})
      .then( () => {
        
          getfollow_button_state(1)
        
      })
      .catch(err => {
        console.log(err);
      });
    }else{
      var chemin='/user/unfollow';
      api.put(chemin,{pseudo:props.pseudo})
      .then( () => {
                          getfollow_button_state(0)
      
        
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  
  
  
    const getALLnb_followers = () => {
      var chemin='/user/display/count/followers/'+props.pseudo;
      api.get(chemin)
      .then( response => {
        const nb_followers__ = response.data.FollowersCount;
        getnb_followers(nb_followers__);
        })
      .catch(err => {
        console.log(err);
        });
      }
  
    const getALLnb_follows = () => {
      var chemin='/user/display/count/follows/'+props.pseudo;
      api.get(chemin)
      .then( response => {
        const nb_follows__ = response.data.FollowsCount;
        getnb_follows(nb_follows__);
       })
      .catch(err => {
        console.log(err);
       });
     }
  
    const get_nb_tweets = () => {
      var chemin='/user/display/count/messages/'+props.pseudo;
      api.get(chemin)
      .then( response => {
      const nb_tweets_ = response.data.nb_tweets;
      getnb_tweets(nb_tweets_);
    })
    .catch(err => {
      console.log(err);
    });
      }
 
      useEffect(() => {
    init_follow_b();
    getALLnb_followers();
    getALLnb_follows();
    get_nb_tweets();
    
  }, [props.pseudo,follow_button_state]);


    const display_Baniere=(props) => {
          return (
          <div className="baniere">
            <div className="nom">
              <h1>{props.pseudo}</h1>
            </div>
            
            <div className="content_b">
            <h2>{nb_tweets_state} posts</h2>
            </div>
          
            <div className="content_b">
            <h2>{nb_follows} abonnements</h2>
            </div>
          
            <div className="content_b">
            <h2> {nb_followers} abonnés </h2>
            </div>
            
      {
        (props.selfPseudo!=props.pseudo)?
        <div className="petitbouton_follow" onClick = { (event => follow_button_maj() ) } >
        <div>
        
        {etat_b_S}
        
        </div>
        </div>
        :
        <></>
      }
          </div>
    )
    }
  
  
    
    return (
      <>
      {display_Baniere(props)}
      </>
    )
  
    

}
