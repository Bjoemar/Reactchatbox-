import React , { Component } from 'react';
import emoji from './logo.svg';
import './App.css';
import Message from './Component/chatmessage.js';
import OtherChatmessage from './Component/otherChatmessage.js';
import Editor from './Component/texteditor.js';
import {InputGroup,FormControl,Button} from 'react-bootstrap';
import Picker from 'emoji-picker-react';
import {submitStatus , getMessage , getAccount} from './Message/connection.js';

import io from 'socket.io-client';

const socket = io('http://192.168.1.107:3001');


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'message' : '',
            'username' : '',
            'email' : '',
            'site' : '',
            'showEmoji' : false,
            'messageBox' : '500px',
            'newMessage' : [],
            'messages' : [],
        };

        
        socket.on("newMessage", msg => {
            let newMessage = this.state.newMessage;
            newMessage.push(msg);
            this.setState({'newMessage' : newMessage , 'showEmoji' : false , 'messageBox' : '500px' , 'message' : ''});
            setTimeout(function(){
                var element = document.getElementById('chat_area');
                element.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);    
            },5)
        });


    }

    componentDidMount(){

        getMessage().then(response=>{
            let username = localStorage.getItem('username');
            let site = localStorage.getItem('site');
            let email = localStorage.getItem('email');
            if (username) {
                this.setState({messages : response , 'username' : username , 'email' : email , 'site' : site});
            } else {
                this.setState({messages : response});
            }


            setTimeout(function(){
                var element = document.getElementById('chat_area');
                element.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);    
            },5)
        });
    }


    showEmoji(){

        if(this.state.showEmoji) {
            this.setState({'showEmoji' : false , 'messageBox' : '500px'});
        } else {
            this.setState({'showEmoji' : true , 'messageBox' : '180px'});
        }
    }

    onEmojiClick(event, emojiObject){
        let message = this.state.message;
        this.setState({'message' : message+=emojiObject.emoji});
    }

    inputChange(event){
        let message = event.target.value
        this.setState({'message' : message});
    }

    sendMessage(){
        let message = this.state.message;
        let username = this.state.username;
        let email = this.state.email;
        let site = this.state.site;

        let msgObj = {
            'message' : message,
            'username' : username,
            'email' : email,
            'site' : site,
        };
        if (message.length > 0) {
            
            submitStatus(msgObj).then(response=>{
                if (response.success) {
                   this.setState({'showEmoji' : false , 'messageBox' : '500px' , 'message' : ''});
                   setTimeout(function(){
                       var element = document.getElementById('chat_area');
                       element.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);    
                   },5)
                }
            });
        }
    }



    render(){
        let editorShow = "none";
        let emojiX = window.innerWidth;

        if (this.state.showEmoji) {
            editorShow = "block";
        }

        let messages = this.state.messages.map(key=>{
            if (key.email == this.state.email && key.username == this.state.username && key.site == this.state.site) {
                return <Message key={key._id} message={key.message} username={key.username} site={key.site}/>
            } else {
                return <OtherChatmessage key={key._id} message={key.message} username={key.username} site={key.site}/>
            }
        });

        let  newMessage = this.state.newMessage.map(key=>{
            if (key.email == this.state.email && key.username == this.state.username && key.site == this.state.site) {
                return <Message key={key._id} message={key.message} username={key.username} site={key.site}/>
            } else {
                return <OtherChatmessage key={key._id} message={key.message} username={key.username} site={key.site}/>
            }
        });

        let textInput;

      
        if (this.state.username) {
            textInput = <div>
                            <InputGroup>
                                <FormControl
                                placeholder="Type Here .."
                                aria-label="Type Here .."
                                aria-describedby="basic-addon2"
                                onChange={this.inputChange.bind(this)}
                                value={this.state.message}
                              />
                                <InputGroup.Append>
                                    <Button onClick={this.showEmoji.bind(this)} variant="secondary" style={{ 'width' : '50px' , 'zindex' : '5'}}><img src={emoji}/></Button>
                                    <Button onClick={this.sendMessage.bind(this)}variant="secondary">Send</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <div id="emojiBox" style={{'width' : '100%' , 'display' : editorShow}}> 
                                <Picker style={{'width' : '500px'}} onEmojiClick={this.onEmojiClick.bind(this)}/>
                            </div>

                        </div>
        }

        return(
            <div style={{'padding' : '10px'}}>
                <div id="chat_area" style={{'height' : this.state.messageBox , 'overflowY' : 'scroll'}}>
                     {messages}
                     {newMessage}
                </div>

                {textInput}
            </div>
        )

    }
} 

export default Chat;