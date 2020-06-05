import React ,{Component} from 'react';
import {Card} from 'react-bootstrap';
import logo from '../logo.svg';

export default function Message (props) {
	return (
		<div className="text-right">
			<label style={{'color': 'black'}}>{props.username} <small style={{'opacity': '0.5'}}> | {props.site} </small></label>
			<br/>
			<Card 
				style={{'float' : 'right'}}
				body
				className="chatText mb-2 bg-primary text-white text-left" >
					{props.message}
			</Card>&nbsp;<button className="optionChatButton"> --- </button>
			<div className="clear"></div>
		</div>

	)
}