import React, { useEffect, useState } from 'react'
import axios from 'axios';

const serveur_config = {
	headers: {
		'Access-Control-Allow-Origin': "*",
		'Content-Type': 'application/json:charset=UTF-8',
	}
}


export default function Message(props) {
	
	const {message_} = props;
	const [statuslike, getstatuslike] = useState(0);
	const [Countlikes, getCountlikes] = useState(message_.likes.length);
	
	
	
	
	
	const api = axios.create({
		baseURL : '/api/',
		timeout : 1000,
		headers : {'X-Custom-Header' : 'foobar'}
	});
	
	useEffect(() => {
		get_like_s();
	}, [statuslike,Countlikes]);
	
	const get_like_s = () => {
	
		var chemin='/message/getlike/'+message_._id;
		api.get(chemin)
		.then( response => {
			const statuslike_= response.data.likestatus;
			getstatuslike(statuslike_);
		})
		.catch(err => {
			console.log(err);
		});
	}
	
	const set_like_s = () => {
		
		if (statuslike==0){
			var chemin='/message/like';
			api.put(chemin,{messageId:message_._id})
		.then( response => {
			const statuslike_= response.data.like;
			getstatuslike(statuslike_);
			getCountlikes(Countlikes+1);
		})
		.catch(err => {
			console.log(err);
		});
			
			
		}else{
			
		var chemin='/message/unlike';
			api.put(chemin,{messageId:message_._id})
		.then( response => {
			const statuslike_= response.data.unlike;
			getstatuslike(statuslike_);
			getCountlikes(Countlikes-1);
		})
		.catch(err => {
			console.log(err);
		});
			
		}
		
	}
	
	const displayMessage = (props) => {
		
		return (
			<article key={message_._id}>
				<div className="title" >
				<section className="link_pseudo" onClick = { (event => props.setPseudo(message_.author_id) ) } >
				<h2>@{message_.author_id}</h2>
				</section>
				</div>
				
				<section className="content">
					<h3>	{message_.content}</h3>
				</section>
						
				<section className="reactions">
				
			{
				(statuslike==0)?
				<section class="reations_elem" onClick = { (event => set_like_s() ) }> 
				<h4> 🖤 {Countlikes} </h4>
				</section>
				:
				<section class="reations_elem" onClick = { (event => set_like_s() ) }> 
				<h4> ❤️ {Countlikes} </h4>
				</section>
			}
				<section class="reations_elem" onClick = { (event => props.setPage_("message",message_._id) ) }> 
				<h4> 📣 Commenter</h4>
				</section>
				
				<section class="reations_elem" onClick = { (event => props.setPage_("comments",message_._id) ) }> 
				<h4> Voir les réponses </h4>
				</section>

				</section>
						
			</article>
						
					)
	}
	
	return (
		<>
		{displayMessage(props)}
		</>
	)
}
	
