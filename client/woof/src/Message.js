import React, { useEffect, useState } from 'react'
import axios from 'axios';

const serveur_config = {
	headers: {
		'Access-Control-Allow-Origin': "*",
		'Content-Type': 'application/json:charset=UTF-8',
	}
}


export default function Message(props) {
	
	const [statuslike, getstatuslike] = useState(0);
	
	const {message_} = props;
	
	
	const api = axios.create({
		baseURL : '/api/',
		timeout : 1000,
		headers : {'X-Custom-Header' : 'foobar'}
	});
	
	useEffect(() => {
		get_like_s();
	}, []);
	
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
		})
		.catch(err => {
			console.log(err);
		});
			
		}
		
	}
	
	const displayMessage = (props) => {
		
		return (
			<article key={message_._id}>
				<div className="title">
				<h2>@{message_.author_id}</h2>
				</div>
				
				<section className="content">
					{message_.content}
				</section>
						
				<section className="reactions">
				
			{
				(statuslike==0)?
				<section class="reations_elem" onClick = { (event => set_like_s() ) }> 
				<h4> 🖤 Aimer </h4>
				</section>
				:
				<section class="reations_elem" onClick = { (event => set_like_s() ) }> 
				
				<h4> ❤️ J aime </h4>
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
	
