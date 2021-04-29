import React, { useEffect, useState } from 'react'
import axios from 'axios';

const serveur_config = {
	headers: {
		'Access-Control-Allow-Origin': "*",
		'Content-Type': 'application/json:charset=UTF-8',
	}
}

function Init_like_button(args) {
	
	const [statuslike, getstatuslike] = useState('');
	
	const api = axios.create({
		baseURL : '/api/',
		timeout : 1000,
		headers : {'X-Custom-Header' : 'foobar'}
	});
	
	useEffect(() => {
		get_like_s();
	}, []);
	
	const get_like_s = () => {
	
		var chemin='/message/getlike/'+args;
		api.get(chemin)
		.then( response => {
			const statuslike= response.data.like
			getstatuslike(statuslike);
		})
		.catch(err => {
			console.log(err);
		});
	}
	
	if (statuslike==0){
		return (
			<>
			<h5> 🖤 </h5>
			<h5> j aime pas</h5>
			</>
		)
	}else{
		return (
			<>	
			<h5> ❤️ </h5>
			<h5> j aime </h5>
			</>
		)
	}
	
	
}





export default function Message(props) {
	
	const displayMessage = (props) => {
		const {message_} = props;
		return (
			<article key={message_._id}>
				<div className="title">
				<h2>@{message_.author_id}</h2>
				</div>
				
				<section className="content">
					{message_.content}
				</section>
						
				<section className="reactions">
				
				<section class="reations_elem" onClick = { (event => console.log("a faire") ) }> 
				<h4> 🖤 Aimer </h4>
				</section>
				
				<section class="reations_elem" onClick = { (event => props.setPage_("message",message_._id) ) }> 
				<h4> 📣 Commenter</h4>
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
	
