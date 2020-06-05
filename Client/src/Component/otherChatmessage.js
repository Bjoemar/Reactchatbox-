import React ,{Component} from 'react';
import {Card} from 'react-bootstrap';
import logo from '../logo.svg';

export default function Message (props) {
	return (
		<div className="text-left">
			<label style={{'color': 'black'}}>{props.username} <small style={{'opacity': '0.5'}}> | {props.site} </small></label>
			<br/>
			<Card 
				style={{'float' : 'left'}}
				body
				className="chatText mb-2 bg-secondary text-white text-left" >
					{props.message}
			</Card>
			<div className="clear"></div>
		</div>
	)
}