import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Baniere(props) {

  const [nb_followers, getnb_followers] = useState(0);
  const [nb_follows, getnb_follows] = useState(0);
  const [nb_tweets_state, getnb_tweets] = useState(0);
  const [follow_button_state, getfollow_button_state] = useState(0);
  const [pseudo,getpseudo]=useState(props.pseudo);
  const [followable, getFollowable]=useState(props.followable)
  
  const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
  });
  
  useEffect(() => {
    Update_baniere();
  }, []);
  
  
  
  const follow_button_maj = () => {
    if (follow_button_state==0){
      var chemin='/user/follow';
      api.put(chemin,{pseudo:pseudo})
      .then( () => {
        Update_baniere().then( ()=>{
          getfollow_button_state(1)
        });
        
        
      })
      .catch(err => {
        console.log(err);
      });
    }else{
      var chemin='/user/unfollow';
      api.put(chemin,{pseudo:pseudo})
      .then( () => {
                Update_baniere().then( ()=>{
          getfollow_button_state(0)
        });
        
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  
  const Update_baniere = () => {
  
    const getALLnb_followers = () => {
      var chemin='/user/display/count/followers/'+pseudo;
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
      var chemin='/user/display/count/follows/'+pseudo;
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
      var chemin='/user/display/count/messages/'+pseudo;
      api.get(chemin)
      .then( response => {
      const nb_tweets_ = response.data.nb_tweets;
      getnb_tweets(nb_tweets_);
    })
    .catch(err => {
      console.log(err);
    });
      }
  
    Promise.all([getALLnb_followers, getALLnb_follows, get_nb_tweets]).then((values) => {
        const follows=values[0];
        const followe=values[1];
        const nb_messages=values[2];
        
          getnb_followers(follows);
          getnb_follows(followe);
          getnb_tweets(nb_messages);
    });
  
  
 }
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
        (followable)?
        <div className="petitbouton_follow" onClick = { (event => follow_button_maj() ) } >
        <div>
        {        
          (follow_button_state==0)?
          <>
          Suivre
          </>
          :
          <>
          Ne plus suivre
          </>
        }
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
