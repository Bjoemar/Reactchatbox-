const mongoose = require('mongoose');
const getSecret = require('./secret.js');	
const express = require('express');
const bodyParser = require('body-parser');
const APIPORT = 3001;
const app = express();
const router = express.Router();
const cors = require('cors');

const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);

let Message = require('./Model/Message.js');

mongoose.connect(getSecret('url'), {useUnifiedTopology: true , useNewUrlParser: true });

let db = mongoose.connection;
db.on("error",console.error.bind(console, "MongoDb Connection error"));

// Open Shift Config

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'



app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// server.listen(APIPORT,'192.168.1.107', () => console.log(`LISTENING ON PORT ${APIPORT}`));

server.listen(server_port , server_ip_address , function(){
	console.log('Listening on' + server_ip_address + ', port' + server_port);	
})



app.use(cors());

app.use('/api',router);

router.post('/sendMessage',(req,res)=>{
	let messageModel = new Message;
	const {message , email , username, site} = req.body;
	messageModel.message = message;
	messageModel.email = email;
	messageModel.username = username;
	messageModel.site = site;

	messageModel.save((err , message) => {
		if (err) res.json({success : false});
		io.sockets.emit("newMessage", message);
		res.json({'success'  : true , 'message' : message});
	});

})


router.post('/getMessages',(req,res)=>{
	Message.find().sort({_id : 1}).exec((err,message)=> {
		if (err) res.json({'success' : false});
		return res.json({'success' : true, 'message' : message});		
	})
})


// setInterval(function(){
// 	io.sockets.emit("FromAPI", 'HELLO');
// },1000)