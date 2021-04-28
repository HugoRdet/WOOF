import React from 'react'
import axios from 'axios';








export default function InitMessageLike(props) {
	
	function Init_like_button(props) {
		const {message_id} = props;
		
		const api = axios.create({
			baseURL : '/api/',
			timeout : 1000,
			headers : {'X-Custom-Header' : 'foobar'}
		});
		api.get('/message/getlike',{
			"messageId":"KZksDfYmr4fF9QK9"
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			console.log(err)
		})
	}
	
	
	return (
		<>
		{Init_like_button(props)}
		</>
	)
}
